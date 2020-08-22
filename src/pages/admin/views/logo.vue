<template>
  <div class="page logo">
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      title="编辑logo"
      :visible.sync="dialogFormVisible"
    >
      <el-form style="height: 250px">
        <el-form-item label="数量" label-width="120px">
          <el-input v-model.number="logoForm.total_count" autocomplete="off" />
        </el-form-item>
        <el-form-item label="logo" label-width="120px">
          <el-upload
            class="logo-uploader"
            :headers="tokenHeader"
            :action="uploadUrl"
            :on-success="handleLogoSuccess"
            :on-error="handleLogoError"
            :limit="1"
            :file-list="logoList"
            list-type="picture"
          >
            <el-button size="small" type="primary">
              点击上传
            </el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCloseForm">
          取 消
        </el-button>
        <el-button type="primary" @click="handleFormSubmit">
          确 定
        </el-button>
      </div>
    </el-dialog>

    <el-row
      type="flex"
      class="row-bg"
      justify="space-between"
      :gutter="20"
      style="margin-top:20px"
    >
      <el-col :span="8">
        <el-button
          v-for="it in types"
          :key="it.id"
          :class="{ 'el-button--primary': it.id == nowid }"
          @click="changeCategory(it.id)"
        >
          {{ it.name }}
        </el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="handleNewForm">
          上传新logo
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column label="id" prop="no" /> -->

      <el-table-column label="logo">
        <template slot-scope="scope">
          <img :src="$cdn + scope.row.logo_url" style="max-width:100px" />
        </template>
      </el-table-column>

      <!-- <el-table-column label="价格" prop="price" /> -->

      <el-table-column label="有多少人使用" prop="used_count" />
      <el-table-column label="总数" prop="total_count" />

      <el-table-column label="上传日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.create_time | formatDate
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">
            编辑
          </el-button>

          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div class="block">
      <el-pagination
        :current-page.sync="pageinfo.current"
        :page-size="pageinfo.size"
        layout="prev, pager, next, jumper"
        :total="pageinfo.count"
        @current-change="handleCurrentChange"
      />
    </div> -->
  </div>
</template>

<script>
import { getLogo, createLogo, updateLogo, delLogo } from '@/api/admin.js';
import { baseApi } from '@/config/env.development.js';

export default {
  name: 'Logo',
  data() {
    return {
      tokenHeader: {
        token: storage.get('admintoken'),
      },
      uploadUrl: `${baseApi}/u/uploadImg`,
      dialogFormVisible: false,
      logoList: [],
      pageinfo: {
        current: 1,
        size: 10,
        count: 100,
      },
      types: [
        // { id: 1, name: '免费' },
        // { id: 2, name: '收费' },
      ],
      logoForm: {
        logo_url: '',
        total_count: 0,
      },
      tableData: [],
    };
  },
  async created() {
    this.getlogoList();
  },
  methods: {
    async getlogoList() {
      const res = await getLogo();
      this.tableData = res.data;
    },
    handleLogoSuccess(res, file) {
      this.logoForm.logo_url = res.data.Url;
      console.log(res, file);
    },
    handleLogoError(err, file) {
      this.$message.error(`logo上传失败${JSON.stringify(err)}`);
      console.log(err, file);
    },
    handleCloseForm() {
      this.logoForm = {
        logo_url: '',
        total_count: 0,
      };
      this.logoList = [];
      this.dialogFormVisible = false;
    },
    handleNewForm() {
      this.logoForm = {
        logo_url: '',
        total_count: 0,
      };
      this.logoList = [];
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.logoForm = row;
      this.logoList = [
        {
          url: $cdn + row.logo_url,
        },
      ];
      this.dialogFormVisible = true;
    },
    async handleFormSubmit() {
      if (this.logoForm.id) {
        updateLogo(this.logoForm);
      } else {
        createLogo(this.logoForm);
      }
      this.$message.success('上传/更新成功');
      this.dialogFormVisible = false;
      await this.getlogoList();
    },
    handleDelete(index, row) {
      console.log(row);
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await delLogo(row.id);
        await this.getlogoList();
      });
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>
<style>
.Logo-uploader {
  display: inline-block;
  margin-right: 10px;
}
</style>
