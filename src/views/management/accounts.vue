<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.key" :label="item.label" :name="item.key">
        <tab-pane v-if="activeName==item.key" :type="item.key"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import tabPane from './components/TabPane'

  export default {
    name: 'Accounts',
    components: {tabPane},
    data() {
      return {
        tabMapOptions: [
          {label: '集团', key: 'corporation'},
          {label: '养殖场', key: 'farm'},
          {label: '养殖舍', key: 'house'},
          {label: '展示账户', key: 'display'}
          ],
        activeName: 'corporation',
        createdTimes: 0
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      // init the default selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
