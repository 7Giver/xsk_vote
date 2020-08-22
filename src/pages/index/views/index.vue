<!-- home -->
<template>
  <div class="page home">
    <div class="hd-box">
      <CityHeader />
      <div class="links">
        <router-link to="/rule" class="link">
          活动详情
        </router-link>
        <router-link to="/entry" class="link">
          {{ myEntryStatus }}
        </router-link>
      </div>
    </div>
    <!-- 中间滚动 -->
    <div class="bd">
      <div class="info">
        <div class="num">
          <img src="@/assets/front/icon_fangwen.png" class="icon" />
          <span>访问量 <span class="hlight">120W</span></span>
        </div>
        <div class="num">
          <img src="@/assets/front/icon_canyuqiye.png" class="icon" />
          <span
            >参与企业 <span class="hlight">{{ total_row }}</span></span
          >
        </div>
        <div class="tip">
          <img src="@/assets/front/icon_dengpao.png" class="icon" />
          <span>每天可投票一次</span>
        </div>
      </div>
      <div class="list">
        <div class="input-box">
          <img src="@/assets/front/icon_sousuo.png" class="icon" />
          <input
            v-model="searchParam"
            class="input"
            placeholder="搜索企业名称或编号, 输入完成自动搜索"
            type="text"
            @input="debounceInput"
          />
        </div>
        <van-list
          v-model="loading"
          class="scroll-box"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            v-for="(item, i) in scrollData"
            :key="item.id"
            class="scroll-item"
            :class="'rank' + (i + 1)"
            @click="$router.push({ name: 'Detail', params: { id: item.id } })"
          >
            <div class="img-box">
              <img :src="$cdn + item.logo_url" class="logo" />
            </div>
            <div class="rank-num">
              {{ i + 1 }}
            </div>
            <div class="name-box">
              <div class="name">
                {{ item.name }}
              </div>
              <div class="count">
                支持: <span class="hlight">{{ item.vote_score }}</span
                >票
              </div>
              <div class="score">
                编号:
                <span class="black" style="margin-right:3%">{{
                  item.number
                }}</span>
                信用分:
                <span class="black">{{ item.credit_score }}</span>
              </div>
            </div>
            <div class="vote-btn">
              投票
            </div>
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
      total_row: '',
      scrollData: [],
      myModalShow: false,
    };
  },
  async created() {
    this.$share({
      link: this.$route.path,
    });
    this.onLoad();
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
  },
};
</script>
<style lang="scss" scoped>
.home {
  background: #f2f4f5;
  padding-bottom: 45px;
  min-height: 100vh;
  .hd-box {
    position: relative;
    background: url(~@/assets/front/home_bg.png) no-repeat 0 0;
    background-size: 100% 100%;
    height: 225px;
    text-align: center;
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
    height: 40px;
    color: #333333;
    .icon {
      width: 18px;
      height: 18px;
    }
    .num,
    .tip {
      flex: 0 1 27%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .hlight {
      font-size: 14px;
      color: #b78344;
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
      margin-bottom: 10px;
      background: #fff;
      border: 1px solid #edefef;
      border-radius: 10px;
      display: flex;
      align-items: center;
      padding: 0 10px;
    }
    // .icon {
    //   margin-left: 10px;
    // }
    .input {
      flex: 1;
      text-align: center;
      font-size: 14px;
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
      background-image: url(~@/assets/front/rank_4.png);

      &.rank1 {
        background-image: url(~@/assets/front/rank_1.png);
      }
      &.rank2 {
        background-image: url(~@/assets/front/rank_2.png);
      }
      &.rank3 {
        background-image: url(~@/assets/front/rank_3.png);
      }
      &.rank4 {
        background-image: url(~@/assets/front/rank_4.png);
      }
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
      color: #6f6f6f;
      .name {
        color: #1b1b1b;
        font-size: 16px;
      }
      .hlight {
        font-size: 16px;
        font-weight: 600;
        color: #f56200;
      }
      .black {
        color: #272727;
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
