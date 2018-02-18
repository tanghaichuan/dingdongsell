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
  z-index: -1;
  overflow: hidden;
  #app {
    height: 100%;
  }
}
</style>
