<template>
  <div>
    <div class="chart-container">
      <chart height="100%" width="100%" :chart-data="barChartData"/>
    </div>
  </div>
</template>

<script>
  import Chart from './components/BarMarker'
  import { getList } from '@/api/table'

  export default {
    name: 'Bar2',
    components: {
      Chart
    },
    data() {
      return {
        barChartData: [],
        timer: 0
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      this.timer = setInterval(this.fetchData, 5000)
    },
    // 一定要在此销毁定时获取器 否则会内存溢出
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      fetchData() {
        // this.listLoading = true
        console.log('fetch bar data')
        getList().then(response => {
          this.barChartData = response.data.items
          // console.log(this.barChartData)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  .chart-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
  }
</style>
