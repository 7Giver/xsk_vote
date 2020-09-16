<template>
  <div class="footer_block">
    <div
      :class="[select == index ? 'item on' : 'item']"
      v-for="(item, index) in data"
      :key="index"
      @click="checkItem(index, item.url)"
    >
      <img :src="[select == index ? item.icon_on : item.icon]" alt="" />
      <p :class="{ on: select == index }">{{ item.title }}</p>
    </div>
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
      this.select = index
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
  background: #FDFDFD;
  border-top: 1px solid #F0F0F0;
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 5px 0 2px;
    img {
      width: 26px;
      height: 26px;
    }
    p{
      font-size: 12px;
      margin-top: 1px;
      &.on {
        font-weight: bold;
      }
    }
  }
}
</style>
