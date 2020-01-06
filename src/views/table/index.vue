<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      stripe
      :data="list"
      element-loading-text="Loading"
      border
      fit
      @cell-mouse-enter.stop
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
      <el-table-column align="center" label="更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.update_time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作项" align="center" width="230" >
        <el-popover
          ref="action-popover"
          open-delay="100"
          close-delay="100"
          placement="bottom"
          trigger="hover"
          >
          <div align="center">
            <el-button-group align="center">
<!--              <el-button type="info">修改</el-button>-->
              <el-button type="primary">查看详情</el-button>
<!--              <el-button type="danger">删除</el-button>-->
            </el-button-group>

          </div>
        </el-popover>
        <el-button v-popover:action-popover>操作</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
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
      timer: 0
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    this.timer = setInterval(this.fetchData, 1000)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    fetchData() {
      // this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
