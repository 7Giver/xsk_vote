<template>
  <div class="page add-company">
    <el-form
      label-position="left"
      label-width="80px"
      :model="companyForm"
      style="max-width:600px"
    >
      <el-form-item label="城市">
        <el-select v-model="companyForm.city_id" placeholder="选择城市">
          <el-option
            v-for="it in cities"
            :key="it.id"
            :label="it.name"
            :value="it.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input v-model="companyForm.name" />
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="companyForm.contact" />
      </el-form-item>
      <el-form-item label="公司简介">
        <el-input v-model="companyForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item label="票数">
        <el-input v-model.number="companyForm.vote_score_base" />
      </el-form-item>
      <el-form-item label="信用分">
        <el-input v-model.number="companyForm.credit_score" />
      </el-form-item>
      <el-form-item label="网站">
        <el-input v-model="companyForm.website" />
      </el-form-item>

      <el-form-item label="logo">
        <el-upload
          class="logo-uploader"
          :headers="tokenHeader"
          :action="uploadUrl"
          :on-success="handleSuccess"
          :on-error="handleError"
          :limit="1"
          :file-list="logoList"
          list-type="picture"
        >
          <el-button size="small" type="primary">
            点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件
          </div>
        </el-upload>
      </el-form-item>

      <el-form-item label="背景音乐">
        <el-upload
          class="music-uploader"
          :headers="tokenHeader"
          :action="uploadMp3Url"
          :on-success="handleMusicSuccess"
          :on-error="handleMusicError"
          :limit="1"
          :file-list="musicList"
        >
          <el-button>上传</el-button>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleFormSubmit">
          立即提交
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  getCity,
  getCompanyInfo,
  creatCompany,
  updateCompany,
} from '@/api/admin.js';
import { baseApi } from '@/config/env.development.js';

export default {
  name: 'CreateOrUpdateCompany',
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      logoList: [],
      musicList: [],
      tokenHeader: {
        token: storage.get('admintoken'),
      },
      uploadUrl: `${baseApi}/u/uploadImg`,
      uploadMp3Url: `${baseApi}/a/uploadMp3`,
      cities: [],
      companyForm: {
        name: '',
        contact: '',
        logo_url: '',
        music_url: '',
        desc: '',
        city_id: '',
        credit_score: 0,
        id: '',
        // verify_status: 0,
        vote_score: 0,
        vote_score_base: 0,
        website: '',
      },
    };
  },
  async created() {
    const { data } = await getCity();
    this.cities = data;
    await this.getInfo();
  },
  methods: {
    handleMusicSuccess(response, file) {
      console.log(response, file);
      this.companyForm.music_url = response.data.Url;
    },
    handleMusicError(err, file) {
      console.log(err, file);
      this.$message.error(`音乐上传失败${JSON.stringify(err)}`);
    },
    handleError(err, file) {
      this.$message.error(`图片上传失败${JSON.stringify(err)}`);
      console.log(err, file);
    },
    handleSuccess(response, file) {
      this.companyForm.logo_url = response.data.Url;
      console.log(response, file);
    },
    async getInfo() {
      let res;
      if (this.id !== 'new') {
        res = await getCompanyInfo(this.id);
        this.companyForm = res.data;
        const url = $cdn + this.companyForm.music_url;
        this.logoList = [{ url: $cdn + this.companyForm.logo_url }];
        this.musicList = [{ name: this.companyForm.music_url, url }];
      }
    },
    async handleFormSubmit() {
      let res;
      if (this.id !== 'new') {
        res = await updateCompany(this.companyForm);
      } else {
        res = await creatCompany(this.companyForm);
      }
      if (res) {
        this.$message.success('上传/更新成功');
        this.$router.push('/');
      } else {
        this.$message.success('上传/更新失败');
      }
    },
  },
};
</script>
