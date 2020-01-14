<template>
  <div class="room-select">
    舍号：
    <el-select v-model="value" placeholder="请选择" @change="handleSelectRoom">
      <el-option-group
        v-for="group in roomList"
        :key="group.factoryId"
        :label="group.factoryName"
      >
        <el-option
          v-for="item in group.roomGroup"
          :key="item.id"
          :label="item.id"
          :value="item.uuid"
        />
      </el-option-group>
    </el-select>
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
          factoryName: '青岛六合',
          factoryId: '1001',
          roomGroup: [
            { 'id': 1, 'uuid': 100101 },
            { 'id': 2, 'uuid': 100102 },
            { 'id': 3, 'uuid': 100103 },
            { 'id': 4, 'uuid': 100104 },
            { 'id': 5, 'uuid': 100105 },
            { 'id': 6, 'uuid': 100106 },
            { 'id': 7, 'uuid': 100107 },
            { 'id': 8, 'uuid': 100108 },
            { 'id': 9, 'uuid': 100109 },
            { 'id': 10, 'uuid': 100110 }
          ]
        }],
        value: '1'
      }
    },
    methods: {
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      },
      handleSelectRoom(uuid) {
        this.$emit('handleSelectRoom', uuid)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .room-select {
    margin: -5px 0 20px 0;
  }
</style>
