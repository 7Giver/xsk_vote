<template>
  <div class="page add-company">
    <CityBtns @changeCity="handleChangeCity" />
    <div style="margin-top:30px">
      <el-button
        :class="{ 'el-button--primary': type == 1 }"
        @click="handleType(1)"
      >
        邀请
      </el-button>
      <el-button
        :class="{ 'el-button--primary': type == 2 }"
        @click="handleType(2)"
      >
        投票
      </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="名称" prop="name" />
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
import { getUserInviteList, getUserVoteList } from '@/api/admin.js';
import CityBtns from './c_city_btns';

export default {
  name: 'UserDetail',
  components: {
    CityBtns,
  },
  props: {
    id: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      type: 1,
      city_id: '',
      pageinfo: {
        current: 1,
        size: 10,
        count: 0,
      },
      tableData: [],
    };
  },
  async created() {},
  methods: {
    async getDate() {
      let res;
      if (this.type == 1) {
        res = await getUserInviteList({
          user_id: this.id,
          city_id: this.city_id,
          page: this.pageinfo.current,
        });
        this.tableData = res.data.users;
      } else {
        res = await getUserVoteList({
          user_id: this.id,
          city_id: this.city_id,
          page: this.pageinfo.current,
        });
        this.tableData = res.data.items;
      }
      this.pageinfo.count = res.data.total_row;
    },
    handleType(t) {
      this.type = t;
      this.pageinfo.current = 1;
      this.getDate();
    },
    handleChangeCity(id) {
      this.city_id = id;
      this.getDate();
    },
    handleCurrentChange() {
      console.log(this.pageinfo.current);
    },
  },
};
</script>
