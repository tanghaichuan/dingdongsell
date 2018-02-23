<template>
  <div class="shoplist_container">
    <ul>
      shoplist
    </ul>
  </div>
</template>
<script>
import star from './ratingStar'

export default {
  name: 'shopList',
  components: {
    star
  },
  data() {
    return {
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
      shopLists: [], // 店铺列表
      preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
      showBackStatus: false, //显示返回顶部按钮
      showLoading: true, //显示加载动画
      touchend: false //没有更多数据
    }
  }
}
</script>
<style>

</style>
