<template>
  <div class="footer_block">
    <router-link
      :class="[select == index ? 'item on' : 'item']"
      v-for="(item, index) in data"
      :key="index"
      :to="item.url"
    >
      <img :src="[select == index ? item.icon_on : item.icon]" alt="" />
      <p :class="{ on: select == index }">{{ item.title }}</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {},
  data() {
    return {
      select: 0,
      data: [
        {
          title: '首页',
          icon: require('@/assets/front/home.png'),
          icon_on: require('@/assets/front/home_on.png'),
          url: '/',
        },
        {
          title: '助力榜',
          icon: require('@/assets/front/rank.png'),
          icon_on: require('@/assets/front/rank_on.png'),
          url: '/rank',
        },
        {
          title: '我要报名',
          icon: require('@/assets/front/enroll.png'),
          icon_on: require('@/assets/front/enroll_on.png'),
          url: '/entry',
        },
      ],
    };
  },
  methods: {
    checkItem(index, url) {
      this.select = index;
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/index.scss';
.footer_block {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 99;
  background: #fdfdfd;
  border-top: 1px solid #f0f0f0;
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 50px;
    img {
      width: 26px;
      height: 26px;
    }
    p {
      font-size: 12px;
      margin-top: 1px;
    }
    &.router-link-exact-active {
      font-weight: bold;
    }
  }
}
</style>
