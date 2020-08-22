import Vue from 'vue';

const padLeftZero = str => ('00' + str).substr(str.length);
/**
 *格式化时间
 *yyyy-MM-dd hh:mm:ss
 */
function formatDate(time, fmt = 'yy-MM-dd') {
  if (time === undefined || '') {
    return;
  }
  // time = time.toString().replace(/\.|-/g, '/');
  // console.log(time);
  const date = new Date(time);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + '';
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str),
      );
    }
  }
  return fmt;
}

/*
 * 隐藏用户手机号中间四位
 */
function hidePhone(phone) {
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
}

Vue.prototype.$formatDate = Vue.filter('formatDate', formatDate);
Vue.prototype.$hidePhone = Vue.filter('hidePhone', hidePhone);
