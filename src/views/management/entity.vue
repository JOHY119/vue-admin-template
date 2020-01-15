<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane key="corporation" label="集团" name="corporation">
        <div>顶栏</div>
        <el-table :data="corporationList" border fit highlight-current-row style="width: 100%">
          <el-table-column
            v-loading="loading"
            align="center"
            label="ID"
            key="id"
            width="65"
            element-loading-text="请给我点时间！"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <el-table-column key="createTimestamp" width="180px" align="center" label="创建时间">
            <template slot-scope="scope">
              <!--使用parseTime格式化时间戳-->
              <span>{{ scope.row.createTimestamp | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column min-width="300px" label="名称">
            <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
              <el-tag>{{ scope.row.type }}</el-tag>
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

            </template>

          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane key="" label="养殖场" name="farm">
        <div>
          <div>顶栏</div>
          <el-table :data="farmList.filter(data => !current.corporation.id||data.corporationId===current.corporation.id)" border fit highlight-current-row style="width: 100%">
            <el-table-column
              v-loading="loading"
              align="center"
              label="ID"
              width="65"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
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
                <span>{{ row.name }}</span>
                <el-tag>{{ row.type }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column width="110px" align="center" label="下属舍数量">
              <template slot-scope="scope">
                <span>{{ scope.row.houseNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column width="120px" label="关联账户数量">
              <template slot-scope="scope">
                <!--        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>-->
                <span>{{ scope.row.accountNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="300px" label="所属集团">
              <template slot-scope="{row}">
                <span>{{ row.corporationName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="操作项" align="center">
              <template slot-scope="scope">
                <el-popover
                  ref="action-popover"
                  :open-delay="100"
                  placement="bottom"
                  trigger="hover"
                  :disabled="popperDisabled"
                  @after-leave="handleAfterLeave"
                >
                  <div align="center">
                    <el-button-group align="center">
                      <!--              <el-button type="info">修改</el-button>-->
                      <el-button
                        type="primary"
                        size="small"
                        icon="el-icon-edit"
                        @click="toNextLevel('farm',scope.row)">
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
        </div>
      </el-tab-pane>

      <el-tab-pane key="house" label="养殖舍" name="house">
        <div>
          <div>顶栏</div>
          <el-table :data="houseList" border fit highlight-current-row style="width: 100%">
            <el-table-column
              v-loading="loading"
              align="center"
              label="ID"
              width="65"
              element-loading-text="请给我点时间！"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.id }}</span>
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
                <span>{{ row.name }}</span>
                <el-tag>{{ row.type }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column width="120px" label="关联账户数量">
              <template slot-scope="scope">
                <!--        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>-->
                <span>{{ scope.row.accountNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column min-width="300px" label="所属集团">
              <template slot-scope="{row}">
                <span>{{ row.corporationName }}</span>
                <el-tag>{{ row.corporationId }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column min-width="300px" label="所属养殖场">
              <template slot-scope="{row}">
                <span>{{ row.farmName }}</span>
                <el-tag>{{ row.farmId }}</el-tag>
              </template>
            </el-table-column>

            <el-table-column label="操作项" align="center">
              <template>
                <el-popover
                  ref="action-popover"
                  :open-delay="100"
                  placement="bottom"
                  trigger="hover"
                >
                  <div align="center">
                    <el-button-group align="center">
                      <!--              <el-button type="info">修改</el-button>-->
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
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import tabPane from './components/TabPane'

  export default {
    name: 'Tab',
    components: {},
    data() {
      return {
        tabMapOptions: [
          {label: '集团', key: 'corporation'},
          {label: '养殖场', key: 'farm'},
          {label: '养殖舍', key: 'house'}
        ],
        tabLevel: ['corporation', 'farm', 'house'],
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
          },
          {
            'type': '',
            'id': '',
            'name': '',
            'createTimestamp': '',
            'farmNumber': '',
            'accountNumber': ''
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
        activeName: 'corporation',
        createdTimes: 0,
        loading: false,
        popperDisabled: false
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
      }
    },
    created() {
      // init the default selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
    },
    methods: {
      showCreatedTimes() {
        this.createdTimes = this.createdTimes + 1
      },
      toNextLevel(currentLevel, data) {
        this.popperDisabled = true
        this.current[currentLevel].id = data.id
        this.current[currentLevel].name = data.name
        this.$nextTick(() => {
          console.log(this.current)
          this.activeName = this.tabLevel[(this.tabLevel.indexOf(currentLevel)) + 1]
          // this.popperDisabled = false
        })
      },
      // 设置延时 解决弹出框不消失的bug
      handleAfterLeave() {
        const that = this
        setTimeout(function () {
          that.popperDisabled = false
        }, 500)
      }
    }
  }
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
