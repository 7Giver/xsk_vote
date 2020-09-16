<template>
  <div class="page rank">
    <div class="banner">
      <img src="@/assets/front/rank_banner.png" alt="" />
    </div>
    <div class="tabs">
      <div
        class="tab-item"
        :class="{ active: type == 'all' }"
        @click="handleChangeTab('all')"
      >
        <span>总排行</span>
      </div>
      <div
        class="tab-item"
        :class="{ active: type == 'month' }"
        @click="handleChangeTab('month')"
      >
        <span>月排行</span>
      </div>
      <div
        class="tab-item"
        :class="{ active: type == 'day' }"
        @click="handleChangeTab('day')"
      >
        <span>日排行</span>
      </div>
    </div>
    <div class="scroll-list">
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
          <div class="rank_block">{{i+1}}</div>
          <div class="avatar-box">
            <img :src="$cdn + item.headimgurl" class="avatar" />
            <!-- <div class="medal"></div> -->
          </div>
          <div class="name-box">
            <p class="name">{{ item.username }}</p>
            <p class="friends">
              带了<span class="hlight">{{ item.invite_count }}</span>人为朋友助力
            </p>
          </div>
          <div class="no">
            <p><span>{{ item.vote_count }}</span>票</p>
            <p>已投</p>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { userRank } from 'api/home.js';
import Json from '@/Json.js';
export default {
  name: 'Rank',
  data() {
    return {
      loading: true,
      finished: false,
      scrollData: [],
      page: 1,
      type: 'all',
    };
  },
  created() {
    this.getDataList(); // 测试用数据
    // this.onLoad();
    // this.$share({
    //   link: this.$route.path,
    // });
  },
  methods: {
    handleChangeTab(type) {
      this.page = 1;
      this.type = type;
      this.scrollData = [];
      // this.onLoad();
      this.getDataList()
    },
    async onLoad() {
      const { data } = await userRank(this.type, this.page);
      if (data.items && data.items.length) {
        this.scrollData.push(...data.items);
      }
      // this.total_row = data.total_row;
      this.loading = false;
      if (this.scrollData.length < data.total_row) {
        this.finished = false;
        this.page++;
      } else {
        this.finished = true;
      }
    },
    // 模拟数据
    getDataList() {
      let data = Json.rankList;
      setTimeout(() => {
        this.loading = false;
        if (this.scrollData.length < 21) {
          this.finished = false;
          this.scrollData.push(...data);
        } else {
          this.finished = true;
        }
      }, 500);
    },
  },
};
</script>
<style lang="scss" scoped>
.rank {
  .banner {
    position: relative;
    z-index: -1;
    img {
      display: block;
      margin-bottom: -30px;
    }
  }
  .tabs {
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-radius: 14px 14px 0 0;
    background: #F2F4F5;
    overflow: hidden;
    .tab-item {
      width: 25%;
      font-size: 13px;
      line-height: 50px;
      text-align: center;
      color: #9C999F;
      padding-top: 10px;
      span {
        position: relative;
      }
      &.active {
        color: #2C4A9A;
        font-size: 15px;
        font-weight: bold;
        span::after{
          content: "";
          position: absolute;
          left: 50%;
          bottom: -10px;
          transform: translate(-50%, -50%);
          display: block;
          width: 20px;
          height: 2px;
          border-radius: 20px;
          background: #2C4A9A;
        }
      }
    }
  }
  .scroll-list {
    padding: 16px 16px 10px;
    .hlight {
      color: #FF6600;
      font-weight: bold;
    }
    .scroll-item {
      display: flex;
      align-items: center;
      height: 71px;
      border-bottom: 1px solid #EEEEEE;
      .rank_block {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 12px;
        width: 29px;
        height: 30px;
        font-size: 12px;
        color: #543809;
      }
      &.rank1 {
        .rank_block {
          background: url(~@/assets/front/rank1.png) no-repeat center / 100% 100%;
        }
      }
      &.rank2 {
        .rank_block {
          background: url(~@/assets/front/rank2.png) no-repeat center / 100% 100%;
        }
      }
      &.rank3 {
        .rank_block {
          background: url(~@/assets/front/rank3.png) no-repeat center / 100% 100%;
        }
      }
    }
    .avatar-box {
      width: 50px;
      height: 50px;
      position: relative;
      margin: 0 9px;
      .avatar {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
      .medal {
        position: absolute;
        width: 17px;
        height: 24px;
        right: 3px;
        bottom: -5px;
      }
    }
    .name-box {
      flex: 1;
      line-height: 16px;
      font-size: 12px;
      color: #1b1b1b;
      .name {
        color: #333333;
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .friends {
        color: #9A9A9A;
      }
      .vote-num {
        color: #6f6f6f;
      }
    }
    .no {
      text-align: center;
      &>:first-child {
        font-size: 14px;
        font-weight: 600;
        color: #333333;
      }
      &>:last-child {
        font-size: 12px;
        color: #9A9A9A;
      }
    }
    .rank1 .medal {
      background: url(~@/assets/front/user_medal1.png) no-repeat;
      background-size: 100% auto;
    }
    .rank2 .medal {
      background: url(~@/assets/front/user_medal2.png) no-repeat;
      background-size: 100% auto;
    }
    .rank3 .medal {
      background: url(~@/assets/front/user_medal3.png) no-repeat;
      background-size: 100% auto;
    }
  }
}
</style>
