<template>
  <!--订单列表-->
  <div class="order">
    <header-bar title="订单列表"></header-bar>
    <div class="order-list">
      <div class="order-cell" 
        v-for="(item, index) in orders" 
        :key="index"
        @click="$router.push({name:'orderDetail',params:{id:item.id}})">
        <header>
          <img class="order-avatar" :src="item.shop.img" alt="">
          <div class="order-shop-desc">
            <span class="order-name">{{item.shop.name}}</span>
            <van-icon name="arrow" />
            <span class="order-status">{{item.status}}</span>
          </div>
        </header>
        <div class="order-container">
          <ul class="order-food-content">
            <li class="food-content-cell"
              v-for="(food,inx) in item.goods" :key="inx">
              <span class="food-content-name">{{food.name}}</span>
              <span class="food-content-num">x {{food.num}}</span>
            </li>
            <div class="order-desc">
              总计{{item.total}}个商品
              <span class="order-content-price">￥{{item.totalPrice}}</span>
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
import { queryOrderLists } from '@/api'
import { session } from '@/utils/storage'

export default {
  name: 'order',
  components: {
    footerBar,
    headerBar
  },
  data() {
    return {
      orders: {}
    }
  },
  methods: {
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
          //session.set('orderList', this.orders)
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
