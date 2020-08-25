<template>
  <el-container style="height: 100%; ">
    <Sidebar />
    <el-main>
      <BoardPage />
    </el-main>
  </el-container>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
import BoardPage from "./pages/Board.vue";

export default {
  name: "app",
  components: {
    Sidebar: Sidebar,
    BoardPage: BoardPage,
  },
};
</script>
