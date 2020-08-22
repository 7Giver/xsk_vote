<template>
  <div class="c-card-detail">
    <div class="rank-box">
      <div class="medal" :class="'m' + info.number">
        {{ info.number }}
      </div>
      <div class="left-box">
        当前排名 <span class="rank-num">{{ info.number }}</span>
      </div>
      <div class="right-box">
        <p>
          <span class="black">票数</span>
          <span class="vote-num">{{ info.vote_score }}</span>
        </p>
        <p>距离上一名还差 <span class="black">3569</span> 票</p>
      </div>
    </div>
    <div class="info-box">
      <div class="left-box">
        <img v-if="info.logo_url" :src="$cdn + info.logo_url" class="logo" />
      </div>
      <div class="right-box">
        <div class="bd">
          <p class="name black">
            {{ info.name }}
          </p>
          <p class="tel">
            电话: <span class="black">{{ info.contact }}</span>
          </p>
          <p class="site">
            网址: <span class="black">{{ info.website }}</span>
          </p>
        </div>
        <div class="score-box">
          <div class="bianhao">
            投票编号: <span class="black">{{ info.number }}</span>
          </div>
          <div class="xinyongfen">信用分: <span class="black">1073</span></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CardDetail',
  props: {
    info: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  mounted() {
    // this.$http
    //   .get($cdn + this.info.logo_url, { responseType: 'blob' })
    //   .then(res => {
    //     console.log(res);
    //   });
  },
};
</script>

<style lang="scss" scoped>
.c-card-detail {
  .black {
    color: #2e2e2e;
  }
  .rank-box {
    height: 57px;
    display: flex;
    align-items: center;
    position: relative;
    font-size: 12px;
    text-align: center;
    color: #2e2e2e;
    .medal {
      position: absolute;
      top: 0;
      background-size: 100% 100%;
      background-repeat: no-repeat;
      width: 43px;
      font-weight: 600;
      color: rgba($color: #000000, $alpha: 0.6);
      font-size: 22px;
      height: 50px;
      line-height: 60px;
      text-align: center;
      background-image: url(~@/assets/front/medal4.png);
      &.m1 {
        background-image: url(~@/assets/front/medal1.png);
        color: transparent;
      }
      &.m2 {
        background-image: url(~@/assets/front/medal2.png);
        color: transparent;
      }
      &.m3 {
        background-image: url(~@/assets/front/medal3.png);
        color: transparent;
      }
      // &.m4 {
      // }
      // &.m5 {
      //   background-image: url(~@/assets/front/medal5.png);
      // }
    }

    .left-box {
      width: 50%;
      height: 35px;
      font-size: 14px;
      text-indent: 15px;
      line-height: 35px;
      border-right: 2px solid #dbdee1;
    }
    .right-box {
      width: 50%;
      color: #6f6f6f;
      font-size: 12px;
    }
    .rank-num {
      font-size: 18px;
      color: #2886f1;
    }
    .vote-num {
      margin-left: 5px;
      font-size: 20px;
      color: #f56200;
    }
  }
  .info-box {
    margin: 15px 0;
    display: flex;
    align-items: center;
    .left-box {
      width: 120px;
      height: 90px;
      padding: 10px 0;
      box-shadow: 0 0 5px #c4ccd4;
      margin-right: 10px;
      text-align: center;
    }
    .right-box {
      flex: 1;
      font-size: 12px;
      color: #4f4f4f;
      .bd {
        height: 70px;
      }
      .name {
        font-size: 15px;
        color: #1b1b1b;
        font-weight: 600;
      }
      .bianhao,
      .xinyongfen {
        display: inline-block;
        padding: 0 5px;
        margin-right: 5px;
        height: 19px;
        line-height: 19px;
        background: #fff0cf;
      }
      .xinyongfen {
        background: #d8eeff;
      }
    }
  }
}
</style>
