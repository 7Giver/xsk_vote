<template>
  <van-overlay class="c-modal-contact" :show="!!modalshow" @click="handleClick">
    <div class="kefu-wrapper" @click.stop>
      <van-icon size="20px" name="clear" class="close" @click="handleClick" />
      <div class="text">
        如您遇到疑问或建议都可以与我们联系，<br />
        搜搜客服将竭诚为您服务！
      </div>
      <div class="btn">
        在线微信客服
      </div>
      <a href="tel:15311480726" class="btn">
        拨打客服电话
      </a>
      <div class="tip blue">
        服务时间：9:00 - 17:00
      </div>
    </div>
  </van-overlay>
</template>

<script>
export default {
  name: 'ModalContact',
  props: {
    modalshow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick() {
      this.$emit('update:modalshow', false);
    },
  },
};
</script>

<style lang="scss" scoped>
.kefu-wrapper {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 315px;
  height: 330px;
  background: url(~@/assets/front/modal_kefu_bg.png) no-repeat;
  background-size: 100% 100%;
  text-align: center;
  .close {
    position: absolute;
    right: 5%;
    top: 5%;
    color: #fff;
  }
  .text {
    color: #6f6f6f;
    font-size: 14px;
    padding: 93px 0 38px 0;
  }
  .btn {
    display: block;
    margin: 0 auto;
    width: 255px;
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    color: #fff;
    margin-bottom: 20px;
  }
  .tip {
    padding-top: 10px;
    font-size: 12px;
  }
}
</style>
