<template>
  <div class="app-container">
    <el-container>
      <el-main class="alarm-main">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
        >
          <el-table-column
            prop="roomId"
            label="舍号"
            width="180"
          />
          <el-table-column
            prop="alarmType"
            label="报警名称"
          />
          <el-table-column
            prop="startTime"
            label="开始时间"
            width="180"
          />
          <el-table-column
            prop="endTime"
            label="结束时间"
            width="180"
          />
        </el-table>
      </el-main>
      <el-aside class="alarm-aside" width="auto">
        <div>
          <el-card>
            <div slot="header" class="clearfix">
              <span>导出</span>
            </div>
            <div>
              <div class="row-container">
                <div>日期：</div>
                <el-date-picker
                  style="width: 225px"
                  v-model="value2"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
              <div class="row-container">
                <router-link class="pan-btn green-btn" to="#">
                  导出
                </router-link>
              </div>
            </div>
          </el-card>
        </div>

      </el-aside>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'AlarmIndex',
    data() {
      return {
        tableData: [
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          }, {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          }, {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          },
          {
            roomId: '1',
            alarmType: '模块掉线模块掉线模块掉线模块掉线',
            startTime: '2020/1/13 上午9:16:43',
            endTime: '2020/1/13 上午10:16:43'
          }
        ],
        options: [{
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
        value: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value1: '',
        value2: ''
      }
    }
  }
</script>

<style scoped>
  .alarm-main {
    height: 100%;
  }

  .alarm-aside {
    background-color: white;
  }

  .row-container {
    margin: 20px 0;
  }

</style>
