<template>
  <div class="order-detail">
    <header-bar title="订单详情"></header-bar>
    <div class="order-datail-cell">
      <header>订单状态</header>
      <van-steps :active="order.statusId" class="order-status-step">
        <van-step>待付款</van-step>
        <van-step>已付款</van-step>
        <van-step>已接单</van-step>
        <van-step>已完成</van-step>
      </van-steps>
      <van-button v-if="order.statusId===0" size="small" @click.native="payOrder">去付款</van-button>
      <van-button v-else size="small" @click.native="confirm">确认收货</van-button>
    </div>
    <div class="order-datail-cell">
      <header>订单详情</header>
      <van-cell @click="$router.push({name:'shop',params:{id:order.shop.id}})" class="order-head" is-link>
        <img :src="order.shop.img" alt="">
        <span>{{order.shop.name}}</span>
      </van-cell>
      <div class="order-container">
        <ul class="order-food-content">
          <li class="food-content-cell" v-for="(item, index) in order.goods" :key=index>
            <span class="food-content-name">{{item.name}}</span>
            <span class="food-content-num">x {{item.num}}</span>
          </li>
          <div class="order-desc">
            总计{{order.total}}个商品
            <span class="order-content-price">￥{{order.totalPrice}}</span>
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
          <p>{{order.address.name}}</p>
          <p>{{order.address.phone}}</p>
          <p>{{order.address.detail}}</p>
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
        <p>{{order.id}}</p>
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
import { session } from '@/utils/storage'
import { payOrder, queryOrderLists } from '@/api'

export default {
  name: 'orderDetail',
  components: {
    headerBar
  },
  data() {
    return {
      order: {
        shop: {
          img: '',
          name: ''
        },
        address: {
          phone: '',
          name: '',
          detail: ''
        }
      },
      orders: {}
    }
  },
  methods: {
    payOrder() {
      this.$router.push({
        name: 'PayOrder',
        params: { id: this.$route.params.id }
      })
    },
    async confirm() {
      const param = {
        userId: session.get('user').id,
        orderId: this.$route.params.id,
        orderStatus: 3
      }
      let res = await payOrder(param)
    },
    getStatus(status) {
      switch (status) {
        case 0:
          return `待付款`
          break
        case 1:
          return `已付款`
          break
        case 2:
          return `已完成`
          break
        case 3:
          return `已取消`
          break
        default:
          return `已完成`
          break
      }
    },
    async getOrderList() {
      if (session.get('user')) {
        const params = {
          userId: session.get('user').id
        }
        let res = await queryOrderLists(params)
        if (res.errorCode === 0) {
          let order = {}
          res.data.forEach(item => {
            // 合并同类订单
            if (order.hasOwnProperty(item.orderId)) {
              order[item.orderId].total += item.goodsNum
              order[item.orderId].totalPrice +=
                item.goodsNum * item.goodsDetail.goodsPrice
              let good = order[item.orderId].goods
              Object.keys(good).forEach(food => {
                // 合并同类商品
                if (!good.hasOwnProperty(item.goodsId)) {
                  good[item.goodsId] = {
                    name: item.goodsDetail.goodsName,
                    price: item.goodsDetail.goodsPrice,
                    num: item.goodsNum
                  }
                }
              })
            } else {
              order[item.orderId] = {
                total: item.goodsNum,
                totalPrice: item.goodsNum * item.goodsDetail.goodsPrice,
                status: this.getStatus(item.orderStatus),
                statusId: item.orderStatus,
                id: item.orderId,
                address: {
                  id: item.addressId,
                  name: item.addressInfo.addressName,
                  phone: item.addressInfo.addressLabel,
                  detail: item.addressInfo.addressDetail
                },
                shop: {
                  id: item.businessId,
                  name: item.businessDetail.businessName,
                  img: item.businessDetail.businessPic
                },
                goods: {
                  [item.goodsId]: {
                    name: item.goodsDetail.goodsName,
                    price: item.goodsDetail.goodsPrice,
                    num: item.goodsNum
                  }
                }
              }
            }
          })
          this.orders = order
          let id = this.$route.params.id
          this.order = this.orders[id]
        }
      }
    }
  },
  created() {
    this.getOrderList()
  }
}
</script>

<style lang="less">
@import '../../assets/styles/mixins.less';
.order-detail {
  .pt(100);
  .order-datail-cell {
    background: #fff;
    .mt(10);
    .pb(10);
    .van-button--small {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      .height(68);
      .pl(10);
      .pr(10);
      background: #fff;
      border-color: #ccc;
      .van-button__text {
        color: #333;
      }
    }
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
