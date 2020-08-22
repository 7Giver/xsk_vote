<!-- home -->
<template>
  <div class="page company">
    <CityBtns @changeCity="handleChangeCity" />
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="8">
        <el-input
          v-model="searchName"
          size="small"
          placeholder="输入名称进行搜索"
          @change="companyList"
        />
      </el-col>
      <el-col :span="8">
        <el-input
          v-model="searchNumber"
          size="small"
          placeholder="输入编号进行搜索"
          @change="companyList"
        />
      </el-col>
      <el-col :span="8">
        <el-button
          type="primary"
          size="small"
          @click="$router.push('/company/new')"
        >
          添加公司
        </el-button>
      </el-col>
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="编号" prop="number" />

      <el-table-column label="名称" prop="name" />

      <el-table-column label="票数">
        <template slot-scope="scope">
          {{ scope.row.vote_score }}
        </template>
      </el-table-column>
      <el-table-column label="信用分" prop="credit_score" />

      <el-table-column label="logo">
        <template slot-scope="scope">
          <img :src="$cdn + scope.row.logo_url" style="max-width:100px" />
        </template>
      </el-table-column>

      <!-- <el-table-column label="创建日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.create_time | formatDate
          }}</span>
        </template>
      </el-table-column> -->

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              $router.push({
                name: 'CreateOrUpdateCompany',
                params: { id: scope.row.id },
              })
            "
          >
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

    <div class="block">
      <el-pagination
        :current-page.sync="pageinfo.current"
        :page-size="pageinfo.size"
        layout="prev, pager, next, jumper"
        :total="pageinfo.count"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { getCompany, delCompany } from '@/api/admin.js';
import CityBtns from './c_city_btns';

export default {
  name: 'Company',
  components: {
    CityBtns,
  },
  data() {
    return {
      pageinfo: {
        current: 1,
        size: 10,
        count: 0,
      },
      searchName: '',
      searchNumber: '',
      city_id: '',
      cities: [],
      tableData: [],
    };
  },
  methods: {
    async companyList() {
      const obj = {
        city_id: this.city_id,
        page: this.pageinfo.current,
        company_name: this.searchName,
        number: Number(this.searchNumber),
      };
      if (!this.searchName) delete obj.company_name;
      if (!this.searchNumber) delete obj.number;
      console.log('search', obj);
      const { data } = await getCompany(obj);
      this.pageinfo.count = data.total_row;
      this.tableData = data.items || [];
    },
    handleChangeCity(id) {
      this.city_id = id;
      // this.searchName = '';
      // this.searchNumber = '';
      this.companyList();
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        await delCompany(row.id);
        this.companyList();
      });
    },
    handleCurrentChange() {
      // console.log(`当前页: ${}`);
      this.companyList();
    },
  },
};
</script>
<style lang="scss" scoped></style>
