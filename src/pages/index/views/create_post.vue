<template>
  <div>
    <div v-show="!canvasImg" ref="html2canvas" class="page create-post">
      <CityHeader :show-time="true" class="box b1" />
      <div class="content">
        <CardDetail :info="info" />
        <p class="thanks">感谢您为我们投上宝贵的一票</p>
      </div>
      <div class="code-box">
        <div class="qrcode">
          <img ref="qrcode" src="" />
        </div>
        <img src="@/assets/front/post_text.png" class="help-text" />
      </div>
    </div>

    <div v-show="canvasImg" class="img-wrap">
      <img :src="canvasImg" style="width:100vw;height:100vh;" />
    </div>
    <div ref="canvasWrap"></div>
    <!-- <van-overlay ref="canvasWrap" :show="show" /> -->
    <div class="fix-tip">
      <div class="btn toupiao" @click="handleCreatePost">
        <span>{{ btnTipText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CardDetail from './c_card_detail';
import CityHeader from './c_city_header';
import { companyInfo } from 'api/home.js';
import { baseUrl } from '@/config';
import QRCode from 'qrcode';

export default {
  name: 'CreatePost',
  components: {
    CardDetail,
    CityHeader,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      btnTipText: '点击生成海报',
      show: false,
      canvasImg: '',
      info: {},
    };
  },
  async mounted() {
    if (!this.id) {
      return;
    }
    const { data } = await companyInfo(this.id);
    this.info = data;
    QRCode.toDataURL(
      `${baseUrl}/detail/${this.id}?cid=${storage.session('cid')}&uid=${
        storage.get('userinfo').user_id
      }`,
    )
      .then(url => {
        this.$refs.qrcode.src = url;
      })
      .catch(err => {
        console.log(err);
      });
    this.$share({
      link: this.$route.path,
      desc: `快来为${data.name}投票`,
      imgUrl: $cdn + data.logo_url,
    });
  },
  methods: {
    handleCreatePost() {
      if (this.show) return;
      this.btnTipText = '长按上方区域把海报转发给朋友';
      // setTimeout(() => {}, 500);
      // this.$nextTick(() => {});
      html2canvas(this.$refs.html2canvas).then(canvas => {
        this.canvasImg = canvas.toDataURL('image/jpeg');
        // this.$refs.canvasWrap.appendChild(canvas);
        // this.show = true;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.create-post {
  font-size: 12px;
  min-height: 100vh;
  padding: 20px 15px 45px 15px;
  background: url(~@/assets/front/post_bg.jpg) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .b1 {
    height: 215px;
    text-indent: 0;
    padding: 0;
  }
  .content {
    background: url(~@/assets/front/detail_content_bg.png) no-repeat;
    background-size: 100% auto;
    padding: 0 10px;
    .black {
      color: #2e2e2e;
    }
    .thanks {
      line-height: 50px;
      font-size: 16px;
      text-align: center;
    }
  }
  .code-box {
    margin-top: 20px;
  }
  .qrcode {
    width: 130px;
    height: 130px;
    display: inline-block;
    vertical-align: top;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .help-text {
    width: 180px;
    margin-left: 20px;
  }
}
.fix-tip {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  z-index: 3;
  width: 100%;
  background: rgba($color: #000000, $alpha: 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  .btn {
    background: #ee4d00;
    // width: 180px;
    padding: 0 20px;
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
  }
}
</style>
