import axios from 'axios';
import { baseApi } from '@/config';
import Vue from 'vue';

// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // const isLogin = ['/adminLogin'].includes(config.url);
    config.headers['token'] = storage.get('admintoken');
    // if (!isLogin) {
    // }
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    if (response.status && response.status !== 200) {
      // 网络错误
      return Promise.reject(res || 'error');
    } else if (res.code !== 1000) {
      // 业务上的错误
      Vue.prototype.$alert({ message: res });
      return Promise.reject(res || 'error');
    }
    return Promise.resolve(res);
  },
  error => {
    console.log('request error ----------------'); // for debug
    console.log(error); // for debug
    return Promise.reject(error);
  },
);

// 登录获取jwt
export function login(username, password) {
  return service({
    url: '/adminLogin',
    method: 'post',
    data: { username, password },
  });
}

// getLogo
export function getLogo() {
  return service({
    url: '/a/getLogo',
    method: 'get',
  });
}
export function createLogo(data) {
  return service({
    url: '/a/createLogo',
    method: 'post',
    data,
  });
}
export function updateLogo(data) {
  return service({
    url: '/a/updateLogo',
    method: 'post',
    data,
  });
}
export function delLogo(id) {
  return service({
    url: '/a/delLogo',
    method: 'post',
    data: { id },
  });
}

// export function getCompany() {
//   return service({
//     url: '/a/getCompany',
//     method: 'get',
//   });
// }
export function getCompany({ city_id, page = 1, company_name, number }) {
  return service({
    url: '/u/companyRank',
    method: 'post',
    data: {
      city_id,
      company_name,
      number,
      page_number: page,
      page_size: 10,
    },
  });
}

export function getCompanyInfo(id) {
  return service({
    url: `/a/getCompanyInfo/${id}`,
    method: 'get',
  });
}
export function creatCompany(data) {
  return service({
    url: '/a/creatCompany',
    method: 'post',
    data,
  });
}
export function updateCompany(data) {
  return service({
    url: '/a/updateCompany',
    method: 'post',
    data,
  });
}
export function delCompany(id) {
  return service({
    url: '/a/delCompany',
    method: 'post',
    data: { id },
  });
}

export function getCity() {
  return service({
    url: '/a/getCity',
    method: 'get',
  });
}
export function createCity(data) {
  return service({
    url: '/a/createCity',
    method: 'post',
    data,
  });
}
export function updateCity(data) {
  return service({
    url: '/a/updateCity',
    method: 'post',
    data,
  });
}
export function delCity(id) {
  return service({
    url: '/a/delCity',
    method: 'post',
    data: { id },
  });
}
export function userRank(city_id, type, page_number) {
  return service({
    url: '/u/userRank',
    method: 'post',
    data: { city_id, page_size: 30, type, page_number },
  });
}

export function getWxUsers() {
  return service({
    url: '/a/getWxUsers',
    method: 'get',
  });
}
export function getUserInviteList({
  user_id,
  city_id,
  page_number,
  page_size = 10,
}) {
  return service({
    url: '/u/getUserInviteList',
    method: 'post',
    data: {
      user_id,
      city_id,
      page_number,
      page_size,
    },
  });
}
export function getUserVoteList({
  user_id,
  city_id,
  page_number,
  page_size = 10,
}) {
  return service({
    url: '/u/getUserVoteList',
    method: 'post',
    data: {
      user_id,
      city_id,
      page_number,
      page_size,
    },
  });
}
