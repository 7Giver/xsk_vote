<template>
  <div class="page upload-logo">
    <div class="upload-wrapper" @click.stop>
      <div class="label-box">
        <span class="label">商标（LOGO）</span>
      </div>
      <div class="upload-box">
        <div v-if="!!temp_logo_url" class="preview">
          <img :src="$cdn + temp_logo_url" />
        </div>
        <div v-else class="tip-box">
          <p class="big-tip">
            图片格式：JPG/PNG/GIF<br />
            图片尺寸：大于500*500像素
          </p>
          <p class="small-tip">
            <img class="icon" src="@/assets/front/icon_jinggao.png" />
            上传者需确保上传使用LOGO的合法性，
            若产生侵权或知识产权等纠纷，搜搜科技 不承担任何后果
          </p>
        </div>
      </div>
      <div class="btn-box">
        <van-uploader :after-read="afterRead">
          <div class="btn shangchuan">
            <img class="icon" src="@/assets/front/icon_shangchuan.png" />
            <span>上传手机相册图片</span>
          </div>
        </van-uploader>
        <div class="btn kefu">
          <img class="icon" src="@/assets/front/icon_kefu.png" />
          <span>联系客服定制LOGO</span>
        </div>
      </div>
      <div class="label-box">
        <span class="label">使用免费LOGO</span>
      </div>
      <div class="logo-wrapper">
        <div
          v-for="item in logos"
          :key="item.id"
          class="logo-box"
          @click="temp_logo_url = item.logo_url"
        >
          <div class="img-box">
            <img :src="$cdn + item.logo_url" />
          </div>
          <p class="text">还{{ item.total_count - item.used_count }}个可用</p>
        </div>
      </div>
      <!-- <div class="label-box">
        <span class="label">收费LOGO</span>
      </div>
      <div class="logo-wrapper"></div> -->
    </div>
    <div class="footer-fix">
      <div class="btn baoming" @click="handleClick">
        <img src="@/assets/front/icon_baoming.png" class="icon" />
        <span>提交上传</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogos, uploadImage } from 'api/home.js';
// import { baseApi } from '@/config/env.development.js';

export default {
  name: 'UploadLogo',
  data() {
    return {
      temp_logo_url: '',
      logos: [],
    };
  },
  async created() {
    const { data } = await getLogos();
    this.logos = data;
  },
  methods: {
    async afterRead({ file }) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const form = new FormData(); // 创建form对象
      form.append('file', file);
      const { data } = await uploadImage(form);
      this.temp_logo_url = data.Url;
    },
    handleClick() {
      storage.set('temp_logo_url', this.temp_logo_url);
      this.$router.replace('/entry');
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-logo {
  font-size: 12px;
  min-height: 100vh;
  margin-bottom: 20px;
  padding: 20px 15px 45px 15px;
  background: url(~@/assets/front/entry_bg.jpg) no-repeat;
  background-size: 100% 100%;
  .upload-wrapper {
    min-height: 520px;
    background: #fff;
    border-radius: 10px;
    padding: 10px;
    .upload-box {
      background: url(~@/assets/front/upload_box_bg.jpg) no-repeat;
      height: 260px;
      background-size: 100% 100%;
      text-align: center;
      color: #565656;
      position: relative;
      .preview {
        width: 90%;
        margin: 0 auto;
        height: 260px;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .big-tip {
        padding-top: 110px;
        padding-bottom: 20px;
        font-size: 12px;
      }
      .small-tip {
        width: 195px;
        margin: 0 auto;
        position: relative;
        font-size: 10px;
        .icon {
          position: absolute;
          width: 15px;
          left: -17px;
          top: 0px;
        }
      }
    }
    .btn-box {
      padding: 10px 0 15px 0;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        width: 160px;
        height: 30px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #fff;
        .icon {
          width: 18px;
          margin-right: 6px;
        }
        &.shangchuan {
          background: #3d76e3;
        }
        &.kefu {
          background: #8c9bb8;
        }
      }
    }
    .logo-wrapper {
      font-size: 10px;
      color: #ababab;
      text-align: center;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .logo-box {
        flex: 0 0 25%;
        margin-bottom: 2%;
      }
      .img-box {
        margin: 0 auto;
        width: 50px;
        height: 50px;
        padding: 5px;
        border: 1px solid #b1b1b1;
      }
      img {
        max-width: 100%;
        height: 100%;
      }
    }
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
    justify-content: center;
    .btn {
      font-weight: 600;
      background: #ed4c00;
      border-radius: 5px;
      width: 200px;
      height: 35px;
      color: #fff;
      font-size: 14px;
      font-weight: 600px;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        margin-right: 20px;
        width: 22px;
      }
    }
  }
}
</style>
