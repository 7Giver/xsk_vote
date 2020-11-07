<template>
  <div class="page detail" :style="{height: innerHeight}">
    <div class="header">
      <div class="avatar">
        <img :src="info.image" alt="">
      </div>
      <div class="name">{{info.name}}</div>
      <div class="phone">电话: {{info.mobile}}</div>
      <div class="rank">全国排名<span>{{info.whole_rank}}</span>位，全市排名<span>{{info.city_rank}}</span>位</div>
      <div class="fix_block">
        <div class="number">
          <span>编号：{{info.id}}</span>
        </div>
        <div class="credit">
          <span>信用分：{{info.trust}}</span>
        </div>
      </div>
    </div>
    <!-- <div class="limit-time">投票截止时间：{{ limit_time }}</div> -->
    <div class="content">
      <div class="support_block">
        <div class="vote_num">当前票数<span>{{info.votes}}</span></div>
        <p class="vote_diff">距离上一名还差<span>{{info.vote_diff}}</span>票</p>
        <div class="avatar_block" v-if="info.vote_list.length">
          <div class="item" v-for="(item, index) in info.vote_list" :key="index">
            <img :src="item.avatar" alt="">
          </div>
        </div>
        <div class="vote_btn">支持TA一下</div>
      </div>
      <div class="group_block" v-if="info.group_name">
        <div class="title_block">
          <img src="@/assets/front/group_l.png" alt="">
          <p>{{info.group_name}}</p>
          <img src="@/assets/front/group_r.png" alt="">
        </div>
        <div class="content_block">
          <img src="@/assets/front/post_text.png" alt="">
        </div>
      </div>
      <div class="company_block">
        <div class="title_block">
          <img src="@/assets/front/company_l.png" alt="">
          <p>公司介绍</p>
          <img src="@/assets/front/company_r.png" alt="">
        </div>
        <div class="detail">
          {{ info.introduction }}
        </div>
      </div>
      <!-- <div class="label-box">
        <span class="label">公司介绍</span>
      </div> -->
    </div>
    <div class="statement">             
      搜搜科技后台已启动防刷票监控系统实时监控<br />
      确保投票数据安全、真实
    </div>

    <!-- <div class="footer-fix">
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
    </div> -->

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
      limit_time: '',
      // limit_time: storage.session('city').limit_time,
      info: {
        name: 'xiaobaby啊你好',
        number: 11,
        vote_score: 1222,
        logo_url: 'image/13/13097843b3ae03e767074452b801c526.png',
        contact: 13023367793,
        website: 'http://dt.sousou.com',
        desc: '这是一段介绍但是房价大幅这是一段介绍但是房价大幅这是一段介绍但是房价大幅这是一段介绍但是房价大幅这是一段介绍但是房价大幅这是一段介绍但是房价大幅',
        vote_list: []
      },
      testlist: [
        {
          id: 1,
          avatar: require('@/assets/front/baidu.png')
        },
        {
          id: 2,
          avatar: require('@/assets/front/didi.png')
        },
        {
          id: 3,
          avatar: require('@/assets/front/gaode.png')
        },
        {
          id: 4,
          avatar: require('@/assets/front/meituan.png')
        },
        {
          id: 5,
          avatar: require('@/assets/front/tengxun.png')
        },
        {
          id: 6,
          avatar: require('@/assets/front/more.png')
        },
      ]
    };
  },
  computed: {
    innerHeight() {
      return window.innerHeight + 'px'
    }
  },
  async created() {
    if (!this.id) {
      return;
    }
    const { data } = await companyInfo(this.id);
    console.log(data);
    this.info = data.data;
    this.info.vote_list.push(...this.testlist)
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
  background: #F2F4F5;
  .header {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 30px 0 12px;
    background: url(~@/assets/front/detail_bg.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
    .avatar {
      display: block;
      width:78px;
      height: 78px;
      padding: 6px;
      border-radius: 4px;
      border: 1px solid rgba(198,211,226, 0.2);
      img {
        border-radius: 3px;
      }
    }
    .name {
      color: #fff;
      margin: 6px auto 2px;
      font-size: 16px;
      letter-spacing: 1px;
    }
    .phone {
      color: #CCCCCC;
      font-size: 13px;
      margin-bottom: 14px;
    }
    .rank {
      color: #F2F4F5;
      font-size: 15px;
      letter-spacing: 1px;
      span {
        color: #FD6840;
      }
    }
    .fix_block {
      position: absolute;
      top: 28px;
      left: 16px;
      display: flex;
      flex-direction: column;
      >div {
        span {
          color: #0D1B3C;
          font-size: 12px;
          padding: 3px 8px;
          border-radius: 2px;
        }
      }
      .number {
        margin-bottom: 8px;
        span {
          background: #FFF0CF;
        }
      }
      .credit {
        span {
          background: #D8EDFE;
        }
      }
    }
  }
  .content {
    padding: 0 20px;
    .support_block {
      color: #0D1B3C;
      font-size: 16px;
      padding: 16px 0 20px;
      text-align: center;
      span {
        color: #FF630E;
        font-weight: bold;
      }
      .avatar_block {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px auto;
        .item {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          overflow: hidden;
          margin-left: -16px;
          background: #F2F4F5;
          img {
            border-radius: 50%;
          }
          &:not(:last-child) {
            img {
              border: 5px solid transparent;
            }
          }
        }
      }
      .vote_btn {
        width: 95%;
        margin: 15px auto 0;
        color: #fff;
        font-size: 16px;
        line-height: 46px;
        font-weight: normal;
        border-radius: 40px;
        letter-spacing: 1px;
        background: linear-gradient(90deg, #FE945B, #FD623C);
        box-shadow: 0px 4px 8px 0px rgba(253, 71, 95, 0.35);
      }
    }
    .group_block {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      .title_block {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        background: #C9B77E;
        img {
          display: block;
          width: 58px;
        }
        p {
          margin: 0 8px;
          color: #fff;
          font-size: 16px;
          line-height: 52px;
          letter-spacing: 1px;
        }
      }
      .content_block {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px 0;
      }
    }
    .company_block {
      .title_block {
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          display: block;
          width: 58px;
        }
        p {
          margin: 0 8px;
          color: #103466;
          font-size: 16px;
          font-weight: bold;
          line-height: 56px;
          letter-spacing: 1px;
        }
      }
      .detail {
        padding: 0 18px;
        color: #0D1B3C;
        font-size: 13px;
      }
    }
    .black {
      color: #2e2e2e;
    }
    .des {
      font-size: 12px;
      color: #272727;
    }
  }
  .statement {
    position: absolute;
    bottom: 50px;
    width: 100%;
    margin: 20px auto 0;
    padding: 8px 0;
    color: #4D7098;
    font-size: 12px;
    text-align: center;
    background: #E5F2FA;
  }
  .footer-fix {
    position: fixed;
    bottom: 160px;
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
