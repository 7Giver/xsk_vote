<!-- home -->
<template>
  <div class="page company">
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="8">
        <el-button type="primary" size="small" @click="handleNew">
          新增城市
        </el-button>

        <el-dialog title="编辑信息" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="城市" label-width="120px">
              <el-input v-model="cityForm.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="投票截止时间" label-width="120px">
              <el-date-picker
                v-model="cityForm.limit_time"
                type="datetime"
                placeholder="选择日期时间"
              />
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">
              取 消
            </el-button>
            <el-button type="primary" @click="handleFormSubmit">
              确 定
            </el-button>
          </div>
        </el-dialog>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" prop="id" />

      <el-table-column label="城市名" prop="name" />

      <el-table-column label="投票截止时间">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.limit_time | formatDate('yy-MM-dd hh:mm:ss')
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建日期">
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
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getCity, createCity, updateCity, delCity } from '@/api/admin.js';

export default {
  name: 'City',
  data() {
    return {
      cityForm: {
        id: '',
        name: '',
        limit_time: '',
      },
      dialogFormVisible: false,
      tableData: [],
    };
  },
  async created() {
    await this.cityList();
  },
  methods: {
    async cityList() {
      const { data } = await getCity();
      this.tableData = data;
    },
    async handleFormSubmit() {
      if (this.cityForm.id) {
        await updateCity(this.cityForm);
      } else {
        await createCity(this.cityForm);
      }
      this.cityList();
      this.dialogFormVisible = false;
    },
    handleNew() {
      this.cityForm.id = '';
      this.dialogFormVisible = true;
    },
    handleEdit(row) {
      this.cityForm = row;
      this.dialogFormVisible = true;
    },
    handleDelete(row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await delCity(row.id);
        this.cityList();
      });
    },
  },
};
</script>
