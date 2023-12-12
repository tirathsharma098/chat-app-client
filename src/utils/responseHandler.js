import { toast } from 'react-toastify';
import { AXIOS_ERROR_CODE } from './constants';

export const toastOptions = {
  position: toast.POSITION.TOP_RIGHT,
};

export function responseHandler(response) {
  if (response.status === 401) {
    localStorage.clear();
    toast.error(response.data.message, toastOptions);
  } else if (response.data?.success === false) {
    toast.error(response.data.message, toastOptions);
    return { data: null, success: false };
  } else if (response.data?.success === true) {
    toast.success(response.data.message, toastOptions);
    return { data: response.data.data, success: true };
  } else {
    toast.error('Something went wrong', toastOptions);
  }

  return { redirect: '/' };
}

export function resHandlerNoSuccess(response) {
  if (response.status === 401) {
    localStorage.clear();
    toast.error(response.data.message, toastOptions);
    return { redirect: '/login' };
  } else if (response.data?.success === false) {
    toast.error(response.data.message, toastOptions);
    return { data: null, success: false };
  } else if (response.data?.success === true) {
    return { data: response.data.data, success: true };
  } else {
    toast.error('Something went wrong', toastOptions);
  }
  return { redirect: '/' };
}

export function handleAxiosError(err) {
  if (err?.code === AXIOS_ERROR_CODE.ERR_NETWORK) {
    toast.error(err?.message, toastOptions);
    return { data: null, success: false };
  }
  throw err;
}
