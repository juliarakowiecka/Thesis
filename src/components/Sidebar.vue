<template>
  <el-aside class="sidebar">
    <el-menu default-active="2">
      <el-menu-item index="1">
        <i class="el-icon-location"></i>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-user"></i>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-help"></i>
      </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-bell"></i>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-goods"></i>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: "Sidebar",
};
</script>

<style lang="scss" scoped>
.el-menu-item{
  color: rgb(229, 161, 71);
}

.sidebar {
  width: 60px !important;
  background-color: rgb(83, 92, 109);
  box-shadow: inset -1px 0px 3px white;

  .el-menu {
    background-color: transparent;

    &.item {
      color: white;
    }
  }
}
</style>
