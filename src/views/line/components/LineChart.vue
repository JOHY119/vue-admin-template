<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'

  require('echarts/theme/macarons') // echarts theme
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '100%'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null
      }
    },
    watch: {
      // val为chartData
      chartData: {
        deep: true,
        handler(val) {
          console.log(val)
          this.setOptions(val)
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.initChart()
      })
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      clicked(event) {
      },
      initChart() {
        const myChart = echarts.init(this.$el, 'macarons')
        this.chart = myChart
        this.setOptions(this.chartData)
        this.$nextTick(() => {
          myChart.on('click', function(parmas) {
            console.log(parmas)
          })
        })
      },
      // {}参数默认值为空
      setOptions({ temperature, moisture } = {}) {
        this.chart.setOption({
          xAxis: {
            data: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 30,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['温度', '湿度']
          },
          // 系列 一个系列表示一组数据以及根据这组数据画出的图和这个图的各种配置
          series: [
            {
              name: '温度',
              itemStyle: {
                normal: {
                  color: '#FF005A',
                  lineStyle: {
                    color: '#FF005A',
                    width: 2
                  }
                }
              },
              smooth: true,
              type: 'line',
              data: temperature,
              animationDuration: 2800,
              animationEasing: 'cubicInOut'
            },
            {
              name: '湿度',
              smooth: true,
              type: 'line',
              itemStyle: {
                normal: {
                  color: '#3888fa',
                  lineStyle: {
                    color: '#3888fa',
                    width: 2
                  },
                  areaStyle: {
                    color: '#f3f8ff'
                  }
                }
              },
              data: moisture,
              animationDuration: 2800,
              animationEasing: 'quadraticOut'
            }]
        })
      }
    }
  }
</script>
