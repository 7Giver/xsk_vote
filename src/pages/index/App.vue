<template>
  <div id="app">
    <router-view />

    <!-- <router-link to="/" class="tohome">
      首页
    </router-link> -->
    <Footer />
  </div>
</template>
<script>
import Footer from './views/c_footer';
export default {
  name: 'App',
  components: {
    Footer,
  },
};
</script>
<style>
.tohome,
.tohome:focus,
.tohome:hover {
  position: fixed;
  right: 10px;
  bottom: 100px;
  background: #ee4d00;
  border-radius: 50%;
  color: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
}
</style>
