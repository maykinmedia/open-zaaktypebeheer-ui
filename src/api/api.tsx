import {
  APIError,
  BadRequest,
  NotAuthenticated,
  NotFound,
  PermissionDenied,
} from '../errors/errors';
import { CSRFToken } from './headers';

const fetchDefaults = {
  credentials: 'include', // required for Firefox 60, which is used in werkplekken
};

const throwForStatus = async (response: Response) => {
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
};

const addHeaders = (headers: any, method: string) => {
  if (!headers) headers = {};

  if (method !== 'GET') {
    const csrfTokenValue = CSRFToken.getValue();
    if (csrfTokenValue != null && csrfTokenValue) {
      headers[CSRFToken.headerName] = csrfTokenValue;
    }
  }

  return headers;
};

const updateStoredHeadersValues = (headers: any) => {
  const CSRFTokenValue = headers.get(CSRFToken.headerName);
  if (CSRFTokenValue) {
    CSRFToken.setValue(CSRFTokenValue);
  }
};

const apiCall = async (url: string, opts: any = {}) => {
  const method = opts.method || 'GET';
  const options = { ...fetchDefaults, ...opts };
  options.headers = addHeaders(options.headers, method);

  const response = await window.fetch(url, options);

  await throwForStatus(response);

  updateStoredHeadersValues(response.headers);
  return response;
};

const handleSignIn = async (data: any) => {
  if (!CSRFToken.getValue()) {
    await fetchCSRFToken();
  }
  await post('http://127.0.0.1:8000/api/v1/auth/login/', data);
};

const fetchCSRFToken = async () => {
  let pathToTokenUrl = 'http://127.0.0.1:8000/api/docs/';
  await apiCall(pathToTokenUrl);
};

const get = async (url: string, params = {}, multiParams = []) => {
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
  url += `?${searchParams}`;
  const response = await apiCall(url);
  const data = response.status === 204 ? null : await response.json();
  return data;
};

const _unsafe = async (method: string = 'POST', url: string, data?: any, signal?: any) => {
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
  const response = await apiCall(url, opts);
  const responseData = response.status === 204 ? null : await response.json();

  return {
    ok: response.ok,
    status: response.status,
    data: responseData,
  };
};

const post = async (url: string, data: any, signal?: any) => {
  const resp = await _unsafe('POST', url, data, signal);
  return resp;
};

const patch = async (url: string, data: any = {}) => {
  const resp = await _unsafe('PATCH', url, data);
  return resp;
};

const put = async (url: string, data: any = {}) => {
  const resp = await _unsafe('PUT', url, data);
  return resp;
};

const destroy = async (url: string) => {
  const opts = {
    method: 'DELETE',
  };
  const response = await apiCall(url, opts);
  if (!response.ok) {
    const responseData = await response.json();
    console.error('Delete failed', responseData);
    throw new Error('Delete failed');
  }
};

export { handleSignIn, apiCall, get, post, put, patch, destroy };
