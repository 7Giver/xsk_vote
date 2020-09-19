<template>
  <div class="c-city-header">
    <div class="picker_block">
      <img src="@/assets/front/icon_address.png" alt="" />
      <p class="address" @click="showPicker = true">
        <span v-if="value">{{ value + '市' }}</span>
        <span v-else>全国</span>
      </p>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        title="选择城市"
        show-toolbar
        :columns="columns"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- <div class="title">{{ name }}</div> -->
    <!-- <img src="@/assets/front/page_title.png" alt="" class="title-bg" /> -->
    <!-- <img src="@/assets/front/logo.png" alt="" class="logo" /> -->
    <!-- <p v-if="showTime" class="time">投票截止时间：{{ time }}</p> -->
  </div>
</template>

<script>
import { cityList } from 'api/home.js';
export default {
  name: 'CityHeader',
  props: {
    // showTime: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      name: '111',
      time: '222',
      // name: `${storage.session('city').name}`,
      // time: storage.session('city').limit_time,
      value: '',
      showPicker: false,
      columns: [
        {
          text: '浙江',
          children: [
            {
              text: '杭州',
            },
            {
              text: '温州',
            },
          ],
        },
        {
          text: '福建',
          children: [
            {
              text: '福州',
            },
            {
              text: '厦门',
            },
          ],
        },
      ],
    };
  },
  computed: {
 
  },
  async mounted() {
    await this.getCityList()
  },
  methods: {
    // 获取城市列表
    async getCityList() {
      let { data } = await cityList();
      this.columns = this.formatDate([...data.data])
    },
    // picker确定
    onConfirm(value) {
      this.value = value[1];
      this.showPicker = false;
      this.$emit('confimCity', value)
    },
    // 格式化数据
    formatDate(arr) {
      let newArr = [];
      arr.forEach(item => {
        newArr.push({
          text: item.province,
          children: [],
        });
      });
      let cityArr = [];
      let result = [];
      arr.forEach((item, index) => {
        cityArr.push(item.city);
        this.$set(result, index, []);
      });
      cityArr.forEach((item, index) => {
        item.forEach(v => {
          result[index].push({
            text: v,
          });
        });
      });
      newArr.forEach((item, index) => {
        item.children = result[index];
      });
      return newArr
    },
  },
};
</script>

<style lang="scss" scoped>
.c-city-header {
  position: relative;
  background: rgba(22, 18, 60, 0.8);
  .picker_block {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
    .address {
      display: flex;
      align-items: center;
      color: #fff;
      font-size: 12px;
      line-height: 34px;
      &::after {
        content: '';
        width: 0;
        height: 0;
        border-right: 4px solid transparent;
        border-left: 4px solid transparent;
        border-top: 8px solid #2ed2de;
        margin-left: 5px;
      }
    }
    > img {
      width: 12px;
      height: 16px;
      margin-right: 8px;
    }
  }
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
