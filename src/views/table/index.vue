<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="20">
        <el-table
          v-loading="listLoading"
          stripe
          :data="list"
          element-loading-text="Loading"
          border
          fit
        >
          <el-table-column key="id" align="center" label="舍号">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column key="days" align="center" label="日龄">
            <template slot-scope="scope">
              {{ scope.row.days }}
            </template>
          </el-table-column>
          <el-table-column key="temperature" label="实测温度" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.temperature }}</span>
            </template>
          </el-table-column>
          <el-table-column key="moisture" label="实测湿度" width="110" align="center">
            <template slot-scope="scope">
              {{ scope.row['moisture'] }}
            </template>
          </el-table-column>
          <el-table-column key="pressure" label="实测负压" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.pressure }}</span>
            </template>
          </el-table-column>
          <el-table-column key="num_fans" label="风机数量" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.num_fans }}</span>
            </template>
          </el-table-column>
          <el-table-column key="angle_window" label="小窗角度" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.angle_window }}</span>
            </template>
          </el-table-column>
          <el-table-column key="angle_door" label="保温门角度" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.angle_door }}</span>
            </template>
          </el-table-column>
          <el-table-column key="is_pump" label="水泵" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.is_pump?'success':'danger'">{{ scope.row.is_pump?'开':'关' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column key="is_heating" label="加热" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.is_heating?'success':'danger'">{{ scope.row.is_pump?'开':'关' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column key="is_light" label="灯光" align="center">
            <template slot-scope="scope">
              <el-tag :type="scope.row.is_light?'success':'danger'">{{ scope.row.is_pump?'开':'关' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column key="numbers" label="存栏量" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.numbers }}</span>
            </template>
          </el-table-column>
          <!--      <el-table-column class-name="status-col" label="Status" width="110" align="center">-->
          <!--        <template slot-scope="scope">-->
          <!--          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
          <!--        </template>-->
          <!--      </el-table-column>-->
          <el-table-column label="操作项" align="center">
            <template slot-scope="scope">
              <el-popover
                ref="action-popover"
                :open-delay="100"
                :close-delay="100"
                placement="bottom"
                trigger="hover"
              >
                <div align="center">
                  <el-button-group align="center">
                    <!--              <el-button type="info">修改</el-button>-->
                    <router-link :to="'/table/details/'+scope.row.uuid">
                      <el-button type="primary" size="small" icon="el-icon-edit">
                        查看详情
                      </el-button>
                    </router-link>
                    <!--              <el-button type="danger">删除</el-button>-->
                  </el-button-group>

                </div>
              </el-popover>
              <el-button v-popover:action-popover>操作</el-button>

            </template>

          </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="4">
        <!--        组件吸附 在页面固定位置不动-->
        <sticky :sticky-top="20">
          <div style="margin-bottom: 20px">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>警 报</span>
                <!--                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
              </div>
              <div>
                <span
                  v-for="o in 4"
                  :key="o"
                  style="display: inline-flex;flex-flow: row wrap;align-items: center;margin: 5px"
                >
                  <el-button type="danger" icon="el-icon-bell" circle style="margin-right: 3px" />
                  <span style="display: flex; flex-flow: column nowrap">
                    <span>紧急报警</span>
                    <span>0</span>
                  </span>
                </span>
              </div>
            </el-card>
          </div>

          <div>
            <el-card>
              <div slot="header" class="clearfix">
                <span>天气预报</span>
                <!--                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
              </div>
              <!--              为了让隐藏后的天气信息大概居中-->
              <div style="margin-left: 50px;margin-top: 70px">
                <Weather />
              </div>
            </el-card>
          </div>
        </sticky>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import Sticky from '@/components/Sticky'
  import Weather from './components/Weather'

  export default {
    components: { Sticky, Weather },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'gray',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    data() {
      return {
        list: null,
        listLoading: true,
        timer: 0,
        url1: ''
      }
    },
    created() {
      this.fetchData()
    },
    mounted() {
      this.timer = setInterval(this.fetchData, 1000)
      this.url1 = 'https://apip.weatherdt.com/h5.html?id=np2eaGaVnT'
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      fetchData() {
        // this.listLoading = true
        console.log('fetch main data')
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      }
    }
  }
</script>

<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    /*width: 480px;*/
  }
</style>
