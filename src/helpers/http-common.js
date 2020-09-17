import axios from "axios";
import {handleError, handleResponse} from '@/helpers/http-methods'

const HTTP = axios.create({});

// Add a response interceptor
HTTP.interceptors.response.use(
  function (response) {
    handleResponse(response);
    return response;
  }, function (error) {
    handleError(error);
    return Promise.reject(error);
  }
);

export {HTTP};