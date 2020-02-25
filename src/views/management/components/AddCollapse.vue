<template>
  <el-collapse v-model="activeName" accordion>
    <el-collapse-item title="添加集团" name="corporation">
      <el-form :model="form.corporation">
        <el-form-item label="集团名" :label-width="formLabelWidth">
          <el-input v-model="form.corporation.name" autocomplete="off" clearable/>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="clean('corporation')">清 空</el-button>
        <el-button type="primary" @click="onSubmit('corporation')">提 交</el-button>
      </div>
    </el-collapse-item>
    <el-collapse-item title="添加养殖场" name="farm">
      <el-form :model="form.farm">
        <el-form-item label="机器号" :label-width="formLabelWidth">
          <el-input v-model="form.farm.machineId" autocomplete="off" clearable/>
        </el-form-item>
        <el-form-item label="养殖场名" :label-width="formLabelWidth">
          <el-input v-model="form.farm.name" autocomplete="off" clearable/>
        </el-form-item>
        <el-form-item label="所属集团" :label-width="formLabelWidth">
          <el-cascader
            v-model="corporationIdList"
            :options="corporationList"
            :props="{ expandTrigger: 'click',label:'name',value:'id',key:'id' }"
            clearable
          />
        </el-form-item>
        <el-form-item label="纬度" :label-width="formLabelWidth">
          <el-input v-model="form.farm.latitude" autocomplete="off" clearable/>
        </el-form-item>
        <el-form-item label="经度" :label-width="formLabelWidth">
          <el-input v-model="form.farm.longitude" autocomplete="off" clearable/>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input v-model="form.farm.address" autocomplete="off" clearable/>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="clean('farm')">清 空</el-button>
        <el-button type="primary" @click="onSubmit('farm')">提 交</el-button>
      </div>
    </el-collapse-item>
    <el-collapse-item title="添加养殖舍" name="house">
      <el-form :model="form.corporation">
        <el-form-item label="所属集团" :label-width="formLabelWidth">
          <el-cascader
            v-model="corporationFarmIdList"
            :options="corporationFarmList"
            :props="{ expandTrigger: 'hover',label:'name',value:'id',key:'id' }"
            :show-all-levels="false"
            clearable
          />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="clean('house')">清 空</el-button>
        <el-button type="primary" @click="onSubmit('house')">提 交</el-button>
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'AddCollapse',
    props: {
      currentTab: {
        type: String,
        default: 'corporation'
      }
    },
    data() {
      return {
        activeName: this.currentTab,
        form: {
          // 集团form
          corporation: {
            id: '',
            name: ''
          },
          // 厂form
          farm: {
            id: '',
            name: '',
            machineId: '',
            corporationId: '',
            // 纬度
            latitude: '',
            // 经度
            longitude: '',
            address: ''
          },
          house: {
            corporationId: '',
            farmId: ''
          }
        },
        formLabelWidth: '80px',
        dialogFormVisible: false
      }
    },
    computed: {
      ...mapGetters([
        'corporationFarmList'
      ]),
      ...mapGetters({
        'corporationList': 'corporation_list'
      }),
      // farm组中单选框
      corporationIdList: {
        get: function () {
          return [this.form.farm.corporationId]
        },
        set: function (val) {
          this.form.farm.corporationId = val[0]
        }
      },
      // house中单选框
      corporationFarmIdList: {
        get: function () {
          return [this.form.house.corporationId, this.form.house.farmId]
        },
        set: function (val) {
          this.form.house.corporationId = val[0]
          this.form.house.farmId = val[1]
        }
      }
    },
    watch: {
      // 当tab切换时强制改变折叠面板的展开项
      currentTab: function (newValue) {
        this.activeName = newValue
      }
    },
    methods: {
      onSubmit(type) {
        this.$message(type)
      },
      // 清空表单
      clean(type) {
        for (const key in this.form[type]) {
          if (this.form[type].hasOwnProperty(key)) {
            this.form[type][key] = ''
          }
        }
      }
    }
  }
</script>

<style scoped>
  .dialog-footer {
    display: flex;
    justify-content: flex-end
  }

</style>
