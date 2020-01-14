<template>
  <div class="room-select">
    舍号：
    <el-cascader v-model="values" :options="roomList" @change="handleSelectRoom">
      <template slot-scope="{ node, data }">
        <span>{{ data.label }}</span>
        <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
      </template>
    </el-cascader>
  </div>
</template>

<script>
  // import CountTo from 'vue-count-to'

  export default {
    components: {
      // CountTo
    },
    data() {
      return {
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
        values: ['1001', '100108']
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
      handleSelectRoom(idList) {
        // return [厂id, 舍id]
        this.$emit('handleSelectRoom', idList)
      }
    }
  }
</script>

<style lang="scss" scoped>

  .room-select {
    background-color: #394056;
    color: white;
    padding: 10px;
  }
</style>
