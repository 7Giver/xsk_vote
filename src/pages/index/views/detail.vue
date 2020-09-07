<template>
  <div class="page detail">
    <div class="company-name">
      {{ info.name }}
    </div>
    <div class="limit-time">投票截止时间：{{ limit_time }}</div>
    <div class="content">
      <CardDetail :info="info" />

      <div class="label-box">
        <span class="label">公司介绍</span>
      </div>
      <div class="des">
        {{ info.desc }}
      </div>
    </div>
    <div class="statement">
      搜搜科技后台已启动防刷票监控系统 <br />
      实时监控，确保投票数据安全、真实
    </div>
    <div class="footer-fix">
      <div
        class="btn haibao"
        @click="$router.push({ name: 'CreatPost', params: { id: id } })"
      >
        <img src="@/assets/front/icon_erweima.png" class="icon" />
        <span>生成二维码海报</span>
      </div>
      <div class="btn toupiao" @click="handleVote">
        <span>支持TA! 投一票</span>
        <img src="@/assets/front/icon_toupiao.png" class="icon-toupiao" />
        <span class="add1">+1</span>
      </div>
    </div>
  </div>
</template>

<script>
import { companyInfo, vote } from 'api/home.js';
import CardDetail from './c_card_detail';

export default {
  name: 'Detail',
  components: {
    CardDetail,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      // limit_time: storage.session('city').limit_time,
      info: {},
    };
  },
  async created() {
    // if (!this.id) {
    //   return;
    // }
    // const { data } = await companyInfo(this.id);
    // this.info = data;
    // this.$share({
    //   link: this.$route.path,
    //   desc: `快来为${data.name}投票`,
    //   imgUrl: $cdn + data.logo_url,
    // });
  },
  methods: {
    async handleVote() {
      const res = await vote(this.id);
      console.log(res);
      this.$dialog
        .alert({
          message: '恭喜您投票成功, 快去生成海报进行拉票吧',
        })
        .then(() => {
          this.$router.push({ name: 'CreatPost', params: { id: this.id } });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.detail {
  font-size: 12px;
  min-height: 100vh;
  padding: 20px 15px 45px 15px;
  background: url(~@/assets/front/detail_bg.jpg) no-repeat;
  background-size: 100% 100%;
  .company-name {
    font-size: 18px;
    color: #0f1315;
    line-height: 27px;
    // display: inline-block;
    max-width: 204px;
    border-radius: 20px;
    background: linear-gradient(to top, #e0d7b5, #fefaee);
    text-align: center;
    margin: 10px auto 0 auto;
    font-weight: 600;
  }
  .limit-time {
    font-size: 12px;
    color: #fff;
    text-align: center;
    padding: 8px 0 16px 0;
  }
  .content {
    background: url(~@/assets/front/detail_content_bg.png) no-repeat;
    background-size: 100% 100%;
    min-height: 420px;
    padding: 0 10px;
    .black {
      color: #2e2e2e;
    }
    .des {
      font-size: 12px;
      color: #272727;
    }
  }
  .statement {
    padding: 30px 0 15px 0;
    margin: 0 auto;
    text-align: center;
    color: #fff;
  }
  .footer-fix {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 45px;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .btn {
      width: 150px;
      height: 35px;
      color: #fff;
      border-radius: 3px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        margin-right: 5px;
        width: 22px;
      }
      &.haibao {
        background: #3a4146;
      }
      &.toupiao {
        background: #ee4d00;
        width: 180px;
        text-indent: -30px;
      }
      .icon-toupiao {
        right: 43px;
        top: 16px;
        width: 25px;
        position: absolute;
      }
      .add1 {
        color: #fff;
        right: -12px;
        top: 5px;
        width: 25px;
        position: absolute;
      }
    }
  }
}
</style>
