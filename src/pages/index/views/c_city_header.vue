<template>
  <div class="c-city-header">
    <div class="title">
      {{ name }}
    </div>
    <!-- <img src="@/assets/front/page_title.png" alt="" class="title-bg" /> -->
    <!-- <img src="@/assets/front/logo.png" alt="" class="logo" /> -->
    <p v-if="showTime" class="time">投票截止时间：{{ time }}</p>
  </div>
</template>

<script>
export default {
  name: 'CityHeader',
  props: {
    showTime: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: '',
      time: '',
      // name: `${storage.session('city').name}`,
      // time: storage.session('city').limit_time,
    };
  },
};
</script>

<style lang="scss" scoped>
.c-city-header {
  position: relative;
  color: #272727;
  text-align: center;
  text-indent: 0;
  padding: 0;
  padding-top: 20px;
  .title {
    max-width: 230px;
    margin: 0 auto 10px auto;
    color: #0f1315;
    font-size: 24px;
    line-height: 28px;
    border-radius: 20px;
    background: linear-gradient(to top, #e0d7b5, #fefaee);
    text-align: center;
  }
  .title-bg {
    width: 300px;
  }
  .logo {
    width: 135px;
    height: 35px;
    border: 1px solid #fff;
  }
  .time {
    color: #fff;
  }
}
</style>
