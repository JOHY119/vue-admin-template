<template>
  <weather
    api-key="2ecf9c15719159d8bb1872bf3968ce23"
    title="Weather"
    latitude="36.316270"
    longitude="120.436"
    language="zh"
    :hide-header="true"
    :update-interval="86400"
    units="si">
  </weather>
</template>
<style>

</style>
<script>
  import VueWeatherWidget from 'vue-weather-widget'
  import 'vue-weather-widget/dist/css/vue-weather-widget.css'

  export default {
    name: 'Weather',
    components: {
      'weather': VueWeatherWidget
    }

  }
</script>
