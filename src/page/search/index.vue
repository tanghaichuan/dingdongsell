<template>
  <div class="search">
    <header-bar right-text="搜索" :on-click-right="onSearch">
      <div class="search-wrap">
        <van-search autofocus class="search-input" placeholder="请输入商品名称" v-model="searchVal" />
      </div>
    </header-bar>
    <div v-if="showWrap" class="food-wrap">
      <filter-bar v-model="active"  :nav-list="navList"></filter-bar>
      <shop-list></shop-list>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/header'
import filterBar from '@/components/filterBar'
import shopList from '@/components/shopList'

export default {
  name: 'search',
  components: {
    headerBar,
    filterBar,
    shopList
  },
  data() {
    return {
      active: '销量最高',
      navList: ['销量最高', '距离最近', '评分最高'],
      searchVal: '',
      showWrap: false
    }
  },
  methods: {
    onSearch() {
      if (this.searchVal) {
        this.showWrap = true
      }
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/mixins.less';
.search {
  .pt(100);
  .van-nav-bar__title {
    width: 70%;
    line-height: 1.5;
    display: flex;
    align-items: center;
    margin: 0 auto;
  }
}
</style>
