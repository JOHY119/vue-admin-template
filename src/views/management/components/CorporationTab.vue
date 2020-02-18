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
          key="id"
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

        <el-table-column key="createTimestamp" width="180px" align="center" label="创建时间">
          <template slot-scope="scope">
            <!--使用parseTime格式化时间戳-->
            <span>{{ scope.row.createDateTime }}</span>
          </template>
        </el-table-column>

        <el-table-column min-width="100px" label="名称">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
            <el-tag>{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>

        <!--          <el-table-column width="110px" align="center" label="下属厂数量">-->
        <!--            <template slot-scope="scope">-->
        <!--              <span>{{ scope.row.farmNumber }}</span>-->
        <!--            </template>-->
        <!--          </el-table-column>-->

        <!--          <el-table-column width="120px" label="关联账户数量">-->
        <!--            <template slot-scope="scope">-->
        <!--              &lt;!&ndash;        <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star"/>&ndash;&gt;-->
        <!--              <span>{{ scope.row.accountNumber }}</span>-->
        <!--            </template>-->
        <!--          </el-table-column>-->

        <el-table-column label="操作项" align="center">
          <template slot-scope="scope">
            <div>
              <el-button-group>
                <!--              <el-button type="info">修改</el-button>-->
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-right"
                  @click="toFarm(scope.row)"
                >
                  <span>下属养殖场</span>
                </el-button>
                <el-button type="success" size="mini" icon="el-icon-edit">
                  <span>修改</span>
                </el-button>
                <!--              <el-button type="danger">删除</el-button>-->
              </el-button-group>

            </div>

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
    name: 'CorporationTab',
    components: {Pagination},
    data() {
      return {
        total: 0,
        listQuery: {
          page: 1,
          limit: 20
        },
        // corporationList: [],
        loading: false,
        searchKeyword: ''
      }
    },
    computed: {
      ...mapGetters([
        'management_corporation_id'
      ]),
      ...mapGetters({
        'corporationList': 'corporation_list'
      }),
      corporationId: {
        get: function () {
          return this.management_corporation_id
        },
        set: function (val) {
          this.$store.dispatch('app/changeManagementSelectedCorporationId', {corporationId: val})
        }
      },
      tableData: function () {
        const keywords = this.searchKeyword
        // todo bug 不搜索id
        const searchResult = this.corporationList.filter((item) => {
          // console.log(result)
          const copy = JSON.parse(JSON.stringify(item))
          delete copy.farmNumber
          delete copy.id
          return Object.values(copy).some(value => {
            // console.log(value)
            // console.log(String(value).toLowerCase().indexOf(keywords) > -1)
            return (String(value).toLowerCase().indexOf(keywords) > -1)
          })
        })
        const limit = this.listQuery.limit
        const page = this.listQuery.page
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.total = searchResult.length
        return searchResult.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      }
    },
    methods: {
      toFarm(data) {
        this.corporationId = data.id
        this.$emit('to-farm')
      }
    }
  }
</script>

<style scoped>
  header {
    display: flex;
    margin-bottom: 20px;
  }

</style>
