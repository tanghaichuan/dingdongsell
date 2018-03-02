<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
body {
  width: 10rem;
  margin: 0 auto;
  position: relative;
  background-color: #f5f5f5;
  z-index: -99;
  #app {
    position: relative;
    z-index: -99;
    overflow: hidden;
  }
}
</style>
