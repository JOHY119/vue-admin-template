<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane key="corporation" label="集团" name="corporation">
        <div class="header">
          <div class="search">
            <span>搜索：</span>
            <el-input
              style="width: auto"
              v-model="corporationSearch"
              clearable
              placeholder="请输入搜索内容">
              <i slot="prefix" class="el-input__icon el-icon-search"/>
            </el-input>
          </div>
        </div>
        <el-table
          :data="corporationList | searchFilter(corporationSearch)"
          border
          fit
          highlight-current-row
          style="width: 100%">
          <el-table-column
            key="id"
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
                    @click="toNextLevel('corporation',scope.row)"
                  >
                    <span>下属养殖场</span>
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

      <el-tab-pane key="farm" label="养殖场" name="farm">
        <div class="header">
          <div class="search">
            <span>搜索：</span>
            <el-input
              style="width: auto"
              v-model="farmSearch"
              clearable
              placeholder="请输入搜索内容">
              <i slot="prefix" class="el-input__icon el-icon-search"/>
            </el-input>
          </div>
          <div>
            <span class="demonstration">筛选：</span>
            <el-cascader
              v-model="corporationValue"
              :options="corporationList"
              :props="{ expandTrigger: 'click',label:'name',value:'id',key:'id' }"
              clearable
              @change="handleChange"
            />
          </div>
        </div>
        <el-table
          :data="farmList.filter(data => !corporationValue[0]||data.corporationId===corporationValue[0]) | searchFilter(farmSearch)"
          border
          fit
          highlight-current-row
          style="width: 100%"
        >
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

          <el-table-column width="100px" label="关联账户数量">
            <template slot-scope="scope">
              <!--        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>-->
              <span>{{ scope.row.accountNumber }}</span>
            </template>
          </el-table-column>

          <el-table-column label="所属集团">
            <template slot-scope="{row}">
              <span>{{ row.corporationName }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作项" align="center">
            <template slot-scope="scope">
              <el-button-group>
                <el-button
                  type="primary"
                  size="small"
                  icon="el-icon-edit"
                  @click="toNextLevel('farm',scope.row)"
                >
                  <span>下属养殖舍</span>
                </el-button>
                <el-button type="success" size="small" icon="el-icon-edit">
                  <span>修改</span>
                </el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane key="house" label="养殖舍" name="house">
        <div class="header">
          <div class="search">
            <span>搜索：</span>
            <el-input
              style="width: auto"
              v-model="houseSearch"
              clearable
              placeholder="请输入搜索内容">
              <i slot="prefix" class="el-input__icon el-icon-search"/>
            </el-input>
          </div>
          <div class="block">
            <span class="demonstration">筛选：</span>
            <el-cascader
              v-model="farmValue"
              :options="farmListComputed"
              :props="{ expandTrigger: 'hover',label:'name',value:'id',key:'id',checkStrictly:true}"
              clearable
              @change="handleChange"
              id="super-el"
            />
          </div>
        </div>
        <el-table
          :data="houseList.filter(data =>(!farmValue[1] && !farmValue[0])||(data.farmId===farmValue[1])||((!farmValue[1])&&(data.corporationId===farmValue[0]))) | searchFilter(houseSearch)"
          border
          fit
          highlight-current-row
          style="width: 100%">
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // import tabPane from './components/TabPane'

  export default {
    name: 'Tab',
    components: {},
    filters: {
      searchFilter(data, keywords) {
        return data.filter((item) => {
          const result = Object.values(item).some(value => {
            // console.log(value)
            // console.log(String(value).toLowerCase().indexOf(keywords) > -1)
            return (String(value).toLowerCase().indexOf(keywords) > -1)
          })
          console.log(result)
          return result
        })
      }
    },
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
        current: [0, 0, 0],
        currentIdList: [],
        activeName: 'corporation',
        createdTimes: 0,
        loading: false,
        popperDisabled: false,
        farmSearch: '',
        corporationSearch: '',
        houseSearch: ''
      }
    },
    computed: {
      // 厂tab中级联选择框的绑定值
      corporationValue: {
        get: function () {
          const v = [this.current[0]]
          return v
        },
        set: function (value) {
          this.current[0] = value[0]
          this.current = [...this.current]
        }
      },
      // 舍tab中级联选择框的绑定值
      farmValue: {
        // get 获取值时运行的函数
        get: function () {
          const vlength = this.current.findIndex(value => value === undefined || value === 0)
          // console.log('farm value get', this.current)
          // console.log(vlength)
          const vl = this.current.slice(0, vlength)
          return vl
        },
        // set 设置值时运行的函数
        set: function (value) {
          // console.log(value)
          this.current[0] = value[0]
          this.current[1] = value[1]
          this.current = [...this.current]
          // console.log(this.current)
        }
      },
      farmListComputed: {
        get: function () {
          // console.log('开始制造farmList')
          const vCorpList = JSON.parse(JSON.stringify(this.corporationList))
          // eslint-disable-next-line no-return-assign
          vCorpList.map(value => value.children = [])
          this.farmList.map((value, index, array) => {
            const i = vCorpList.findIndex((item) => {
              return item.id === value.corporationId
            })
            if (i === -1) {
              return
            }
            vCorpList[i].children.push(value)
          })
          // console.log(vCorpList)
          return vCorpList
        }
      }
    },
    watch: {
      activeName(val) {
        this.$router.push(`${this.$route.path}?tab=${val}`)
        this.current = [0, 0, 0]
        this.corporationSearch = ''
        this.farmSearch = ''
        this.houseSearch = ''
      }
    },
    created() {
      // init the default selected tab
      const tab = this.$route.query.tab
      if (tab) {
        this.activeName = tab
      }
    },
    mounted() {
      // document.getElementById('cascader-menu-6420-0').addEventListener('click', function () {
      //   console.log(arguments)
      // })
      const v2 = this.$el.querySelector('#super-el .el-cascader-panel')
      console.log(v2)
      v2.addEventListener('click', function (event) {
        console.log(event.target.innerText)
      })
    },
    methods: {
      showCreatedTimes() {
        this.createdTimes = this.createdTimes + 1
      },
      // 去往下一级菜单
      // 只有在集团和厂两级才有此按钮
      toNextLevel(currentLevel, data) {
        // 获取当前点击此按钮的页面等级 0--集团 1--厂
        const currentClickLevelId = this.tabLevel.indexOf(currentLevel)
        // 在current中存储当前等级所点击的id
        this.current[currentClickLevelId] = data.id
        if (currentClickLevelId === 1) {
          this.current[0] = data.corporationId
        }
        // 自动跳转到下一个等级的tab 并且按照刚才点击的id进行筛选
        this.activeName = this.tabLevel[currentClickLevelId + 1]
        // 重新赋值 触发渲染
        this.current = [...this.current]
      },
      handleChange(data) {

      },
      handleTest() {
        console.log(arguments)
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

  .header {
    display: flex;
    margin-bottom: 20px;
  }
</style>
