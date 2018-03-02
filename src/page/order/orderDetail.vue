<template>
  <div class="order-detail">
    <header-bar title="订单详情"></header-bar>
    <div class="order-datail-cell">
      <header>订单状态</header>
      <van-steps :active="3" class="order-status-step">
        <van-step>订单提交</van-step>
        <van-step>支付成功</van-step>
        <van-step>订单送达</van-step>
        <van-step>订单完成</van-step>
      </van-steps>
    </div>
    <div class="order-datail-cell">
      <header>订单详情</header>
      <van-cell @click="$router.push({name:'shop',params:{id:1}})" class="order-head" is-link>
        <img src="https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
        <span>上品烧烤</span>
      </van-cell>
      <div class="order-container">
        <ul class="order-food-content">
          <li class="food-content-cell">
            <span class="food-content-name">皮蛋瘦肉粥</span>
            <span class="food-content-num">x 2</span>
          </li>
          <div class="order-desc">
            总计2个商品
            <span class="order-content-price">￥20</span>
          </div>
        </ul>
      </div>
    </div>
    <div class="order-datail-cell">
      <header>配送详情</header>
      <van-cell>
        <span>送达时间：</span>
        <p>立即配送</p>
      </van-cell>
      <van-cell class="deliver-address">
        <span>配送地址：</span>
        <div class="item-righe">
          <p>张三</p>
          <p>12313213</p>
          <p>阿三哥发达</p>
        </div>
      </van-cell>
      <van-cell>
        <span>配送方式：</span>
        <p>蜂鸟专送</p>
      </van-cell>
    </div>
    <div class="order-datail-cell">
      <header>订单信息</header>
      <van-cell>
        <span>订单编号：</span>
        <p>1112314123</p>
      </van-cell>
      <van-cell>
        <span>订单时间：</span>
        <p>2018-02-02 12:09:12</p>
      </van-cell>
      <van-cell>
        <span>支付方式：</span>
        <p>在线支付</p>
      </van-cell>
    </div>
  </div>
</template>
<script>
import headerBar from '@/components/header'
export default {
  name: 'orderDetail',
  components: {
    headerBar
  }
}
</script>

<style lang="less">
@import '../../assets/styles/mixins.less';
.order-detail {
  .pt(100);
  .order-datail-cell {
    .mt(10);
    img {
      width: 0.66666667rem;
      height: 0.66666667rem;
      margin-right: 0.13333333rem;
      border-radius: 50%;
    }
    header {
      background: #fff;
      .height(70);
      .lh(70);
      .fs(24);
      .pl(30);
      color: #666;
      border-bottom: 1px solid #f5f5f5;
    }
    &:not(:last-child) {
      .mb(20);
    }
    span {
      color: #999;
    }
  }
  .van-cell__value {
    display: flex;
    align-items: center;
  }
  .van-cell__title {
    flex: 1;
  }
  .order-container {
    background: #fff;
    padding-left: 1.2rem;
  }
}
.order-food-content {
  margin-right: 0.4rem;
  padding-top: 0.24rem;
  padding-bottom: 0.26666667rem;
  .food-content-cell {
    line-height: 0.73333333rem;
    .fs(24);
    color: #666;
  }
  .food-content-num {
    float: right;
  }
  .order-desc {
    line-height: 0.73333333rem;
    .fs(24);
    color: #666;
    .order-content-price {
      float: right;
      color: #f60;
    }
  }
}
.deliver-address {
  .van-cell__value {
    align-items: baseline;
  }
}
.order-status-step {
  .pt(20);
  .height(120);
}
</style>
