<template>
<div class="shop">
  <shop-header></shop-header>
  <div class="tab">
    <div class="tab-item" @click="changeShowType='food'">
      <span :class="{activity_show:changeShowType==='food'}">商品</span>
    </div>
    <div class="tab-item" @click="changeShowType='rating'">
      <span :class="{activity_show:changeShowType==='rating'}">评论</span>
    </div>
  </div>
  <menu-view v-show="changeShowType==='food'"></menu-view>
  <shop-rating v-show="changeShowType==='rating'"></shop-rating>
</div>
</template>
<script>
import shopHeader from './shopHeader'
import menuView from './menuView'
import shopRating from './shopRating'

export default {
  name: 'shop',
  components: {
    shopHeader,
    menuView,
    shopRating
  },
  data() {
    return {
      changeShowType: 'food'
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/mixins.less';
.shop {
  height: 100%;
  overflow-y: auto;
  .tab {
    display: flex;
    width: 100%;
    .height(80);
    .lh(80);
    .tab-item {
      flex: 1;
      text-align: center;
      font-size: 0.373333rem;
      color: #666;
      .activity_show {
        color: #3190e8;
        position: relative;
        &:after {
          content: '';
          position: absolute;
          bottom: -0.16rem;
          left: -0.066667rem;
          right: -0.066667rem;
          height: 0.053333rem;
          background-color: #3190e8;
          border-radius: 0.04rem;
        }
      }
    }
  }
}
</style>
