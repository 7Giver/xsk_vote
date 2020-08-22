<!-- home -->
<template>
  <div class="page user-list">
    <el-row :gutter="20" style="margin-top:20px">
      <el-col :span="8">
        <el-input
          v-model="searchName"
          size="small"
          placeholder="输入用户名进行搜索"
          @change="handleSearch"
        />
      </el-col>
      <el-col :span="8" />
    </el-row>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="用户名" prop="nick_name" />
      <el-table-column label="创建日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            scope.row.create_time | formatDate
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="open_id" prop="open_id" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="
              $router.push({
                name: 'UserDetail',
                params: { id: scope.row.id },
              })
            "
          >
            投票与邀请详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getWxUsers } from 'api/admin.js';

export default {
  name: 'UserList',
  data() {
    return {
      searchName: '',
      tableData: [
        {
          id: '',
          city: '',
          create_time: '',
          headimgurl: '',
          nick_name: '',
          open_id: '',
          province: '',
          sex: 0,
          union_id: '',
        },
      ],
    };
  },
  async created() {
    const { data } = await getWxUsers();
    this.tableData = data;
  },
  methods: {
    handleSearch() {
      console.log(this.searchName);
    },
  },
};
</script>
