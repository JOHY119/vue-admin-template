<template>
  <div class="components-container">
    <div class="row-container">
      <span>厂名：   </span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in roomList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="row-container">
      <span>日期：</span>
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div class="row-container">
      <router-link class="pan-btn green-btn" to="#">
        导出
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Operation',
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        roomList: [{
          label: '青岛六合',
          value: '1001',
          children: [
            { label: '1', value: '100101' },
            { label: '2', value: '100102' },
            { label: '3', value: '100103' },
            { label: '4', value: '100104' },
            { label: '5', value: '100105' },
            { label: '6', value: '100106' },
            { label: '7', value: '100107' },
            { label: '8', value: '100108' },
            { label: '9', value: '100109' },
            { label: '10', value: '100110' }
          ]
        }],
        value: '',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        value1: '',
        value2: ''
      }
    }
  }
</script>

<style scoped>
  .row-container{
    margin: 20px;
  }

</style>
