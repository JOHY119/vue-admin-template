<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card" @tab-click="tabClick">
      <el-tab-pane key="corporation" label="集团" name="corporation">
        <corporation-tab ref="corporationTab" @to-farm="activeName='farm'"/>
      </el-tab-pane>

      <el-tab-pane key="farm" ref="farmTab" label="养殖场" name="farm">
        <farm-tab @to-house="toHouse"/>
      </el-tab-pane>

      <!--      <el-tab-pane key="house" label="养殖舍" name="house">-->
      <!--        <div class="header">-->
      <!--          <div class="search">-->
      <!--            <span>搜索：</span>-->
      <!--            <el-input-->
      <!--              v-model="houseSearch"-->
      <!--              style="width: auto"-->
      <!--              clearable-->
      <!--              placeholder="请输入搜索内容"-->
      <!--            >-->
      <!--              <i slot="prefix" class="el-input__icon el-icon-search"/>-->
      <!--            </el-input>-->
      <!--          </div>-->
      <!--          <div class="block">-->
      <!--            <span class="demonstration">筛选：</span>-->
      <!--            <el-cascader-->
      <!--              id="super-el"-->
      <!--              v-model="farmValue"-->
      <!--              :options="farmListComputed"-->
      <!--              :props="{ expandTrigger: 'hover',label:'name',value:'id',key:'id',checkStrictly:true}"-->
      <!--              clearable-->
      <!--              @expand="handleTest"-->
      <!--            />-->
      <!--          </div>-->
      <!--        </div>-->
      <!--        <el-table-->
      <!--          :data="houseTableDataComputed"-->
      <!--          border-->
      <!--          fit-->
      <!--          stripe-->
      <!--          style="width: 100%"-->
      <!--        >-->
      <!--          <el-table-column-->
      <!--            v-loading="listLoading"-->
      <!--            align="center"-->
      <!--            label="ID"-->
      <!--            width="65"-->
      <!--            element-loading-text="请给我点时间！"-->
      <!--          >-->
      <!--            <template slot-scope="scope">-->
      <!--              <span>{{ scope.row.id.substring(0,5) }}</span>-->
      <!--            </template>-->
      <!--          </el-table-column>-->

      <!--          <el-table-column width="180px" align="center" label="创建时间">-->
      <!--            <template slot-scope="scope">-->
      <!--              &lt;!&ndash;使用parseTime格式化时间戳&ndash;&gt;-->
      <!--              <span>{{ scope.row.createDateTime }}</span>-->
      <!--            </template>-->
      <!--          </el-table-column>-->

      <!--          <el-table-column min-width="300px" label="名称">-->
      <!--            <template slot-scope="{row}">-->
      <!--              <span>{{ row.name }}</span>-->
      <!--              <el-tag>{{ row.type }}</el-tag>-->
      <!--            </template>-->
      <!--          </el-table-column>-->

      <!--          &lt;!&ndash;          <el-table-column width="120px" label="关联账户数量">&ndash;&gt;-->
      <!--          &lt;!&ndash;            <template slot-scope="scope">&ndash;&gt;-->
      <!--          &lt;!&ndash;              &lt;!&ndash;        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>&ndash;&gt;&ndash;&gt;-->
      <!--          &lt;!&ndash;              <span>{{ scope.row.accountNumber }}</span>&ndash;&gt;-->
      <!--          &lt;!&ndash;            </template>&ndash;&gt;-->
      <!--          &lt;!&ndash;          </el-table-column>&ndash;&gt;-->

      <!--          <el-table-column min-width="300px" label="所属养殖场">-->
      <!--            <template slot-scope="{row}">-->
      <!--              <span>{{ findFarm(row) }}</span>-->
      <!--              &lt;!&ndash;              <el-tag>{{ row.farmId }}</el-tag>&ndash;&gt;-->
      <!--            </template>-->
      <!--          </el-table-column>-->

      <!--          <el-table-column label="操作项" align="center">-->
      <!--            <template>-->
      <!--              <el-button-group align="center">-->
      <!--                &lt;!&ndash;              <el-button type="info">修改</el-button>&ndash;&gt;-->
      <!--                <el-button type="success" size="small" icon="el-icon-edit">-->
      <!--                  <span>修改</span>-->
      <!--                </el-button>-->
      <!--                &lt;!&ndash;              <el-button type="danger">删除</el-button>&ndash;&gt;-->
      <!--              </el-button-group>-->
      <!--            </template>-->

      <!--          </el-table-column>-->
      <!--        </el-table>-->

      <!--        <pagination-->
      <!--          v-show="total>0"-->
      <!--          :total="total"-->
      <!--          :page.sync="listQuery.page"-->
      <!--          :limit.sync="listQuery.limit"-->
      <!--        />-->
      <!--        &lt;!&ndash;        每次点击都会触发此函数 从网络获得数据  此处只需要动态更改listQuery即可 不需要触发函数&ndash;&gt;-->
      <!--        &lt;!&ndash;          @pagination="fetchHouseList"&ndash;&gt;-->

      <!--      </el-tab-pane>-->
    </el-tabs>
  </div>
</template>

<script>
  import elTableInfiniteScroll from 'el-table-infinite-scroll'
  import CorporationTab from './components/CorporationTab'
  import FarmTab from './components/FarmTab'

  export default {
    name: 'Entity',
    components: {CorporationTab, FarmTab},
    directives: {
      'el-table-infinite-scroll': elTableInfiniteScroll
    },
    data() {
      return {
        activeName: 'corporation'
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
      },
      tabClick(event) {
        this.$store.dispatch('app/cleanManagementSelected')
        this.$refs.corporationTab.searchKeyword = ''
        this.$refs.farmTab.searchKeyword = ''
      },
      load() {
        console.log('load')
      },
      toHouse() {
        // todo: 跳转至实时数据页
        // todo: global selected改为management的两个值
        console.log(this.$store.getters.management_corporation_id)
        console.log(this.$store.getters.management_farm_id)
        this.$store.dispatch(
          'app/changeGlobalSelected',
          {
            corporationId: this.$store.getters.management_corporation_id,
            farmId: this.$store.getters.management_farm_id
          })
        this.$router.push(`/table/index`)
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
