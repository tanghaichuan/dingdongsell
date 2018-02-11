<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive> 
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@import './assets/styles/reset.less';
@import './assets/styles/config.less';

body{
	height: 100%;
	width: 10rem;
	margin: 0 auto;
	position: relative;
  z-index: -1;
  overflow: hidden;
  #app{
    height: 100%;
  }
}
</style>
