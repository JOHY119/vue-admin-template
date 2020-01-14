<template>
  <div class="row-container">
    <panel-group @handleSelectRoom="handleSelectRoom"/>
    <div style="background:#fff;padding:16px 16px 0;margin-bottom:32px;height: 70vh">
      <line-chart :chart-data="lineChartData"/>
    </div>

  </div>
</template>

<script>
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }
  const roomData = {
    '100101': {
      'id': 1,
      'uuid': 100101,
      'temperature': [58, 43, 67, 47, 48, 32, 55],
      'moisture': [58, 53, 66, 67, 73, 62, 61]
    },
    '100102': {
      'id': 2,
      'uuid': 100102,
      'temperature': [48, 44, 53, 33, 50, 59, 67],
      'moisture': [80, 70, 80, 50, 89, 88, 82]
    },
    '100103': {
      'id': 3,
      'uuid': 100103,
      'temperature': [49, 59, 39, 37, 57, 36, 37],
      'moisture': [62, 81, 70, 77, 83, 83, 76]
    },
    '100104': {
      'id': 4,
      'uuid': 100104,
      'temperature': [47, 36, 67, 36, 39, 34, 34],
      'moisture': [86, 86, 59, 82, 61, 64, 82]
    },
    '100105': {
      'id': 5,
      'uuid': 100105,
      'temperature': [66, 69, 57, 41, 35, 47, 49],
      'moisture': [73, 50, 82, 77, 64, 72, 89]
    },
    '100106': {
      'id': 6,
      'uuid': 100106,
      'temperature': [52, 32, 48, 69, 45, 66, 45],
      'moisture': [59, 84, 83, 53, 74, 64, 53]
    },
    '100107': {
      'id': 7,
      'uuid': 100107,
      'temperature': [65, 58, 38, 32, 52, 33, 63],
      'moisture': [72, 64, 58, 88, 83, 84, 50]
    },
    '100108': {
      'id': 8,
      'uuid': 100108,
      'temperature': [57, 44, 68, 40, 40, 51, 32],
      'moisture': [68, 73, 85, 59, 51, 63, 69]
    },
    '100109': {
      'id': 9,
      'uuid': 100109,
      'temperature': [41, 61, 32, 52, 69, 49, 34],
      'moisture': [78, 54, 59, 67, 77, 81, 76]
    },
    '100110': {
      'id': 10,
      'uuid': 100110,
      'temperature': [40, 36, 53, 60, 33, 31, 33],
      'moisture': [70, 65, 61, 71, 77, 71, 53]
    }
  }

  export default {
    name: 'LineMain',
    components: {
      PanelGroup,
      LineChart
    },
    data() {
      return {
        lineChartData: roomData['100101']
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },
      // 根据此uuid 获取舍的具体数据
      handleSelectRoom(uuid) {
        this.lineChartData = roomData[uuid]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .row-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

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
