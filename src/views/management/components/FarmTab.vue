<template>
  <div>
    <header>
      <div class="search">
        <span>搜索：</span>
        <el-input
          v-model="searchKeyword"
          style="width: auto"
          clearable
          placeholder="请输入搜索内容"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"/>
        </el-input>
      </div>
      <div>
        <span class="demonstration">筛选：</span>
        <el-cascader
          v-model="corporationIdList"
          :options="corporationList"
          :props="{ expandTrigger: 'click',label:'name',value:'id',key:'id' }"
          clearable
        />
      </div>
      <div class="add">
        <el-button type="primary" icon="el-icon-plus" @click="$emit('add','farm')">添加</el-button>
        <!--        todo: 添加 add Corp farm dialog 应该放在上一级组件中-->
      </div>
    </header>
    <main>
      <el-table
        :data="tableData"
        border
        fit
        stripe
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
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="center" label="创建时间">
          <template slot-scope="scope">
            <!--使用parseTime格式化时间戳-->
            <span>{{ scope.row.createDateTime }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" label="名称">
          <template slot-scope="{row}">
            <span>{{ row.name }}</span>
            <el-tag>{{ row.type }}</el-tag>
          </template>
        </el-table-column>

        <!--          <el-table-column width="110px" align="center" label="下属舍数量">-->
        <!--            <template slot-scope="scope">-->
        <!--              <span>{{ scope.row.houseNumber }}</span>-->
        <!--            </template>-->
        <!--          </el-table-column>-->

        <!--          <el-table-column width="100px" label="关联账户数量">-->
        <!--            <template slot-scope="scope">-->
        <!--              &lt;!&ndash;        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>&ndash;&gt;-->
        <!--              <span>{{ scope.row.accountNumber }}</span>-->
        <!--            </template>-->
        <!--          </el-table-column>-->

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
                size="mini"
                icon="el-icon-right"
                @click="toHouse(scope.row)"
              >
                <span>下属养殖舍</span>
              </el-button>
              <el-button type="success" size="mini" icon="el-icon-edit">
                <span>修改</span>
              </el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <pagination
        v-show="total>0"
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
      />
    </footer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Pagination from '@/components/Pagination'

  export default {
    name: 'FarmTab',
    components: {Pagination},
    data() {
      return {
        total: 0,
        listQuery: {
          page: 1,
          limit: 20
        },
        loading: false,
        searchKeyword: ''
      }
    },
    computed: {
      ...mapGetters([
        'management_farm_id',
        'management_corporation_id'
      ]),
      ...mapGetters({
        'corporationList': 'corporation_list',
        'farmList': 'farm_list',
        'corporationId': 'management_corporation_id'
      }),
      // 使用的是一级级联选择器 model为数组
      corporationIdList: {
        get: function () {
          return [this.management_corporation_id]
        },
        set: function (val) {
          this.$store.dispatch('app/changeManagementSelectedCorporationId', {corporationId: val[0]})
        }
      },
      farmId: {
        get: function () {
          return this.management_farm_id
        },
        set: function (val) {
          this.$store.dispatch('app/changeManagementSelectedFarmId', {farmId: val})
        }
      },
      tableData: function () {
        // 分类
        const classifyResult = this.farmList.filter(data => (
          // 集团id 全返回
          !this.corporationIdList[0] ||
          // 集团id存在 按照集团分类
          (data.corporationId === this.corporationIdList[0])))
        // todo 添加所属集团字段
        classifyResult.map(row => {
          const corp = this.corporationList.find(corp => {
            return corp.id === row.corporationId
          })
          if (!corp) {
            // console.log(corp)
            row['corporationName'] = ''
          } else {
            row['corporationName'] = corp.name
          }
        })

        const keywords = this.searchKeyword
        // todo bug 不搜索id
        const searchResult = classifyResult.filter((item) => {
          // console.log(result)
          const copy = JSON.parse(JSON.stringify(item))
          delete copy.houseNumber
          delete copy.corporationId
          delete copy.id
          return Object.values(copy).some(value => {
            // console.log(value)
            // console.log(String(value).toLowerCase().indexOf(keywords) > -1)
            return (String(value).toLowerCase().indexOf(keywords) > -1)
          })
        })
        const limit = this.listQuery.limit
        const page = this.listQuery.page
        // todo: bug 计算属性中不应该有副作用
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.total = searchResult.length
        return searchResult.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      }

    },
    methods: {
      toHouse(data) {
        // 点击查看舍按钮时, 将当前集团厂同时存入
        this.$store.dispatch('app/changeManagementSelected', {corporationId: data.corporationId, farmId: data.id})
        this.$emit('to-house')
      }
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    margin-bottom: 20px;
  }
  header>div {
    margin-left: 15px;
  }

</style>
