<template>
    <div>
      <!--当前详细温度-->
      <!--                full-card 卡片充满整个区域-->
      <div style="padding: 20px" class="full-card">
        <el-card class="box-card full-card">
          <div slot="header" class="clearfix">
            <span>当前温度</span>
          </div>
          <div v-for="item in itemTemperatureDetail" :key="item.key" class="text item multi-col">
            <i class="el-icon-caret-right"/>
            {{ item.description+': '+33 }}
          </div>
        </el-card>
      </div>

      <!--                    主要参数-->
      <div class="full-card">
        <el-card class="box-card full-card">
          <div slot="header" class="clearfix">
            <span style="font-size: 24px">主要参数</span>
          </div>
          <div v-for="item in itemMainInfo" :key="item.key" class="text item" style="font-size: 18px">
            <i class="el-icon-caret-right" style="color: orange"/>
            {{ item.description+': '+33 }}
          </div>
        </el-card>
      </div>

      <!--                    水料量记录-->
      <div style="padding: 20px" class="full-card">
        <el-card class="box-card full-card">
          <div slot="header" class="clearfix">
            <span>水料量记录</span>
            <!--                          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
          </div>
          <div v-for="item in itemWaterFeed" :key="item.key" class="text item">
            <i class="el-icon-caret-right"/>
            {{ item.description+': '+33 }}
          </div>
        </el-card>
      </div>

      <!--                    其他状态-->
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>其他状态</span>
        </div>
        <div
          style="
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                justify-content: flex-start;
                align-items: baseline;
                "
        >
                <span
                  v-for="item in itemOther"
                  :key="item.key"
                  class="text item"
                  style="display: inline-flex;flex-direction: column;justify-content: center;align-items: center;margin: 10px"
                >
                  <el-tag :type="randomBool()?'success':'danger'">{{ randomBool()?'开':'关' }}</el-tag>
                  <span class="icon-name" style="margin-top: 5px">{{ item.description }}</span>
                </span>
        </div>
      </el-card>

      <!--          风机状态-->
      <div style="height: calc(100% - 57px)">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>风机状态</span>
          </div>
          <div
            style="
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: baseline;
                "
          >
            <span
              v-for="item in 25"
              :key="item"
              class="text item"
              style="
                  display: inline-flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  margin:0.3rem;
                  width: 4rem;
                "
            >
              <el-tag :type="randomBool()?'success':'danger'">{{ randomBool()?'开':'关' }}</el-tag>
              <span class="icon-name" style="margin-top: 5px">{{ '风机组'+item }}</span>
            </span>
          </div>
        </el-card>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'V'
  }
</script>

<style scoped>

</style>
