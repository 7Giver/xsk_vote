<!-- home -->
<template>
  <div class="page home">
    <div class="hd-box">
      <CityHeader @confimCity="confimCity" />
      <div class="my_link" @click="showRule=true">活动规则</div>
      <!-- <div class="links">
        <router-link to="/rule">
          活动详情
        </router-link>
        <router-link to="/entry">
          {{ myEntryStatus }}
        </router-link>
      </div> -->
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
          @load="getCompanyRank"
        >
          <div
            v-for="(item, i) in scrollData"
            :key="i"
            class="scroll-item"
            :class="'rank' + (i + 1)"
            @click="$router.push({ name: 'Detail', params: { id: item.id } })"
          >
            <div class="rank_block">{{i+1}}</div>
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
            <div class="vote-btn" @click.stop="showVote=true">投票<span>+1</span></div>
          </div>
        </van-list>
      </div>
    </div>
    <!-- 活动规则弹窗 -->
    <van-popup v-model="showRule" :style="{ width: '80%' }">
      <div class="rule_block">
        <div class="title">活动规则</div>
        <div class="content">
          <div class="rule_item" v-for="(item, i) in ruleList" :key="i">
            <div class="icon_num"><span>{{i+1}}</span></div>
            <div class="right">{{item.label}}：<span>{{item.text}}</span></div>
          </div>
        </div>
      </div>
    </van-popup>
    <!-- 公众号弹窗 -->
    <van-popup v-model="showOfficial" :style="{ width: '72%' }">
      <div class="official_block">
        <img class="title" src="@/assets/front/official_title.png" alt="">
        <div class="content">
          <img class="codeimg" :src="officialCode" alt="">
          <p>长按识别二维码关注公众号</p>
        </div>
      </div>
    </van-popup>
    <!-- 投票弹窗 -->
    <van-popup v-model="showVote" :style="{ width: '72%' }">
      <div class="vote_block">
        <img class="codeimg" src="@/assets/front/more.png" alt="">
        <div class="btn_block">
          <div class="cancel" @click="showVote=false">取消</div>
          <div class="submit" @click="submit">确定</div>
        </div>
      </div>
    </van-popup>
    <!-- 中间滚动end -->
    <!-- 底部固定 -->
    <!-- <div class="footer-fix">
      <router-link class="link-box" to="/rank">
        <img src="@/assets/front/icon_zhuli.png" class="icon" />
        <span>助力榜</span>
      </router-link>
      <div class="link-box" @click="myModalShow = true">
        <img src="@/assets/front/icon_tousu.png" class="icon" />
        <span>意见反馈</span>
      </div>
    </div> -->
    <!-- 底部固定end -->
    
    <ModalContact :modalshow.sync="myModalShow" />
  </div>
</template>

<script>
import { cityList, companyRank } from 'api/home.js';
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
      officialCode: `${$cdn}image/75/75ce3997414ed655f14fa2eb0b9fce1b.jpg`,
      loading: true,
      finished: false,
      searchParam: '',
      page: 1,
      total_row: '12',
      scrollData: [],
      province: '',
      city: '',
      myModalShow: false,
      showRule: false, // 规则弹窗
      showOfficial: false, //公众号弹窗
      showVote: false, //投票弹窗
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
      ruleList: [
        {
          label: '活动时间',
          text: '2020.7.1 --- 2020.8.31'
        },
        {
          label: '参选要求',
          text: '从企业经营状况、企业荣誉、品牌价值等多个维度预筛选出优质行业品牌商家参与评选。'
        },
        {
          label: '公示结果',
          text: '2020.9.1公示最终结果，并开启全国品牌商家参选活动。'
        },
        {
          label: '全国结果公布',
          text: '202011.1公示全国最终结果，并开启下届行业品牌商家百强优秀企业颁奖盛典。'
        },
        {
          label: '投票规则',
          text: '每个用户每天可投一票，可邀请伙伴一起参与投票，为品牌助力。'
        },
        {
          label: '评选机构',
          text: '由品牌企业大数据研究院联合多家评测机构和社会组织共同推出举办，助力企业品牌宣传。'
        },
      ]
    };
  },
  async created() {
    // this.$nextTick(() => {
    //   this.showOfficial = true
    // })
    // this.$dialog.alert({
    //   message: '没有城市信息',
    // });
    await this.getCompanyRank()
    // this.getDataList() // 测试用数据
    // this.$share({
    //   link: this.$route.path,
    // });
    // this.onLoad();
  },
  methods: {
    debounceInput: lodash.debounce(async function() {
      this.scrollData = [];
      this.page = 1;
      await this.getCompanyRank();
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
    // 获取商家列表
    async getCompanyRank() {
      let obj = {
        page: this.page,
        province: this.province,
        city: this.city,
        keyword: this.searchParam
      };
      let { data } = await companyRank(obj);
      let result = data.data
      if (result && result.list.length) {
        this.scrollData.push(...data.list);
        this.loading = false;
        if (this.scrollData.length < 20) {
          this.finished = false;
          this.page++;
        } else {
          this.finished = true;
        }
      } else {
        this.finished = true
      }
    },
    // 子组件改变城市
    confimCity(data) {
      console.log(data);
      this.province = data[0]
      this.city = data[1]
      this.getCompanyRank()
    },
    // 模拟数据
    getDataList() {
      // console.log(111);
      let data = Json.dataList
      setTimeout(() => {
        this.loading = false;
        if (this.scrollData.length<21) {
          this.finished = false;
          this.scrollData.push(...data);
        } else {
          this.finished = true;
        }
      }, 500)
    },
    // 确认投票
    submit() {
      this.showVote = false
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
      top: 40px;
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
      width: 100%;
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

      &.rank1 {
        .rank_block {
          background: url(~@/assets/front/rank1.png) no-repeat center / 100% 100%;
        }
        .img-box {
          border: 1px solid #FFE259;
        }
      }
      &.rank2 {
        .rank_block {
          background: url(~@/assets/front/rank2.png) no-repeat center / 100% 100%;
        }
        .img-box {
          border: 1px solid #C6D3E2;
        }
      }
      &.rank3 {
        .rank_block {
          background: url(~@/assets/front/rank3.png) no-repeat center / 100% 100%;
        }
        .img-box {
          border: 1px solid #F8A86E;
        }
      }
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
      width: 67px;
      height: 67px;
      padding: 5px;
      text-align: center;
      border: 1px solid #F2F4F5;
    }
    .rank_block {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 12px;
      width: 28px;
      height: 30px;
      margin: 0 5px;
      font-size: 12px;
      color: #543809;
    }
    .name-box {
      flex: 1;
      height: 65px;
      font-size: 12px;
      margin-left: 8px;
      color: #9A9A9A;
      .name {
        color: #1b1b1b;
        font-size: 16px;
      }
      .count {
        letter-spacing: 1px;
        > span {
          font-size: 15px;
          font-weight: 600;
          color: #FF6600;
        }
      }
    }
    .vote-btn {
      position: absolute;
      right: 20px;
      bottom: 22px;
      color: rgba(255,255,255,.85);
      font-size: 12px;
      letter-spacing: 1px;
      padding: 5px 20px;
      border-radius: 40px;
      background: linear-gradient(90deg, #FE945B, #FD623C);
      box-shadow: 0px 4px 4px 0px rgba(253, 71, 95, 0.35);
      > span {
        font-size: 13px;
      }
    }
  }
  // 弹出层
  .van-popup {
    background: transparent;
    overflow: inherit;
  }
  .rule_block {
    position: relative;
    padding: 8px;
    border-radius: 6px;
    background: linear-gradient(0deg, #323C91, #1975B3);
    .title {
      position: absolute;
      top: 13px;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 54%;
      color: #fff;
      font-size: 16px;
      text-align: center;
      padding: 4px 5px;
      letter-spacing: 1px;
      background: url(~@/assets/front/rule_title.png) no-repeat center / 100% 100%;
    }
    .content {
      padding: 42px 10px 10px;
      border-radius: 6px;
      background: #fff;
      .rule_item {
        display: flex;
        align-items: baseline;
        margin-bottom: 6px;
        .icon_num {
          color: #fff;
          width: 24px;
          height: 24px;
          text-align: center;
          border-radius: 50%;
          background: #234BCB;
          margin-right: 6px;
          span {
            margin-left: -1px;
            font-size: 15px;
            line-height: 24px;
            font-style: italic;
          }
        }
        .right {
          flex: 1;
          font-size: 15px;
          font-weight: bold;
          span {
            font-size: 13px;
            line-height: 10px;
            font-weight: normal;
          }
        }
        &:first-child {
          .right {
            span {
              color: #FF7A5E;
            }
          }
        }
      }
    }
  }
  .official_block {
    background: #fff;
    border-radius: 10px;
    .title {
      display: block;
    }
    .content {
      padding: 18px 0 15px;
      text-align: center;
      .codeimg {
        width: 120px;
        height: 120px;
        border: 1px solid #FAE9CD;
        border-radius: 5px;
      }
      p {
        font-size: 13px;
        margin-top: 5px;
      }
    }
  }
  .vote_block {
    position: relative;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 40px 0;
    background: url(~@/assets/front/vote_bg.png) no-repeat center / 100% 100%;
    .codeimg {
      width: 80px;
      height: 80px;
    }
    .btn_block {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      >div {
        flex: 1;
      }
    }
  }
  .footer-fix {
    width: 100%;
    bottom: 60px;
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
