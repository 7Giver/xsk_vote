<!-- home -->
<template>
  <div class="page user-promotion">
    <CityBtns @changeCity="handleChangeCity" />

    <div style="margin-top:30px">
      <el-button
        :class="{ 'el-button--primary': type == 'all' }"
        @click="handleType('all')"
      >
        总排行
      </el-button>
      <el-button
        :class="{ 'el-button--primary': type == 'month' }"
        @click="handleType('month')"
      >
        月排行
      </el-button>
      <el-button
        :class="{ 'el-button--primary': type == 'day' }"
        @click="handleType('day')"
      >
        日排行
      </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <!-- <el-table-column label="编号" prop="id" /> -->
      <el-table-column label="用户名" prop="username" />

      <el-table-column label="推广人数" prop="invite_count" />

      <el-table-column label="投票次数" prop="vote_count" />
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
import { userRank } from '@/api/admin.js';
import CityBtns from './c_city_btns';

export default {
  name: 'UserPromotion',
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
      type: 'all',
      city_id: '',
      searchName: '',
      tableData: [],
    };
  },
  methods: {
    handleChangeCity(id) {
      this.city_id = id;
      this.userList();
    },
    handleType(t) {
      this.type = t;
      this.userList();
    },
    async userList() {
      const { data } = await userRank(this.city_id, this.type, this.page);
      console.log('search', data);
      this.pageinfo.count = data.total_row;
      this.tableData = data.items || [];
    },
    handleCurrentChange() {
      this.userList();
    },
  },
};
</script>
