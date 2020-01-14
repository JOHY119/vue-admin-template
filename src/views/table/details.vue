<template>
  <!--  页面高度为100vh去掉面包屑栏高度-->
  <div class="components-container" style="height: calc(100vh - 90px)">
    <aside>详情：舍号
      <template>
        <el-select v-model="value" placeholder="请选择" @change="changeRouter()">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </template>

    </aside>
    <!--    内容容器高度为页面高度去掉面包屑aside再去掉margin-->
    <el-container style="height: calc(100vh - 166px)">
      <el-container>
        <el-main class="detail-main">
          <!--当前详细温度-->
          <!--                full-card 卡片充满整个区域-->
          <div style="padding: 20px;" class="card-container">
            <el-card class="box-card full-card">
              <div slot="header" class="clearfix">
                <span>当前温度</span>
              </div>
              <div class="card-context">
                <div v-for="item in itemTemperatureDetail" :key="item.key" class="text item multi-col">
                  <i class="el-icon-caret-right" />
                  {{ item.description+': '+33 }}
                </div>
              </div>
            </el-card>
          </div>

          <!--                    主要参数-->
          <div class="card-container">
            <el-card class="box-card full-card">
              <div slot="header" class="clearfix">
                <span style="font-size: 24px">主要参数</span>
              </div>
              <div class="card-context">
                <div v-for="item in itemMainInfo" :key="item.key" class="text item" style="font-size: 18px">
                  <i class="el-icon-caret-right" style="color: orange" />
                  {{ item.description+': '+33 }}
                </div>
              </div>
            </el-card>
          </div>
          <!--                    水料量记录-->
          <div style="padding: 20px" class="card-container">
            <el-card class="box-card full-card">
              <div slot="header" class="clearfix">
                <span>水料量记录</span>
                <!--                          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
              </div>
              <div class="card-context">
                <div v-for="item in itemWaterFeed" :key="item.key" class="text item">
                  <i class="el-icon-caret-right" />
                  {{ item.description+': '+33 }}
                </div>
              </div>
            </el-card>
          </div>
        </el-main>
        <el-footer class="detail-footer" height="auto">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>其他状态</span>
            </div>
            <div class="card-context">
              <div
                style="
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: baseline;
                "
              >
                <span
                  v-for="item in itemOther"
                  :key="item.key"
                  class="text item"
                  style="display: inline-flex;flex-direction: column;justify-content: center;align-items: center;margin: 10px"
                >
                  <el-tag :type="randomBool()?'success':'danger'">{{ randomBool()?'开':'关' }}</el-tag>
                  <span class="icon-name" style="margin-top: 5px">{{ item.description }}</span>
                </span>
              </div>
            </div>
          </el-card>

        </el-footer>
      </el-container>
      <el-aside class="detail-aside" width="20vw">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>风机状态</span>
            </div>
            <div
              style="
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: baseline;
                "
            >
              <span
                v-for="item in 25"
                :key="item"
                class="text item"
                style="
                  display: inline-flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  margin:0.3rem;
                  width: 4rem;
                "
              >
                <el-tag :type="randomBool()?'success':'danger'">{{ randomBool()?'开':'关' }}</el-tag>
                <span class="icon-name" style="margin-top: 5px">{{ '风机组'+item }}</span>
              </span>
            </div>
          </el-card>
        </div>

      </el-aside>
    </el-container>
  </div>
</template>

<script>
  // import BoxCard from './components/BoxCard'
  import { getRoomId } from '@/api/table'

  export default {
    name: 'Details',
    components: {},
    data() {
      return {
        // 温度信息项目对照
        itemTemperatureDetail: [
          {
            'key': 'temperature1',
            'description': '温度1'
          },
          {
            'key': 'temperature2',
            'description': '温度2'
          },
          {
            'key': 'temperature3',
            'description': '温度3'
          },
          {
            'key': 'temperature4',
            'description': '温度4'
          },
          {
            'key': 'temperature5',
            'description': '温度5'
          },
          {
            'key': 'temperature6',
            'description': '温度6'
          },
          {
            'key': 'ventilation',
            'description': '通风量'
          },
          {
            'key': 'wind_speed_longitudinal',
            'description': '纵向风速'
          },
          {
            'key': 'alarm_temperature_low',
            'description': '低温报警温度'
          },
          {
            'key': 'temperature_target',
            'description': '目标温度'
          },
          {
            'key': 'alarm_temperature_high',
            'description': '高温报警温度'
          },
          {
            'key': 'temperature_heating',
            'description': '加热温度'
          },
          {
            'key': 'temperature_ventilation_longitudinal',
            'description': '纵向通风温度'
          }
        ],
        // 主要信息项目对照
        itemMainInfo: [
          {
            'key': 'temperature_current',
            'description': '当前温度'
          },
          {
            'key': 'temperature_apparent',
            'description': '体感温度'
          },
          {
            'key': 'days',
            'description': '当前日龄'
          },
          {
            'key': 'ventilation_level',
            'description': '通风级别'
          },
          {
            'key': 'window1',
            'description': '小窗1'
          },
          {
            'key': 'door1',
            'description': '保温门1'
          },
          {
            'key': 'temperature_target',
            'description': '目标温度'
          },
          {
            'key': 'temperature_relative',
            'description': '相对温度'
          },
          {
            'key': 'pressure_current',
            'description': '当前负压'
          },
          {
            'key': 'co2',
            'description': '二氧化碳'
          },
          {
            'key': 'window2',
            'description': '小窗2'
          },
          {
            'key': 'door2',
            'description': '保温门2'
          },
          {
            'key': 'curtain',
            'description': '幕帘'
          }
        ],
        // 水料量项目对照
        itemWaterFeed: [
          {
            'key': 'water_today',
            'description': '今日用水量'
          },
          {
            'key': 'feed_today',
            'description': '今日用料量'
          },
          {
            'key': 'feed_per',
            'description': '只鸡耗料量'
          },
          {
            'key': 'amount_initial',
            'description': '初始数量'
          },
          {
            'key': 'amount_remain',
            'description': '剩余数量'
          },
          {
            'key': 'water_total',
            'description': '总用水量'
          },
          {
            'key': 'feed_total',
            'description': '总用料量'
          },
          {
            'key': 'death_add',
            'description': '新增死淘'
          },
          {
            'key': 'death_total',
            'description': '累计死淘'
          }
        ],
        itemOther: [
          {
            'key': 'is_alarm',
            'description': '报警'
          },
          {
            'key': 'is_heating1',
            'description': '加热1'
          },
          {
            'key': 'is_heating2',
            'description': '加热2'
          },
          {
            'key': 'is_heating3',
            'description': '加热3'
          },
          {
            'key': 'is_light',
            'description': '照明'
          },
          {
            'key': 'is_pump',
            'description': '冷却水泵'
          },
          {
            'key': 'is_feed',
            'description': '料线'
          },
          {
            'key': 'is_spray',
            'description': '喷雾'
          },
          {
            'key': 'is_curtain_on',
            'description': '幕帘开'
          },
          {
            'key': 'is_curtain_off',
            'description': '幕帘关'
          }
        ],
        options: [
          {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        value: ''
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
    },
    methods: {
      resize() {
        console.log('resize')
      },
      randomBool() {
        return (Math.random() > 0.5)
      },
      fetchData() {
        // this.listLoading = true
        console.log('fetch room id')
        getRoomId().then(response => {
          console.log('got room id')
          // 获取url中的舍id
          const uuid = this.$route.params && this.$route.params.id
          console.log('uuid from url: ', uuid)
          // 将api获取的舍列表转换为下拉菜单选项列表
          this.options = response.data.items.map(function(item) {
            return { value: item.uuid, label: item.id }
          })
          // 根据舍uuid选择当前被选中的舍
          const v = this.options.filter(function(item) {
            return item.value.toString() === uuid.toString()
          })
          // 最终结果为当前选择的舍或者列表中的第一个舍
          this.value = v[0].value || this.options[0].value
          this.listLoading = false
        })
      },
      changeRouter() {
        const id = this.value
        this.$router.push(
          {
            name: 'Details', params: { id }
          })
      }
    }
  }
</script>

<style scoped>
  .components-container {
    position: relative;
    /*margin-bottom: 0;*/
    /*height: calc(100vh - 90px);*/
    /*overflow: auto;*/
  }
  .detail-main{
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
  }
  .detail-footer{
  }
  .detail-aside{
    padding: 10px;
    background-color: white;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 15px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .multi-col {
    display: inline-block;
    width: 50%
  }
  .card-container{
    /*卡片占整个区域宽度的三分之一*/
    width: 33%;
    overflow-y: auto;
    padding: 10px;
  }
  .full-card {
    /*height: 100%;*/
  }
  .card-context{
  }

</style>
