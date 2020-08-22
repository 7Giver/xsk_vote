<!-- home -->
<template>
  <div>正在登录中</div>
</template>

<script>
// 请求接口
import { login, invited } from '@/api/home.js';

export default {
  computed: {},
  async created() {
    const code = this.$route.query.code;
    if (!code) {
      this.$dialog.alert({
        message: '微信返回值错误',
      });
      return;
    }
    const { data } = await login(code);
    storage.set('token', data.token);
    storage.set('userinfo', data);
    if (data.is_new && storage.session('invite_uid')) {
      await invited(storage.session('invite_uid'), storage.session('cid'));
    }
    const url = storage.get('redirect');
    // storage.remove('redirect');
    location.replace(url);
  },
};
</script>
