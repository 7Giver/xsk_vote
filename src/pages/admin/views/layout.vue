<template>
  <el-container>
    <el-aside class="sidebar-container">
      <el-menu
        background-color="rgb(48, 65, 86)"
        text-color="rgb(191, 203, 217)"
        active-text-color="rgb(64, 158, 255)"
        :default-openeds="['1', '2']"
        :default-active="$route.path"
        router
      >
        <el-submenu
          v-for="(submenu, i) in menu"
          :key="i"
          :index="submenu.index"
        >
          <template slot="title">
            {{ submenu.title }}
          </template>
          <el-menu-item
            v-for="item in submenu.children"
            :key="item.index"
            :index="item.index"
          >
            {{ item.name }}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container class="main-container">
      <el-header
        style="text-align: right;
              font-size: 12px;
              background-color: #b3c0d1;
              color: #333;
              line-height: 58px"
      >
        <span style="margin-right:20px">
          admin
        </span>
        <el-link @click="logout">
          退出
        </el-link>
      </el-header>

      <el-main>
        <keep-alive v-if="$route.meta.keepAlive">
          <router-view />
        </keep-alive>
        <router-view v-else />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'AppLayout',
  components: {},
  data() {
    return {
      menu: [
        {
          title: '公司',
          index: '1',
          children: [
            { name: '公司列表', index: '/' },
            { name: 'LOGO', index: '/logo' },
            { name: '城市', index: '/city' },
          ],
        },
        {
          title: '用户',
          index: '2',
          children: [
            { name: '排行榜', index: '/user_promotion' },
            { name: '用户信息', index: '/user_list' },
          ],
        },
      ],
    };
  },
  methods: {
    logout() {
      storage.set('admintoken', null);
      window.location.replace('/admin/login');
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 210px !important;
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}
.el-menu-item:hover,
.el-submenu > .el-submenu__title:hover {
  background-color: #001528 !important;
}
.main-container {
  min-height: 100%;
  -webkit-transition: margin-left 0.28s;
  transition: margin-left 0.28s;
  margin-left: 210px;
  position: relative;
}
.el-pagination {
  text-align: center;
  padding: 20px 0;
}
</style>
