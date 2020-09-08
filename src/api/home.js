import axios from 'axios';
// import store from '@/store';
import { Toast } from 'vant';
// 根据环境不同引入不同api地址
import { baseApi, baseUrl } from '@/config';
import Vue from 'vue';

Vue.prototype.$http = axios;

// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
});

// request拦截器 request interceptor
service.interceptors.request.use(
  config => {
    // 不传递默认开启loading
    if (!config.hideloading) {
      // loading
      Toast.loading({
        forbidClick: true,
      });
    }
    if (config.data && storage.session('cid')) {
      config.data.city_id = storage.session('cid');
    }
    // console.log('req -------', config);
    const isLogin = ['/getWxToken'].includes(config.url);
    if (!isLogin) {
      config.headers['token'] = storage.get('token');
    }
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
    Toast.clear();
    const res = response.data;
    if (response.status && response.status !== 200) {
      // 网络错误
      return Promise.reject(res || 'error');
    } else if (res.code !== 1000) {
      // 业务上的错误
      if (res.code >= 2000 && res.code <= 3000) {
        const cid = storage.session('cid');
        const uid = storage.session('invite_uid');
        storage.clearAll();
        Vue.prototype.$dialog.alert({
          message: '登录遇到了一些问题, 正在尝试为您重新授权',
        });
        window.location.href = `${baseUrl}?r=api/vote/authorize`;
        return;
      }
      return Promise.reject(res || 'error');
    }
    return Promise.resolve(res);
  },
  error => {
    console.log('request error ----------------'); // for debug
    console.log(error); // for debug
    Vue.prototype.$dialog.alert({ message: JSON.stringify(error) });
    return Promise.reject(error);
  },
);

export function jssdk(url) {
  return service({
    url: '/u/jssdk',
    method: 'post',
    data: { url },
  });
}

export function cityList() {
  return service({
    url: '/u/cityList',
    method: 'get',
  });
}
export function getLogos() {
  return service({
    url: '/u/templateLogos',
    method: 'get',
  });
}
export function uploadImage(form) {
  return service({
    url: '/u/uploadImg',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data' },
    data: form,
  });
}

export function companyInfo(id) {
  return service({
    url: '/u/companyInfo/' + id,
    method: 'get',
  });
}
export function editCompany(data) {
  return service({
    url: '/u/editCompany',
    city: true,
    method: 'post',
    data,
  });
}
export function createCompany(data) {
  return service({
    url: '/u/recommendCompany',
    city: true,
    method: 'post',
    data,
  });
}
export function userRank(type, page_number) {
  return service({
    url: '/u/userRank',
    city: true,
    method: 'post',
    data: { page_size: 10, type, page_number },
  });
}
export function companyRank({ page = 1, company_name, number }) {
  return service({
    url: '/u/companyRank',
    city: true,
    method: 'post',
    data: {
      company_name,
      number,
      page_number: page,
      page_size: 10,
    },
  });
}
export function vote(company_id) {
  return service({
    url: '/u/vote',
    city: true,
    method: 'post',
    data: { company_id },
  });
}
export function invited(id, cid) {
  return service({
    url: '/u/invited',
    method: 'post',
    data: { inviter_id: id, city_id: cid },
  });
}
export function userStatus() {
  return service({
    url: '/u/userStatus',
    city: true,
    method: 'post',
    data: {},
  });
}

// 登录获取jwt
export function login(WxCode) {
  return service({
    url: '/getWxToken',
    method: 'post',
    // data: {
    //   name: 'fgfr345',
    //   open_id: 'gvbcgd213f',
    //   // open_id: Math.random()
    //   //   .toString(16)
    //   //   .slice(2),
    // },
    data: { WxCode },
  });
}

Vue.prototype.$share = ({
  title = `${storage.session('city').name}百强企业投票`,
  desc = '快来为你支持的企业投票吧',
  imgUrl = `${baseUrl}/logo.png`,
  link,
}) => {
  document.title = title;
  const url = window.location.href;
  jssdk(url).then(
    ({ data }) => {
      wx.config({
        debug: false, // 关闭调试模式
        appId: data.app_id, // 必填，公众号的唯一标识
        timestamp: data.timestamp, // 必填，生成签名的时间戳
        nonceStr: data.nonce_str, // 必填，生成签名的随机串
        signature: data.signature, // 必填，签名
        jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'],
      });
      wx.ready(() => {
        const mlink = `${baseUrl}${link}?cid=${storage.session('cid')}&uid=${
          storage.get('userinfo').user_id
        }`;
        // alert(mlink);
        const func = {
          title,
          desc,
          link: mlink,
          imgUrl,
          success: () => {},
        };
        //需在用户可能点击分享按钮前就先调用
        wx.updateAppMessageShareData(func);
        wx.updateTimelineShareData(func);
      });
    },
    e => console.log('error', e),
  );
};
