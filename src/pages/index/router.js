import Vue from 'vue';
import Router from 'vue-router';
import { cityList } from 'api/home.js';
import { APPID } from '@/config';

// hack router push callback
const originalPush = Router.prototype.push;

Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/index/views/login.vue'),
      meta: { title: '登录' },
    },
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/index/views/index'),
      meta: { title: '首页' },
    },
    {
      path: '/entry',
      name: 'Entry',
      component: () => import('@/pages/index/views/entry'),
      meta: { title: '报名' },
    },
    {
      path: '/entry/upload_logo',
      name: 'UploadLogo',
      component: () => import('@/pages/index/views/upload_logo'),
      meta: { title: '报名' },
    },
    {
      path: '/rule',
      name: 'Rule',
      component: () => import('@/pages/index/views/rule'),
      meta: { title: '规则' },
    },
    {
      path: '/detail/:id',
      props: true,
      name: 'Detail',
      component: () => import('@/pages/index/views/detail'),
      meta: { title: '详情' },
    },
    {
      path: '/create_post/:id',
      props: true,
      name: 'CreatPost',
      component: () => import('@/pages/index/views/create_post'),
      meta: { title: '分享' },
    },
    {
      path: '/rank',
      name: 'Rank',
      component: () => import('@/pages/index/views/rank'),
      meta: { title: '助力榜' },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || '投票';
  const hasToken = storage.get('token');

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      return next({ path: '/' });
    }
    if (!storage.session('city')) {
      const { data } = await cityList();
      const [city] = data.filter(it => it.id == to.query.cid);
      if (!city) {
        Vue.prototype.$dialog.alert({
          message: '没有城市信息',
        });
        return;
      }
      city.limit_time = window.moment(city.limit_time).format('lll');
      storage.session('city', city);
      storage.session('cid', city.id);
    }
    return next();
  }
  /* has no token */
  // http://test.fnlyf.com/?cid=LUffHGra&uid=54a5c439-a258-49d8-bb38-cf94841ea9e4
  if (to.path !== '/login') {
    storage.set('redirect', to.fullPath);
    storage.session('invite_uid', to.query.uid);
    if (!to.query.cid) {
      Vue.prototype.$dialog.alert({
        message: '缺少城市信息',
      });
      return;
    }
    storage.session('cid', to.query.cid);
    const url = encodeURIComponent(`${window.location.origin}/login`);
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=SUCCESS#wechat_redirect`;
    return;
    // return next({ path: '/login' });
  }
  return next();
});

export default router;
