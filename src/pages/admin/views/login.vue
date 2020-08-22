<template>
  <div class="page login">
    <div class="login-container">
      <form class="el-form login-form el-form--label-left" auto-complete="on">
        <div class="title-container">
          <h3 class="title">
            登录
          </h3>
        </div>
        <div class="el-form-item is-required">
          <div class="el-form-item__content">
            <div class="el-input">
              <input
                v-model="ruleForm.name"
                tabindex="1"
                type="text"
                autocomplete="on"
                placeholder="Username"
                name="username"
                class="el-input__inner"
              />
            </div>
          </div>
        </div>
        <div class="el-form-item is-required">
          <div class="el-form-item__content">
            <div class="el-input">
              <input
                v-model="ruleForm.pass"
                tabindex="2"
                type="password"
                autocomplete="on"
                placeholder="Password"
                name="password"
                class="el-input__inner"
              />
            </div>
          </div>
        </div>
        <button
          type="button"
          class="el-button el-button--primary"
          style="width: 100%; margin-bottom: 30px;"
          @click="submitForm"
        >
          <span>登录</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/admin.js';

export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        name: '',
        pass: '',
      },
    };
  },

  methods: {
    async submitForm() {
      const { data } = await login(this.ruleForm.name, this.ruleForm.pass);
      storage.set('admintoken', data);
      location.replace('/admin');
    },
  },
};
</script>

<style lang="scss" scoped>
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}

$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100vh;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }
}
</style>
