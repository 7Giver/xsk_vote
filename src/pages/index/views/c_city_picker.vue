<template>
  <div class="c-city-picker">
    <div class="picker_block" @click="showCityPicker">
      <div v-if="showAddress" class="address">
        <span>{{ province + '省' }}</span>
        <span>{{ city + '市' }}</span>
      </div>
      <p v-else>请选择城市</p>
    </div>
    <van-popup v-model="showPicker" round position="bottom">
      <van-picker
        ref="picker"
        title="选择城市"
        show-toolbar
        :columns="columns"
        @change="onChange"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 第三方定位 -->
    <iframe
      id="geoPage"
      width="0"
      height="0"
      frameborder="0"
      style="display:none;"
      scrolling="no"
      src="https://apis.map.qq.com/tools/geolocation?key=ST4BZ-6N26P-VIKD6-LPJJN-SLMK5-RCFQM&referer=搜搜地图"
    ></iframe>
  </div>
</template>

<script>
import { cityList } from 'api/home.js';
export default {
  name: 'CityPicker',
  props: {},
  data() {
    return {
      province: '',
      city: '',
      showPicker: false,
      showAddress: false,
      defaultIndex: [],
      columns: [],
    };
  },
  computed: {},
  async mounted() {
    await this.getCityList();
    this.getfixCity();
  },
  methods: {
    // 获取城市列表
    async getCityList() {
      let { data } = await cityList();
      this.columns = this.formatDate([...data.data]);
    },
    // 显示picker
    showCityPicker() {
      this.showPicker = true;
      this.$nextTick(() => {
        let picker = this.$refs.picker;
        picker.setIndexes(this.defaultIndex);
      });
    },
    // picker确定
    onConfirm(value, index) {
      // console.log(value, index);
      this.value = value[1];
      this.showPicker = false;
      this.$emit('confimCity', value);
    },
    // 监听picker方法
    onChange(picker, value, index) {
      // console.log(picker, value, index);
      let values = picker.getValues();
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
      return newArr;
    },
    // 获取当前定位
    getfixCity() {
      this.sendAddress().then(result => {
        let province = result.province.split('省')[0];
        let city = result.city.split('市')[0];
        if (province && city) {
          let provinceIndex = this.columns.findIndex(
            item => item.text == province,
          );
          let item = this.columns[provinceIndex].children;
          let cityIndex = item.findIndex(item => item.text == city);
          this.defaultIndex = [provinceIndex, cityIndex];
          this.province = province;
          this.city = city;
          this.showAddress = true;
          this.$emit('confimCity', [province, city]);
        }
      });
    },
    // 第三方获取城市传值
    async sendAddress() {
      return new Promise(resolve => {
        window.addEventListener(
          'message',
          function(event) {
            var loc = event.data;
            try {
              loc.nation ? resolve(loc) : false;
            } catch (error) {
              // console.log(error);
            }
          },
          false,
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.c-city-picker {
  position: relative;
  .picker_block {
    display: flex;
    align-items: center;
    .address {
      display: flex;
      align-items: center;
      font-size: 13px;
			>span:first-child {
				margin-right: 8px;
			}
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
}
</style>
