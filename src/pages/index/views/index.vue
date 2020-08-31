<!-- home -->
<template>
  <div class="page home">
    <div class="hd-box">
      <CityHeader />
      <router-link to="/rule" class="my_link">
        活动规则
      </router-link>
      <div class="links">
        <router-link to="/rule">
          活动详情
        </router-link>
        <router-link to="/entry">
          {{ myEntryStatus }}
        </router-link>
      </div>
    </div>
    <!-- 中间滚动 -->
    <div class="bd">
      <div class="info">
        <van-swipe class="my-swipe" :autoplay="4000" :show-indicators="false" vertical>
          <van-swipe-item v-for="(item, index) in noticList" :key="index">
            <img :src="item.avatar" alt="">
            <p>{{item.text}}</p>
          </van-swipe-item>
        </van-swipe>
        <div class="right_block">
          <div class="num">
            <!-- <img src="@/assets/front/icon_fangwen.png" class="icon" /> -->
            <span>访问量 <span class="hlight">120w</span></span>
          </div>
          <div class="num">
            <!-- <img src="@/assets/front/icon_canyuqiye.png" class="icon" /> -->
            <span>参与企业 <span class="hlight">{{ total_row }}</span></span>
          </div>
          <!-- <div class="tip">
            <img src="@/assets/front/icon_dengpao.png" class="icon" />
            <span>每天可投票一次</span>
          </div> -->
        </div>
      </div>
      <div class="list">
        <div class="input-box">
          <img src="@/assets/front/icon_search.png" class="icon" />
          <input
            v-model="searchParam"
            class="input"
            placeholder="搜索企业名称或编号, 完成自动搜索"
            type="text"
            @input="debounceInput"
          />
          <span>搜索</span>
        </div>
        <van-list
          v-model="loading"
          class="scroll-box"
          :finished="finished"
          finished-text="没有更多了"
          @load="getDataList"
        >
          <div
            v-for="(item, i) in scrollData"
            :key="i"
            class="scroll-item"
            :class="'rank' + (i + 1)"
            @click="$router.push({ name: 'Detail', params: { id: item.id } })"
          >
            <div class="img-box">
              <img :src="$cdn + item.logo_url" class="logo" />
            </div>
            <!-- <div class="rank-num">
              {{ i + 1 }}
            </div> -->
            <div class="name-box">
              <div class="name">{{ item.name }}</div>
              <div class="count">支持<span>{{ item.vote_score }}</span>票</div>
              <div class="score">
                <!-- 编号:
                <span class="black" style="margin-right:3%">{{
                  item.number
                }}</span> -->
                信用：<span>{{ item.credit_score }}</span>
              </div>
            </div>
            <div class="vote-btn">投票</div>
            <div class="vote-number">+1</div>
          </div>
        </van-list>
      </div>
    </div>
    <!-- 中间滚动end -->
    <!-- 底部固定 -->
    <div class="footer-fix">
      <router-link class="link-box" to="/rank">
        <img src="@/assets/front/icon_zhuli.png" class="icon" />
        <span>助力榜</span>
      </router-link>
      <div class="link-box" @click="myModalShow = true">
        <img src="@/assets/front/icon_tousu.png" class="icon" />
        <span>意见反馈</span>
      </div>
    </div>
    <!-- 底部固定end -->

    <ModalContact :modalshow.sync="myModalShow" />
  </div>
</template>

<script>
import { companyRank } from 'api/home.js';
import CityHeader from './c_city_header';
import ModalContact from './c_modal_contact';
import lodash from 'lodash';
import Json from '@/Json.js';

export default {
  components: {
    CityHeader,
    ModalContact,
  },
  data() {
    return {
      myEntryStatus: '我要报名',
      loading: true,
      searchParam: '',
      finished: false,
      page: 1,
      total_row: '12',
      scrollData: [],
      myModalShow: false,
      noticList: [  //滚动公告
        {
          avatar: 'http://pw9kqbgzn.bkt.clouddn.com/image/13/13097843b3ae03e767074452b801c526.png',
          text: '刚刚紫玉兰投票给国珍总经理'
        },
        {
          avatar: 'http://pw9kqbgzn.bkt.clouddn.com/image/13/13097843b3ae03e767074452b801c526.png',
          text: '刚刚哈哈投票给晓姐总经理'
        },
        {
          avatar: 'http://pw9kqbgzn.bkt.clouddn.com/image/13/13097843b3ae03e767074452b801c526.png',
          text: '刚刚美丽人生投票给回台总经理'
        },
      ],
    };
  },
  async created() {
    this.getDataList() // 测试用数据
    // this.$share({
    //   link: this.$route.path,
    // });
    // this.onLoad();
    // const { data } = await userStatus();
    // if (data.created_company.length) {
    //   this.myEntryStatus = '修改报名信息';
    //   // storage.set('hasCompany', data.created_company[0].id);
    // }
  },
  methods: {
    debounceInput: lodash.debounce(async function() {
      this.scrollData = [];
      this.page = 1;
      await this.onLoad();
    }, 1000),
    async onLoad() {
      let obj = {
        page: this.page,
      };
      if (this.searchParam) {
        if (/\d/.test(this.searchParam)) {
          obj.number = parseInt(this.searchParam);
        } else {
          obj.company_name = this.searchParam;
        }
      }
      const { data } = await companyRank(obj);
      if (data.items && data.items.length) {
        this.scrollData.push(...data.items);
      }
      this.total_row = data.total_row;
      this.loading = false;
      if (this.scrollData.length < data.total_row) {
        this.finished = false;
        this.page++;
      } else {
        this.finished = true;
      }
      console.log('bottom', this.page);
    },
    getDataList() {
      // console.log(111);
      setTimeout(() => {
        let data = Json.dataList
        this.loading = false;
        if (this.scrollData.length<21) {
          this.finished = false;
          this.scrollData.push(...data);
        } else {
          this.finished = true;
        }
      }, 500)
    }
  },
};
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/index.scss';
.home {
  background: #f2f4f5;
  padding-bottom: 45px;
  min-height: 100vh;
  .hd-box {
    position: relative;
    background: url(~@/assets/front/banner.png) no-repeat 0 0;
    background-size: 100% 100%;
    height: 265px;
    text-align: center;
    .my_link {
      position: absolute;
      left: 0;
      top: 35px;
      color: #822d48;
      font-size: 14px;
      font-weight: bold;
      font-style: italic;
      letter-spacing: 1px;
      padding: 3px 14px 3px 6px;
      border-radius: 0px 30px 30px 0;
      background: #fff;
      opacity: 0.65;
    }
    .links {
      margin-top: 20px;
      display: flex;
      font-size: 14px;
      color: #000;
      justify-content: space-around;
      font-weight: 600;
    }
  }
  .info {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    height: 36px;
    color: #333333;
    .my-swipe {
      flex: 1;
      height: 100%;
      padding: 0 10px;
      background: #DAEEFF;
      .van-swipe-item {
        display: flex;
        align-items: center;
        color: #4178B3;
        font-size: 12px;
        > p {
          @include textoverflow;
        }
        > img {
          width: 28px;
          height: 28px;
          margin-right: 8px;
          border-radius: 50%;
        }
      }
    }
    .right_block {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 6px;
      background: url(~@/assets/front/visit_bg.png) no-repeat center / 100% 100%;
      .num:first-child {
        margin-right: 6px;
      }
      .num,
      .tip {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-around;
        white-space: nowrap;
      }
    }
    .icon {
      width: 18px;
      height: 18px;
    }
    
    .hlight {
      font-size: 14px;
      color: #F56200;
    }
    .tip {
      flex: 0 1 30%;
      height: 24px;
      background: #fffbf4;
      border: 1px solid #b78344;
      border-radius: 10px;
    }
  }
  .list {
    padding: 10px 15px;
    .input-box {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 80px;
      overflow: hidden;
      background: linear-gradient(0deg, #333D91, #1A76B4);
      .icon {
        position: absolute;
        left: 24px;
        top: 50%;
        transform: translate(-50%,-50%);
        width: 18px;
        height: 18px;
      }
      .input {
        flex: 1;
        // text-align: center;
        font-size: 13px;
        line-height: 40px;
        padding: 0 10px 0 36px;
        margin: 2px;
        background: #fff;
        border-radius: 80px 60px 60px 80px;
      }
      > span {
        color: #fff;
        font-size: 16px;
        letter-spacing: 1.5px;
        font-weight: bold;
        white-space: nowrap;
        margin: 0 26px 0 20px;
      }
    }
  }
  .scroll-box {
    img {
      height: 100%;
    }
    .scroll-item {
      height: 94px;
      margin-bottom: 10px;
      position: relative;
      display: flex;
      align-items: center;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background: #fff;
      // background-image: url(~@/assets/front/rank_4.png);

      // &.rank1 {
      //   background-image: url(~@/assets/front/rank_1.png);
      // }
      // &.rank2 {
      //   background-image: url(~@/assets/front/rank_2.png);
      // }
      // &.rank3 {
      //   background-image: url(~@/assets/front/rank_3.png);
      // }
      // &.rank4 {
      //   background-image: url(~@/assets/front/rank_4.png);
      // }
      .rank-num {
        position: absolute;
        right: 32px;
        top: 10px;
        width: 28px;
        text-align: center;
        font-size: 22px;
        font-weight: 600;
        color: rgba($color: #000000, $alpha: 0.7);
      }
      &.rank1 .rank-num,
      &.rank2 .rank-num,
      &.rank3 .rank-num {
        color: transparent;
      }
    }

    .img-box {
      margin: 0 9px;
      width: 74px;
      height: 74px;
      padding: 5px;
      text-align: center;
    }
    .name-box {
      font-size: 12px;
      height: 65px;
      flex: 1;
      color: #9A9A9A;
      .name {
        color: #1b1b1b;
        font-size: 16px;
      }
      .count {
        > span {
          font-size: 15px;
          font-weight: 600;
          color: #FF6600;
        }
      }
    }
    .vote-btn {
      position: absolute;
      color: #ffffff;
      right: 50px;
      bottom: 13px;
      font-weight: 600;
    }
    .vote-number {
      position: absolute;
      color: #ffffff;
      right: 13px;
      bottom: 14px;
      font-size: 12px;
      font-weight: 600;
    }
  }

  .footer-fix {
    width: 100%;
    bottom: 0;
    height: 45px;
    background: #fff;
    position: fixed;
    z-index: 10;
    display: flex;
    align-items: center;
    .icon {
      width: 18px;
      margin-right: 10px;
    }
    .link-box {
      margin-left: 20px;
      display: flex;
      align-items: center;
    }
  }
}
</style>
