<template>
  <div class="food">
    <header-bar :title="$route.params.category"></header-bar>
    <filter-bar v-model="active"  :nav-list="navList"></filter-bar>
    <shop-list></shop-list>
  </div>
</template>

<script>
import headerBar from '@/components/header'
import filterBar from '@/components/filterBar'
import shopList from '@/components/shopList'
export default {
  name: 'food',
  components: {
    headerBar,
    filterBar,
    shopList
  },
  data() {
    return {
      active: '销量最高',
      navList: ['销量最高', '距离最近', '评分最高']
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/mixins.less';
.food {
  .mt(100);
}
</style>
