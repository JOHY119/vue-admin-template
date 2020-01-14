<template>
  <div :id="id" :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import resize from './mixins/resize'

  export default {
    mixins: [resize],
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '200px'
      },
      height: {
        type: String,
        default: '200px'
      },
      chartData: {
        type: Array,
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
          this.setOptions(val)
        }
      }
    },
    mounted() {
      // 初始化
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
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id), 'light')
        this.setOptions(this.chartData)
      },
      // 取传过来对象中的 temp和mois
      setOptions(dataSet) {
        this.chart.setOption({
          // backgroundColor: '#fff',
          title: {
            top: 20,
            text: '温湿度对比',
            // textStyle: {
            //   fontWeight: 'normal',
            //   fontSize: 16,
            //   // color: '#F1F1F3'
            // },
            left: '1%'
          },
          tooltip: {
            trigger: 'axis'
            // axisPointer: {
            //   lineStyle: {
            //     color: '#57617B'
            //   }
            // }
          },
          legend: {
            top: 20,
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['温度', '湿度'],
            right: '4%'
            // textStyle: {
            //   fontSize: 12,
            //   color: '#F1F1F3'
            // }
          },
          grid: {
            top: 100,
            left: '2%',
            right: '2%',
            bottom: '2%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            // 坐标轴留白策略 true可保证数据柱不超出刻度线
            boundaryGap: true
            // axisLine: {
            //   lineStyle: {
            //     color: '#000'
            //   }
            // }
            // data: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
          }],
          yAxis: [
            {
              type: 'value',
              name: '温度 (摄氏度)',
              axisTick: {
                show: false
              }
              // axisLine: {
              //   lineStyle: {
              //     color: '#000'
              //   }
              // },
              // axisLabel: {
              //   margin: 10,
              //   textStyle: {
              //     fontSize: 14
              //   }
              // },
              // splitLine: {
              //   lineStyle: {
              //     color: '#57617B'
              //   }
              // }
            },
            {
              type: 'value',
              name: '湿度 (%)',
              axisTick: {
                show: false
              }
            }],
          dataset: {
            dimensions: [{
              name: 'id',
              type: 'ordinal'
            }, {
              name: 'uuid',
              type: 'ordinal'
            }, 'days', 'temperature', 'moisture', 'pressure', 'num_fans', 'angle_window', 'angle_door', 'is_pump', 'is_heating', 'is_light', 'numbers', 'update_time'],
            // dataSet已经为一个数组，不要多套一层
            source: dataSet
          },
          series: [
            {
              name: '温度',
              type: 'bar',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              // lineStyle: {
              //   normal: {
              //     width: 1
              //   }
              // },
              // areaStyle: {
              //   normal: {
              //     color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              //       offset: 0,
              //       color: 'rgba(137, 189, 27, 0.3)'
              //     }, {
              //       offset: 0.8,
              //       color: 'rgba(137, 189, 27, 0)'
              //     }], false),
              //     shadowColor: 'rgba(0, 0, 0, 0.1)',
              //     shadowBlur: 10
              //   }
              // },
              // itemStyle: {
              //   normal: {
              //     color: 'rgb(137,189,27)',
              //     borderColor: 'rgba(137,189,2,0.27)',
              //     borderWidth: 5
              //
              //   }
              // },
              barWidth: '20%',
              encode: {
                x: 'id',
                y: 'temperature'
              },
              yAxisIndex: 0
              // data: temperature
            },
            {
              name: '湿度',
              type: 'bar',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              barGap: '10%',
              barWidth: '20%',
              // itemStyle: {
              //   normal: {
              //     color: 'rgb(0,136,212)',
              //     borderColor: 'rgba(0,136,212,0.2)',
              //     borderWidth: 5
              //
              //   }
              // },
              encode: {
                x: 'id',
                y: 'moisture'
              },
              yAxisIndex: 1
              // data: moisture
            }
          ]
        })
      }
    }
  }
</script>
