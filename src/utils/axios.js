import Axios from 'axios';
import { backUrl } from '@/configs/config';

export const axios = Axios.create({
  baseURL: backUrl,
  headers: {
    // 'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
  },
});

// 옛날 토근을 주고있음
// if (typeof window !== 'undefined') {
//   const accessToken = localStorage.getItem('ACCESS_TOKEN');
//
//   if (accessToken) {
//     axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
//   }
// }

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (res) {
    return res;
  },
  function (error) {
    return Promise.reject(error);
  },
);
