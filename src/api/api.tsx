import {
  APIError,
  BadRequest,
  NotAuthenticated,
  NotFound,
  PermissionDenied,
} from '../errors/errors';
import { CSRFToken } from './headers';

class Api {
  api_url: string;
  fetchDefaults: any;

  constructor() {
    this.api_url = import.meta.env.VITE_BASE_API_URL as string;
    this.fetchDefaults = {
      credentials: 'include', // required for Firefox 60, which is used in werkplekken
    };
  }

  getEndpoint(url: string) {
    if (!this.api_url.endsWith('/')) this.api_url += '/';
    if (url.startsWith('/')) url = url.substring(1);
    if (!url.endsWith('/') && url !== '') url += '/';
    return this.api_url + url;
  }

  async getUser() {
    try {
      return await this.get('users/me/');
    } catch (_err) {
      return null;
    }
  }

  updateStoredHeadersValues(headers: Headers) {
    const CSRFTokenValue = headers.get(CSRFToken.headerName);
    if (CSRFTokenValue) {
      CSRFToken.setValue(CSRFTokenValue);
    }
  }

  async signIn(data: any) {
    await this.get(''); // get CSRF token
    await this.post('auth/login/', data);
    return await this.getUser();
  }

  async signOut() {
    await this.post('auth/logout/', {});
  }

  async _request(url: string, opts: any = {}) {
    const options = { ...this.fetchDefaults, ...opts };
    const endpoint = this.getEndpoint(url);
    const response = await fetch(endpoint, options);

    await this.throwForStatus(response);
    this.updateStoredHeadersValues(response.headers);
    return response;
  }

  async _unsafe(method: string = 'POST', url: string, data?: any, signal?: any) {
    const opts: any = {
      method,
      headers: {
        'Content-Type': 'application/json',
        [CSRFToken.headerName]: CSRFToken.getValue(),
      },
    };
    if (data) {
      opts.body = JSON.stringify(data);
    }
    if (signal) {
      opts.signal = signal;
    }
    const response = await this._request(url, opts);
    const responseData = response.status === 204 ? null : await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data: responseData,
    };
  }

  async get(url: string, params = {}, multiParams = []) {
    let searchParams = new URLSearchParams();
    if (Object.keys(params).length) {
      searchParams = new URLSearchParams(params);
    }
    if (multiParams.length > 0) {
      multiParams.forEach((param) => {
        const paramName = Object.keys(param)[0]; // param={foo: bar}
        searchParams.append(paramName, param[paramName]);
      });
    }

    if (searchParams.toString()) {
      url += `?${searchParams}`;
    }

    const response = await this._request(url);
    const data = response.status === 204 ? null : await response.json();
    return data;
  }

  async post(url: string, data: any, signal?: any) {
    const resp = await this._unsafe('POST', url, data, signal);
    return resp;
  }

  async patch(url: string, data: any = {}) {
    const resp = await this._unsafe('PATCH', url, data);
    return resp;
  }

  async put(url: string, data: any = {}) {
    const resp = await this._unsafe('PUT', url, data);
    return resp;
  }

  async destroy(url: string) {
    const opts = {
      method: 'DELETE',
    };
    const response = await this._request(url, opts);
    if (!response.ok) {
      const responseData = await response.json();
      console.error('Delete failed', responseData);
      throw new Error('Delete failed');
    }
  }

  async throwForStatus(response: Response) {
    if (response.ok) return;

    let responseData: any = null;
    // Check if the response contains json data
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.indexOf('application/json') !== -1) {
      responseData = await response.json();
    }

    let ErrorClass = APIError;
    let errorMessage = 'An API error occurred.';
    switch (response.status) {
      case 400: {
        ErrorClass = BadRequest;
        errorMessage = Object.keys(responseData).map((key) => responseData[key])[0];
        break;
      }
      case 401: {
        ErrorClass = NotAuthenticated;
        errorMessage = 'User not or no longer authenticated';
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
      default: {
        break;
      }
    }

    throw new ErrorClass(errorMessage, response.status, responseData.detail);
  }
}

export const api = new Api();
