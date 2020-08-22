import Vue from 'vue';
import Router from 'vue-router';

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
  base: '/admin',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/pages/admin/views/login'),
      meta: { title: '登录' },
    },
    {
      path: '/',
      component: () => import('@/pages/admin/views/layout'),
      children: [
        {
          path: '/',
          name: 'Company',
          component: () => import('@/pages/admin/views/company'),
        },
        {
          path: '/company/:id', // create和update都在这里
          name: 'CreateOrUpdateCompany',
          component: () =>
            import('@/pages/admin/views/create_or_update_company'),
          props: true,
        },
        {
          path: '/logo',
          name: 'Logo',
          component: () => import('@/pages/admin/views/logo'),
        },
        {
          path: '/city',
          name: 'City',
          component: () => import('@/pages/admin/views/city'),
        },
        {
          path: '/user_promotion',
          name: 'UserPromotion',
          component: () => import('@/pages/admin/views/user_promotion'),
        },
        {
          path: '/user/:id',
          name: 'UserDetail',
          props: true,
          component: () => import('@/pages/admin/views/user_detail'),
        },
        {
          path: '/user_list',
          name: 'UserList',
          component: () => import('@/pages/admin/views/user_list'),
        },
      ],
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  // // set page title
  // document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  // const hasToken = getToken();
  console.log('topath', to.path);
  const hasToken = storage.get('admintoken');

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      return next({ path: '/' });
    } else {
      return next();
    }
  }
  /* has no token*/
  if (to.path !== '/login') {
    return next({ path: '/login' });
  }
  return next();
});

export default router;
