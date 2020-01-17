<template>
  <el-table :data="list" border fit highlight-current-row style="width: 100%">
    <el-table-column
      v-loading="loading"
      align="center"
      label="ID"
      width="100px"
      element-loading-text="请给我点时间！"
    >
      <template slot-scope="scope">
        <span>{{ scope.row.id }}</span>
      </template>
    </el-table-column>

    <el-table-column min-width="200px" label="用户名">
      <template slot-scope="{row}">
        <span>{{ row.username }}</span>
        <el-tag>{{ row.type }}</el-tag>
      </template>
    </el-table-column>

    <el-table-column width="110px" align="center" label="关联实体">
      <template slot-scope="scope">
        <span>{{ scope.row.relationEntityName }}</span>
      </template>
    </el-table-column>

    <el-table-column width="150px" label="time">
      <template slot-scope="scope">
        <span>{{ scope.row.time }}</span>
      </template>
    </el-table-column>

    <el-table-column class-name="status-col" label="操作项" width="200px">
      <!--      <template slot-scope="scope">-->
      <template>
        <div align="center">
          <el-button-group align="center">
            <!--              <el-button type="info">修改</el-button>-->
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
            >
              <span>修改</span>
            </el-button>
            <el-button type="danger" size="small" icon="el-icon-edit">
              <span>删除</span>
            </el-button>
            <!--              <el-button type="danger">删除</el-button>-->
          </el-button-group>

        </div>

      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {fetchList} from '@/api/article'

  export default {
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    props: {
      type: {
        type: String,
        default: 'CN'
      }
    },
    data() {
      return {
        list: [
          {
            'type': 'corporation',
            'id': '100101',
            'username': 'dmr',
            'relationEntityId': '1',
            'relationEntityName': '青岛一集团',
            'time': '1978-08-05 09:59'
          }
        ],
        listQuery: {
          page: 1,
          limit: 5,
          type: this.type,
          sort: '+id'
        },
        loading: false
      }
    },
    created() {
      // this.getList()
    },
    methods: {
      getList() {
        this.loading = true
        this.$emit('create') // for test
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.loading = false
        })
      }
    }
  }
</script>

