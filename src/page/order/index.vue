<template>
  <!--订单列表-->
  <div class="order">
    <header-bar title="订单列表"></header-bar>
    <div class="order-list" v-if="orders.length">
      <div class="order-cell" 
        v-for="(item, index) in orders" 
        :key="index"
        @click="$router.push({name:'orderDetail',params:{id:1}})">
        <header>
          <img class="order-avatar" :src="item.shop.img" alt="">
          <div class="order-shop-desc">
            <span class="order-name">{{item.shop.name}}</span>
            <van-icon name="arrow" />
            <span class="order-status">订单完成</span>
          </div>
        </header>
        <div class="order-container">
          <ul class="order-food-content">
            <li class="food-content-cell"
              v-for="(food,inx) in item.foods" :key="inx">
              <span class="food-content-name">{{food.name}}</span>
              <span class="food-content-num">x {{food.count}}</span>
            </li>
            <div class="order-desc">
              总计{{item.foods.length}}个商品
              <span class="order-content-price">￥{{item.total}}</span>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <footerBar></footerBar>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import footerBar from '@/components/footer'
import headerBar from '@/components/header'

export default {
  name: 'order',
  components: {
    footerBar,
    headerBar
  },
  computed: {
    ...mapState(['orders'])
  }
}
</script>
<style lang="less">
@import '../../assets/styles/mixins.less';
.order {
  .pt(100);
}
.order-list {
  .order-cell {
    .mt(10);
    background: #fff;
    header {
      .pl(20);
      .pr(20);
      .fs(32);
      display: flex;
      align-items: center;
      .van-icon-arrow {
        color: #999;
      }
    }
  }
  .order-avatar {
    .mr(20);
    .width(80);
    .height(80);
    border-radius: 50%;
  }
  .order-name {
    box-sizing: border-box;
    font-weight: 500;
  }
  .order-status {
    position: absolute;
    .right(30);
    .fs(24);
    color: #999;
  }
  .order-container {
    .ml(120);
  }
}

.order-food-content {
  .mr(30);
  .pt(18);
  .pb(20);
  .food-content-cell {
    .lh(55);
    .fs(24);
    color: #666;
  }
  .food-content-num {
    float: right;
  }
  .order-desc {
    .lh(55);
    .fs(24);
    color: #666;
    .order-content-price {
      float: right;
      color: #f60;
    }
  }
}
.order-shop-desc {
  width: 100%;
  display: flex;
  align-items: center;
  .height(80);
  box-sizing: border-box;
  border-bottom: 0.025rem solid #e0e0e0;
}
</style>
