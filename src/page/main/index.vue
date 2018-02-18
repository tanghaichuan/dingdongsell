<template>
  <div class="wrapper">
    <router-view></router-view>
    <footerBar></footerBar>
  </div>
</template>
<script>
import footerBar from '@/components/footer'
export default {
  name: 'home',
  components: {
    footerBar
  }
}
</script>
<style lang="less">

</style>
