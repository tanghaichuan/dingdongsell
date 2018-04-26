<template>
  <div class="shop-header" ref="shopheader">
    <img src="https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="" class="header-bg"> 
    <div class="navbar-left" @click="$router.go(-1)">
      <span class="icon-arrow_lift"></span>
    </div>
    <div class="shop-header-main">
      <img src="https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/" alt="">
      <div class="shop-header-content">
        <h2>{{shop.name}}</h2>
        <p class="header-delivery">
          <span class="delivery-item">商家配送</span>
          <span class="delivery-item">{{shop.deliverTime}}分钟送达</span>
          <span class="delivery-item">配送费￥{{shop.deliveryFee}}</span>
        </p>
        <div class="header-notice">
          <span>公告：</span>
          <span>精选上等食材，用心做品质烧烤，上品烧烤</span>
        </div>
      </div>
    </div>
    <span class="icon-keyboard_arrow_right" @click="showShopDetails"></span>
    <div class="shop-header-activities">
      <div class="activity-wrapper" @click="toggleModal">
        <span class="icon decrease"></span>
        <span class="activity-description">
          满50减25，满100减50，满200减100
        </span>
        <span class="description-count">2个活动</span>
      </div>
    </div>
  </div>
</template>
<script>
import { session } from '@/utils/storage'

export default {
  name: 'shopHeader',
  data() {
    return {
      shop: {}
    }
  },
  props: {
    // shop: {
    //   type: Object,
    //   default: () => {}
    // }
  },
  computed: {
    supportType() {
      return [
        { type: 'decrease', text: '在线支付满28减5，满50减10' },
        { type: 'discount', text: 'VC无限橙果汁全场8折' },
        { type: 'guarantee', text: '单人精彩套餐' },
        { type: 'invoice', text: '该商家支持发票，请下单写好发票抬头' },
        { type: 'special', text: '已加入“外卖保”计划，食品安全保障' }
      ]
    }
  },
  methods: {
    showShopDetails() {
      this.$router.push({
        name: 'shopDetails',
        params: { id: this.$route.params.id }
      })
    },
    toggleModal() {}
  },
  created() {
    let { id, name, imgPath, deliveryFee, orderLeadTime } = session.get(
      'currentShop'
    )
    this.shop = Object.assign({}, this.shop, {
      id,
      name,
      img: imgPath,
      text: '精选上等食材',
      deliveryFee,
      deliverTime: orderLeadTime
    })
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/mixins.less';
.shop-header {
  position: relative;
  width: 100%;
  background: rgba(7, 17, 27, 0.5);
  .header-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    //filter:blur(10px);
    z-index: -1;
  }
  .navbar-left {
    position: relative;
    padding: 0.106667rem 0.266667rem;
    .height(55);
    .lh(55);
    .icon-arrow_lift {
      .fs(32);
      color: #fff;
    }
  }
  .shop-header-main {
    display: flex;
    position: relative;
    img {
      width: 1.733333rem;
      height: 1.733333rem;
      border: 1px solid #fff;
      border-radius: 0.106667rem;
      margin: 0 0.266667rem;
      vertical-align: top;
    }
    .shop-header-content {
      flex: 1;
      display: block;
      width: 0;
      padding-right: 0.133333rem;
      h2 {
        margin: 0;
        font-size: 0.466667rem;
        line-height: 0.466667rem;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #fff;
      }
      .header-delivery {
        display: block;
        white-space: nowrap;
        height: 0.666667rem;
        font-weight: 400;
        line-height: 0.72rem;
        color: #fff;
        font-size: 0.293333rem;
        .delivery-item:not(:last-child):after {
          content: ' / ';
          opacity: 0.5;
        }
      }
      .header-notice {
        display: block;
        color: #fff;
        font-size: 0.293333rem;
        span {
          line-height: 0.533333rem;
          white-space: nowrap;
        }
      }
    }
  }
  .icon-keyboard_arrow_right {
    position: absolute;
    top: 50%;
    transform: translateY(-80%);
    right: 0.133333rem;
    font-size: 0.666667rem;
    color: #fff;
  }
  .shop-header-activities {
    padding-left: 0.266667rem;
    padding-top: 0.36666rem;
    padding-bottom: 0.26666rem;
    padding-right: 0.266667rem;
    .activity-wrapper {
      display: flex;
      align-items: center;
      .activity-description {
        flex: 1;
        display: block;
        line-height: 0.426667rem;
        font-size: 0.266667rem;
        color: #fff;
      }
      .description-count {
        position: relative;
        top: 0;
        right: 0;
        color: #fff;
        font-size: 0.293333rem;
      }
    }
  }
}
</style>
