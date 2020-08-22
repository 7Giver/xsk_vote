<template>
  <div class="page-container">
    <div v-show="pageStep == 1" class="page entry">
      <div class="form">
        <div class="title">
          百强优秀企业推荐
        </div>
        <div class="input-group first">
          <div class="label-box">
            <span class="label">公司名称</span>
            <span class="sub">（必填）</span>
          </div>
          <div class="input-box">
            <input
              v-model="form.name"
              placeholder="请输入公司名称，不超过20个字符"
              type="text"
              class="input name"
            />
          </div>
        </div>
        <div class="input-group">
          <div class="label-box">
            <span class="label">联系方式</span>
            <span class="sub">（必填）</span>
          </div>
          <div class="input-box">
            <input
              v-model="form.contact"
              placeholder="请输入参赛公司联系电话号码"
              type="number"
              class="input phone"
            />
          </div>
        </div>
        <div class="input-group">
          <div class="label-box">
            <span class="label">商标（LOGO）</span>
            <span class="sub">（必填）</span>
            <div class="logo-store blue" @click="handleToUpload">
              <img src="@/assets/front/icon_mobanku.png" class="icon" />
              <span>LOGO模板库</span>
            </div>
          </div>
          <div class="input-box" @click="handleToUpload">
            <div v-if="form.logo_url">
              <img :src="$cdn + form.logo_url" class="icon-upload" />
            </div>
            <div v-else>
              <img src="@/assets/front/entry_upload.png" class="icon-upload" />
            </div>
          </div>
        </div>
        <div class="logo-tip">
          <span style="color:#d30000">*</span>
          若公司暂无LOGO标识，可在LOGO模板库中选择公用素材
        </div>
        <div class="input-group">
          <div class="label-box">
            <span class="label">公司介绍</span>
            <span class="sub">(可不填)</span>
          </div>
          <div class="input-box">
            <textarea
              v-model="form.desc"
              placeholder="请输入公司简要介绍，不超过240个字符"
              class="des"
            ></textarea>
          </div>
        </div>
        <div class="user-tip">
          <van-checkbox v-model="checked" icon-size="16px" shape="square" />
          <div style="margin-left: 5px">
            报名即代表同意
            <span class="blue">《用户协议与隐私政策》</span>
          </div>
        </div>
      </div>

      <div class="statement">
        <img class="icon" src="@/assets/front/icon_jinggao.png" />
        请您详细了解活动规则介绍后报名，活动最终解释权归 主办方<span
          class="blue"
          >搜搜科技</span
        >所有，活动中涉及的奖项合排名与搜搜 科技网站无关
      </div>

      <div class="footer-fix">
        <div class="btn kefu" @click="myModalShow = true">
          <img src="@/assets/front/icon_kefu.png" class="icon" />
          <span>咨询客服</span>
        </div>
        <div class="btn baoming" @click="handleSubmit">
          <img src="@/assets/front/icon_baoming.png" alt="" class="icon" />
          <span>立即提交</span>
        </div>
      </div>
    </div>
    <!-- page1---2 -->
    <div v-show="pageStep == 2" class="page upload-logo">
      <div class="upload-wrapper" @click.stop>
        <div class="label-box">
          <span class="label">商标（LOGO）</span>
        </div>
        <div class="upload-box">
          <div v-if="!!page2_logo_url" class="preview">
            <img :src="$cdn + page2_logo_url" />
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
            @click="page2_logo_url = item.logo_url"
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
        <div class="btn fanhui" @click="handleBack">
          <span>返回</span>
        </div>
        <div class="btn baoming" @click="handleClickUpload">
          <span>确认</span>
        </div>
      </div>
    </div>

    <ModalContact :modalshow.sync="myModalShow" />
  </div>
</template>

<script>
import ModalContact from './c_modal_contact';
import {
  createCompany,
  userStatus,
  getLogos,
  uploadImage,
  editCompany,
} from 'api/home.js';

export default {
  name: 'Entry',
  components: {
    ModalContact,
  },
  data() {
    return {
      myModalShow: false,
      pageStep: 1,
      checked: 1,
      logos: [],
      page2_logo_url: '',
      form: {
        id: '',
        desc: '',
        logo_url: '',
        contact: '',
        name: '',
      },
    };
  },
  async mounted() {
    // const hasCompany = storage.get('hasCompany');
    // if (hasCompany) {
    //   return;
    // }
    const { data } = await getLogos();
    this.logos = data;
    const { data: status } = await userStatus();
    console.log(status);
    if (status.created_company) {
      this.form = status.created_company[0];
    }
    this.$share({
      link: this.$route.path,
    });
  },
  methods: {
    handleToUpload() {
      this.pageStep = 2;
      this.page2_logo_url = this.form.logo_url;
    },
    handleBack() {
      this.pageStep = 1;
    },
    handleClickUpload() {
      this.pageStep = 1;
      this.form.logo_url = this.page2_logo_url;
    },
    async afterRead({ file }) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const form = new FormData(); // 创建form对象
      form.append('file', file);
      const { data } = await uploadImage(form);
      this.page2_logo_url = data.Url;
    },
    async handleSubmit() {
      let res, id, message;
      const condition =
        this.form.name && this.form.contact && this.form.logo_url;
      if (!condition) {
        return this.$dialog.alert({ message: '请检查您提交数据是否完整' });
      }
      if (this.form.id) {
        res = await editCompany(this.form);
        id = this.form.id;
        message = '恭喜您编辑成功, 赶快去拉票吧';
      } else {
        res = await createCompany(this.form);
        id = res.data.id;
        message = '恭喜您上传成功, 赶快去拉票吧';
      }
      console.log(res.data);
      this.$dialog.alert({ message }).then(() => {
        this.$router.push({ name: 'Detail', params: { id } });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.entry {
  font-size: 12px;
  min-height: 100vh;
  padding: 20px 15px 45px 15px;
  background: url(~@/assets/front/entry_bg.jpg) no-repeat;
  background-size: 100% 100%;
  .form {
    min-height: 600px;
    padding: 0 10px;
    background: url(~@/assets/front/entry_main_bg.png) no-repeat;
    background-size: 100% 100%;
    .title {
      font-size: 20px;
      line-height: 46px;
      color: #fff;
      font-weight: 600;
      text-align: center;
    }
    .input-group {
      margin-top: 14px;
      &.first {
        margin-top: 27px;
      }
    }
    .logo-store {
      width: 120px;
      height: 20px;
      border: 1px solid #d7d7d7;
      border-radius: 10px;
      line-height: 12px;
      text-emphasis: center;
      position: absolute;
      font-size: 10px;
      right: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        width: 16px;
        margin-right: 5px;
      }
    }
    .input-box {
      padding: 10px 7px;
      background: #f4f4f4;
      text-align: center;
      .input,
      textarea {
        color: #000;
        width: 100%;
      }
      textarea {
        height: 70px;
      }
      .icon-upload {
        width: 110px;
      }
    }
    .logo-tip {
      color: #939393;
      font-size: 10px;
      padding-top: 6px;
    }
    .user-tip {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      color: #939393;
      text-align: center;
      padding: 30px 0;
    }
  }
  .statement {
    color: #fff;
    width: 300px;
    position: relative;
    // padding: 30px 0;
    margin: 35px auto;
    text-align: center;
    .icon {
      position: absolute;
      width: 15px;
      left: -15px;
      top: 2px;
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
    justify-content: space-around;
    .btn {
      width: 142px;
      border-radius: 5px;
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
      &.kefu {
        background: #3d76e3;
      }
      &.baoming {
        background: #ed4c00;
        width: 200px;
      }
    }
  }
}
.upload-logo {
  font-size: 12px;
  min-height: 100vh;
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
      flex: 0 0 30%;
      height: 35px;
      color: #fff;
      font-size: 14px;
      font-weight: 600px;
      display: flex;
      margin: 0 20px;
      align-items: center;
      justify-content: center;
      .icon {
        margin-right: 20px;
        width: 22px;
      }
    }
    .fanhui {
      background: #3a4146;
    }
  }
}
</style>
