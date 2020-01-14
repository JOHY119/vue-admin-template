<template>
  <div class="map-container">
    <div style="position: absolute;top: 5vh;right: 1vh;background-color: rgba(0,0,0,.1);height: 300px;width: 200px;z-index: 1;display: flex;flex-flow: row wrap;color: white;border: 1px solid #256;padding: 20px;">
      <span>厂数量：<span>1000</span>台</span>
      <span>联网数量：<span>1000</span>台</span>
      <span>未联网数量：<span>1000</span>台</span>
    </div>
    <!--    <map-chart height="100%" width="100%" :chart-data="mapData"/>-->
    <AMap height="100%" width="100%" :chart-data="mapData"/>
  </div>
</template>

<script>
  // import MapChart from './components/MapChart'
  import AMap from './components/AMap'

  export default {
    name: 'DashboardAdmin',
    components: {
      // MapChart,
      AMap
    },
    data() {
      return {
        mapData: []
      }
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .map-container {
    /*padding: 20px;*/
    background-color: rgb(240, 242, 245);
    position: relative;
    height: calc(100vh - 50px);

    .github-corner {
      position: absolute;
      top: 0;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
