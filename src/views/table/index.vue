<template>
  <div class="app-container">
    <el-row :gutter="10">
      <!-- 主显示区 -->
      <el-col :span="20">
        <el-table
          v-loading="listLoading"
          stripe
          :data="list"
          element-loading-text="Loading"
          border
          fit
        >
          <el-table-column key="name" align="center" label="舍名">
            <template slot-scope="scope">
              {{ scope.row.name }}
              <i class="el-icon-edit-outline" style="cursor: pointer" @click="changeHouseName(scope.row)"></i>
              <!--              <el-button icon="el-icon-edit" size="mini"></el-button>-->
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
        <div>
          <el-button style="width: 100%" @click="showDialogAddHouse">添加</el-button>
        </div>
      </el-col>
      <!-- 右侧栏 -->
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
                  <el-button type="danger" icon="el-icon-bell" circle style="margin-right: 3px"/>
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
                <Weather/>
              </div>
            </el-card>
          </div>
        </sticky>
      </el-col>
    </el-row>
    <!--  弹窗 修改舍名  -->
    <el-dialog title="修改舍名" :visible.sync="dialogChangeName.visible">
      <el-form :model="form">
        <el-form-item label="舍 名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChangeName.visible = false">取 消</el-button>
        <!-- todo: @click 向服务器提交数据 -->
        <el-button type="primary" @click="dialogChangeName.visible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!--  弹窗 添加新舍  -->
    <!-- todo: 统一id和uuid 服务端确定数据格式后 -->
    <el-dialog title="添加新舍" :visible.sync="dialogAddHouse.visible">
      <el-form :model="dialogAddHouse">
        <el-form-item label="可选舍" :label-width="formLabelWidth">
          <el-select
            v-model="dialogAddHouse.uuid"
            @change="changeDialogAddHouseSelect"
            placeholder="请选择要添加的舍"
          >
            <!-- label不能为数字0 -->
            <el-option
              v-for="item in dialogAddHouse.houseList"
              :key="item.id"
              :label="item.name.toString()"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="舍id" :label-width="formLabelWidth">
          <span>{{ dialogAddHouse.uuid }}</span>
        </el-form-item>
        <el-form-item label="舍名" :label-width="formLabelWidth">
          <el-input v-model="dialogAddHouse.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddHouse.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddHouse.visible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getList} from '@/api/table'
  import {fetchHouseList} from '@/api/entity'
  import Sticky from '@/components/Sticky'
  import Weather from './components/Weather'
  import {mapGetters} from 'vuex'

  export default {
    components: {Sticky, Weather},
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
        form: {
          uuid: '',
          name: ''
        },

        dialogChangeName: {
          visible: false,
          uuid: '',
          name: ''
        },
        dialogAddHouse: {
          isLoading: false,
          houseList: [],
          visible: false,
          uuid: '',
          name: ''
        },
        formLabelWidth: '120px'
      }
    },
    computed: {
      ...mapGetters([
        'global_corporation_id',
        'global_farm_id'
      ])
    },
    created() {
      this.fetchData(this.global_farm_id)
    },
    mounted() {
      this.timer = setInterval(this.fetchDataHandler, 1000)
    },
    beforeDestroy() {
      clearTimeout(this.timer)
    },
    methods: {
      // 获取该厂实时数据
      // args：厂id
      fetchData(farmId) {
        // console.log(farmId)
        if (!farmId) {
          this.$message({
            message: '请先选择要显示的养殖场',
            type: 'error',
            duration: 5000
          })
          this.list = []
          this.listLoading = false
          return
        }
        console.log('fetch main data')
        getList().then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
      },
      // 定时器Handler的参数只固定一次，为了动态获取参数，需要再包装一层函数
      fetchDataHandler() {
        this.fetchData(this.global_farm_id)
      },
      // 显示修改舍名对话框
      showDialogChangeName(row) {
        this.dialogChangeName.uuid = row.uuid
        this.dialogChangeName.name = row.name
        this.dialogChangeName.visible = true
      },
      // 显示添加新社对话框
      showDialogAddHouse() {
        this.dialogAddHouse.visible = true
        this.dialogAddHouse.isLoading = true
        fetchHouseList({farmId: this.global_farm_id}).then(response => {
          console.log(response.data.items)
          this.dialogAddHouse.houseList = response.data.items
          this.dialogAddHouse.isLoading = false
        })
      },
      changeDialogAddHouseSelect(item) {
        this.dialogAddHouse.name =
          this.dialogAddHouse.houseList.find(item => {
            return item.id === this.dialogAddHouse.uuid
          }).name
        console.log(this.dialogAddHouse.name)
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
