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
  height: 100%;
  width: 10rem;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  background-color: #f5f5f5;
  z-index: -99;
  #app {
    height: 100%;
    position: relative;
    z-index: -99;
  }
}
</style>
