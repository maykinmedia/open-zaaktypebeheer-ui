import {
  APIError,
  BadRequest,
  NotAuthenticated,
  NotFound,
  PermissionDenied,
} from '../errors/errors';

const LOCALSTORAGE_TOKEN_NAME = 'zaaktypenbeheer_token';
localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, import.meta.env.VITE_API_LOGIN_TOKEN);

interface APIResponse {
  detail: string;
  [key: string]: any;
}

class Api {
  api_token: string | null;
  api_url: string;

  constructor() {
    this.api_token = localStorage.getItem(LOCALSTORAGE_TOKEN_NAME);
    this.api_url = import.meta.env.VITE_BASE_API_URL;
  }

  loggedIn = () => {
    return Boolean(this.api_token);
  };

  signIn = async (formData: FormData) => {
    const data = {
      username: formData.get('username'),
      password: formData.get('password'),
    };

    const response = await this.post('api-token-auth', data);

    localStorage.setItem(LOCALSTORAGE_TOKEN_NAME, response.data.token);
    this.api_token = response.data.token;
  };

  getAuthHeaders = () => {
    return {
      Authorization: `Token ${this.api_token}`,
    };
  };

  throwForStatus = async (response: Response) => {
    if (response.ok) return;

    let responseData: APIResponse;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      responseData = await response.json();
    } else {
      responseData = { detail: 'Unknown error.' };
    }

    let ErrorClass = APIError;
    let errorMessage = 'An API error occured.';
    switch (response.status) {
      case 400: {
        ErrorClass = BadRequest;
        errorMessage = 'Call did not validate on the server.';
        break;
      }
      case 401: {
        ErrorClass = NotAuthenticated;
        errorMessage = 'User not or no longer authenticated.';
        break;
      }
      case 403: {
        ErrorClass = PermissionDenied;
        errorMessage = 'User has insufficient permissions.';
        break;
      }
      case 404: {
        ErrorClass = NotFound;
        errorMessage = 'Resource not found.';
        break;
      }
    }

    throw new ErrorClass(errorMessage, response.status, responseData.detail);
  };

  _request = async (endpoint: string, opts: RequestInit = {}) => {
    if (!opts.headers) {
      opts.headers = this.api_token ? this.getAuthHeaders() : {};
    } else if (!(opts.headers as Record<string, string>)['Authorization'] && this.api_token) {
      (opts.headers as Record<string, string>)['Authorization'] = this.api_token;
    }

    if (!this.api_url.endsWith('/')) this.api_url += '/';
    if (endpoint.startsWith('/')) endpoint = endpoint.slice(1);

    const url = `${this.api_url}${endpoint}`;
    const response = await fetch(url, opts);
    await this.throwForStatus(response);

    return response;
  };

  _unsafe = async (method = 'POST', endpoint: string, data = {}) => {
    const opts: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${this.api_token}`,
      },
    };

    if (data) opts.body = JSON.stringify(data);

    const response = await this._request(endpoint, opts);
    const responseData = response.status === 204 ? null : await response.json();
    return {
      ok: response.ok,
      status: response.status,
      data: responseData,
    };
  };

  get = async (
    endpoint: string,
    params: { [key: string]: string | number | undefined } = {},
    multiParams: Array<{ [key: string]: string }> = []
  ) => {
    let searchParams = new URLSearchParams();
    if (Object.keys(params).length) {
      for (const [name, value] of Object.entries(params)) {
        if (value) searchParams.append(name, value.toString());
      }
    }

    if (multiParams.length) {
      for (const param of multiParams) {
        const paramName = Object.keys(param)[0];
        searchParams.append(paramName, param[paramName]);
      }
    }

    if (searchParams.toString()) {
      endpoint += `?${searchParams}`;
    }

    const response = await this._request(endpoint);
    return response.status === 204 ? null : await response.json();
  };

  post = async (endpoint: string, data = {}) => {
    if (!endpoint.endsWith('/')) endpoint += '/';
    return await this._unsafe('POST', endpoint, data);
  };

  patch = async (endpoint: string, data = {}) => {
    if (!endpoint.endsWith('/')) endpoint += '/';
    return await this._unsafe('PATCH', endpoint, data);
  };

  put = async (endpoint: string, data = {}) => {
    if (!endpoint.endsWith('/')) endpoint += '/';
    return await this._unsafe('PUT', endpoint, data);
  };
}

const api = new Api();
export default api;
