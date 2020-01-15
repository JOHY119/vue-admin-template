<template>
  <div>
    <el-table v-if="type==='corporation'" :data="corporationList" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.corporationId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <!--使用parseTime格式化时间戳-->
          <span>{{ scope.row.createTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.corporationName }}</span>
          <el-tag>{{ type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="下属厂数量">
        <template slot-scope="scope">
          <span>{{ scope.row.farmNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="关联账户数量">
        <template slot-scope="scope">
          <!--        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>-->
          <span>{{ scope.row.accountNumber }}</span>
        </template>
      </el-table-column>

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
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-edit"
                  @click="toNextLevel('corporation',scope.row)">
                  <span>查看下一级</span>
                </el-button>
                <el-button type="success" size="small" icon="el-icon-edit">
                  <span>修改</span>
                </el-button>
                <!--              <el-button type="danger">删除</el-button>-->
              </el-button-group>

            </div>
          </el-popover>
          <el-button v-popover:action-popover>操作</el-button>

        </template>

      </el-table-column>
    </el-table>
    <el-table v-else-if="type==='farm'" :data="farmList" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.corporationId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <!--使用parseTime格式化时间戳-->
          <span>{{ scope.row.createTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.corporationName }}</span>
          <el-tag>{{ type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="下属厂数量">
        <template slot-scope="scope">
          <span>{{ scope.row.farmNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="关联账户数量">
        <template slot-scope="scope">
          <!--        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>-->
          <span>{{ scope.row.accountNumber }}</span>
        </template>
      </el-table-column>

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
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="handle">
                    <span>查看下一级</span>
                  </el-button>
                  <el-button type="success" size="small" icon="el-icon-edit">
                    <span>修改</span>
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
    <el-table v-else :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column
        v-loading="loading"
        align="center"
        label="ID"
        width="65"
        element-loading-text="请给我点时间！"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.corporationId }}</span>
        </template>
      </el-table-column>

      <el-table-column width="180px" align="center" label="创建时间">
        <template slot-scope="scope">
          <!--使用parseTime格式化时间戳-->
          <span>{{ scope.row.createTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>

      <el-table-column min-width="300px" label="名称">
        <template slot-scope="{row}">
          <span>{{ row.corporationName }}</span>
          <el-tag>{{ type }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="110px" align="center" label="下属厂数量">
        <template slot-scope="scope">
          <span>{{ scope.row.farmNumber }}</span>
        </template>
      </el-table-column>

      <el-table-column width="120px" label="关联账户数量">
        <template slot-scope="scope">
          <!--        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>-->
          <span>{{ scope.row.accountNumber }}</span>
        </template>
      </el-table-column>

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
                  <el-button type="primary" size="small" icon="el-icon-edit" @click="handle">
                    <span>查看下一级</span>
                  </el-button>
                  <el-button type="success" size="small" icon="el-icon-edit">
                    <span>修改</span>
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
  </div>
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
        default: 'corporation'
      }
    },
    data() {
      return {
        corporationList: [
          {
            'type': 'corporation',
            'id': 1,
            'name': '青岛一集团',
            'createTimestamp': 271130384359,
            'farmNumber': 3,
            'accountNumber': 1
          },
          {
            'type': 'corporation',
            'id': 2,
            'name': '浙江二集团',
            'createTimestamp': 271130384359,
            'farmNumber': 4,
            'accountNumber': 2
          }
        ],
        farmList: [
          {
            'type': 'farm',
            'id': 1,
            'name': '青岛新六合有限公司',
            'createTimestamp': 271130384359,
            'houseNumber': 12,
            'accountNumber': 1,
            'corporationId': 1,
            'corporationName': '青岛一集团'
          },
          {
            'type': 'farm',
            'id': 2,
            'name': '青岛新7合有限公司',
            'createTimestamp': 271130384359,
            'houseNumber': 12,
            'accountNumber': 1,
            'corporationId': 1,
            'corporationName': '青岛一集团'
          },
          {
            'type': 'farm',
            'id': 3,
            'name': '青岛新8合有限公司',
            'createTimestamp': 271130384359,
            'houseNumber': 12,
            'accountNumber': 1,
            'corporationId': 1,
            'corporationName': '青岛一集团'
          },
          {
            'type': 'farm',
            'id': 6,
            'name': '浙江zz有限公司',
            'createTimestamp': 271130384359,
            'houseNumber': 12,
            'accountNumber': 1,
            'corporationId': 2,
            'corporationName': '浙江二集团'
          },
          {
            'type': 'farm',
            'id': 7,
            'name': '浙江zz有限公司',
            'createTimestamp': 271130384359,
            'houseNumber': 12,
            'accountNumber': 1,
            'corporationId': 2,
            'corporationName': '浙江二集团'
          },
          {
            'type': 'farm',
            'id': 8,
            'name': '浙江zz有限公司',
            'createTimestamp': 271130384359,
            'houseNumber': 12,
            'accountNumber': 1,
            'corporationId': 2,
            'corporationName': '浙江二集团'
          },
          {
            'type': 'farm',
            'id': 9,
            'name': '浙江zz有限公司',
            'createTimestamp': 271130384359,
            'houseNumber': 12,
            'accountNumber': 1,
            'corporationId': 2,
            'corporationName': '浙江二集团'
          }
        ],
        houseList: [
          {
            'type': 'house',
            'id': 1001,
            'name': '鸡舍',
            'createTimestamp': 271130384359,
            'accountNumber': 0,
            'corporationId': 1,
            'corporationName': '青岛一集团',
            'farmId': 1,
            'farmName': '青岛新六合有限公司'
          },
          {
            'type': 'house',
            'id': 8010,
            'name': '10',
            'createTimestamp': 271130384359,
            'accountNumber': 1,
            'corporationId': 2,
            'corporationName': '浙江二集团',
            'farmId': 8,
            'farmName': '浙江zz有限公司'
          }
        ],
        current: {
          corporation: {id: '', name: ''},
          farm: {id: '', name: ''},
          house: {id: '', name: ''}
        },

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
        // 使用listQuery作为查询条件调用api
        this.loading = true
        this.$emit('create') // for test
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
          this.loading = false
        })
      },
      toNextLevel(currentLevel, data) {
        this.current[currentLevel].id = data.id
        this.current[currentLevel].name = data.name
      }
    }
  }
</script>

