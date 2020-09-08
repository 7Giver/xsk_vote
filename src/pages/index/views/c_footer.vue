<template>
  <div class="footer_block">
    <div
      :class="[select == index ? 'item on' : 'item']"
      v-for="(item, index) in data"
      :key="index"
      @click="checkItem(index, item.url)"
    >
      <img :src="item.icon" alt="" />
      <p :class="{ on: select == index }">{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    select: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      data: [
        {
          title: '首页',
          icon: require('@/assets/front/home.png'),
          url: '/',
        },
        {
          title: '助力榜',
          icon: require('@/assets/front/rank.png'),
          url: '/rank',
        },
        {
          title: '我要报名',
          icon: require('@/assets/front/enroll.png'),
          url: '/entry',
        },
      ],
    };
  },
  methods: {
    checkItem(index, url) {
      this.$emit('change', {
        select: index,
      });
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

  .item {
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;

    img {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
