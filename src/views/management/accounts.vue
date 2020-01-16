<template>
  <div class="tab-container">
    <el-tabs type="border-card">
      <el-tab-pane key="corporation" label="集团" name="corporation">用户管理</el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Accounts'
  }
</script>

<style scoped>
  .tab-container{
    margin: 30px;
  }

</style>
