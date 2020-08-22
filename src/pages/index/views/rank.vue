<template>
  <div class="page rank">
    <div class="tabs">
      <div
        class="tab-item"
        :class="{ active: type == 'all' }"
        @click="handleChangeTab('all')"
      >
        总排行
      </div>
      <div
        class="tab-item"
        :class="{ active: type == 'month' }"
        @click="handleChangeTab('month')"
      >
        月排行
      </div>
      <div
        class="tab-item"
        :class="{ active: type == 'day' }"
        @click="handleChangeTab('day')"
      >
        日排行
      </div>
    </div>
    <div class="scroll-list">
      <van-list
        v-model="loading"
        class="scroll-box"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div
          v-for="(item, i) in scrollData"
          :key="i"
          class="scroll-item"
          :class="'rank' + (i + 1)"
          @click="$router.push({ name: 'Detail', params: { id: item.id } })"
        >
          <div class="avatar-box">
            <img :src="item.headimgurl" class="avatar" />
            <div class="medal"></div>
          </div>
          <div class="name-box">
            <p class="name">{{ item.username }}</p>
            <p class="friends">
              带了
              <span class="hlight">{{ item.invite_count }}</span>
              人为朋友助力
            </p>
            <p class="vote-num">
              已投 <span>{{ item.vote_count }}</span
              >票
            </p>
          </div>
          <div class="no">NO.{{ i + 1 }}</div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
import { userRank } from 'api/home.js';

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
    this.onLoad();
    this.$share({
      link: this.$route.path,
    });
  },
  methods: {
    handleChangeTab(type) {
      this.page = 1;
      this.type = type;
      this.scrollData = [];
      this.onLoad();
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
  },
};
</script>
<style lang="scss" scoped>
.rank {
  .tabs {
    display: flex;
    .tab-item {
      height: 35px;
      line-height: 35px;
      font-size: 14px;
      text-align: center;
      flex: 1;
      color: #fff;
      background: #1b1b1b;
      border-bottom: 1px solid #545555;
      position: relative;
      &.active {
        background: #d3bb89;
        color: #1b1b1b;
        border-bottom: 1px solid #b1a07b;
        &::after {
          display: block;
        }
      }
      &::after {
        content: '';
        border-top: 10px solid #d3bb89;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        position: absolute;
        bottom: -10px;
        left: 41%;
        display: none;
      }
    }
  }
  .scroll-list {
    .hlight {
      color: #f56200;
    }
    .scroll-item {
      height: 71px;
      border-bottom: 1px solid #dfe2e3;
      display: flex;
      align-items: center;
    }
    .avatar-box {
      width: 55px;
      height: 55px;
      position: relative;
      margin: 0 10px;
      .avatar {
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
      width: 250px;
      line-height: 16px;
      font-size: 12px;
      color: #1b1b1b;
      .name {
        font-size: 15px;
      }
      .vote-num {
        color: #6f6f6f;
      }
    }
    .no {
      font-weight: 600;
      color: #86a7b7;
      font-size: 12px;
      font-style: oblique;
    }
    .rank1,
    .rank2,
    .rank3 {
      .no {
        font-size: 16px;
        color: #f56200;
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
