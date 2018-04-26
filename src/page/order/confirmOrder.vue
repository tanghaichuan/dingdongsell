<template>
  <!--确认订单-->
  <div class="confirm-order">
    <header-bar title="确认订单"></header-bar>
    <div @click="showList=true">
      <van-cell class="order-details" v-if="!getSelectAddress" title="添加收获地址" is-link>
        <img class="address-img" src="../../assets/images/dizhi.png" slot="icon" alt="我的地址">
      </van-cell>
      <van-cell class="order-details" v-else is-link>
        <img class="address-img" src="../../assets/images/dizhi.png" slot="icon" alt="我的地址">
        <div class="address-info">
          <span>{{getSelectAddress.name}}</span>
          <span>{{getSelectAddress.tel}}</span>
        </div>
        <p class="address-details">{{getSelectAddress.address}}</p>
      </van-cell>
    </div>
    <!--地址列表-->
    <van-popup v-model="showList" position="bottom">
      <van-address-list
        class="address"
        v-model="chosenAddressId"
        :list="addressLists"
        @add="handleAddressAdd"
        @edit="handleAddressEdit"
        @select="handleAddressSelect"
      />
    </van-popup>
    <div class="delivery-model">
      <van-cell class="delivery-container" title="送达时间">
        <span class="delivery-text">{{getOrder.deliverTime}}分钟</span>
      </van-cell>
      <van-cell class="delivery-container" title="支付方式" is-link>
        <span>在线支付</span>
      </van-cell>
    </div>
    <div class="food-list">
      <van-cell class="order-container">
        <img :src="getOrder.shop.img" alt="">
        <span>{{getOrder.name}}</span>
      </van-cell>
      <van-cell 
        v-for="(item, index) in getOrder.foods" 
        :key="index" 
        :title="item.goodsName">
        <div class="num-price">
          <span class="food-num">x {{item.count}}</span>
          <span class="food-price">￥{{item.count*item.goodsPrice}}</span>
        </div>
      </van-cell>
      <van-cell title="配送费">
        <span class="food-deliver-fee">￥{{getOrder.deliverFee}}</span>
      </van-cell>
    </div>
    <section class="confrim_order">
        <p>待支付 ¥{{total}}</p>
        <p @click="confrimOrder">确认下单</p>
    </section>
  </div>
</template>
<script>
import moment from 'moment'
import { isEmpty } from 'lodash'
import { mapMutations, mapState } from 'vuex'
import headerBar from '@/components/header'
import { session, local } from '@/utils/storage'
import { payOrder, queryAddress } from '@/api'

export default {
  name: 'confirmOrder',
  components: {
    headerBar
  },
  data() {
    return {
      showList: false,
      chosenAddressId: '',
      chosenAddress: {},
      addressLists: []
    }
  },
  computed: {
    getSelectAddress() {
      if (!isEmpty(this.chosenAddress)) {
        return this.chosenAddress
      }
      return false
    },
    getOrder() {
      return local.get('order')
    },
    total() {
      return this.getOrder.sum + this.getOrder.deliverFee
    }
  },
  methods: {
    ...mapMutations(['ADD_ORDER']),
    handleAddressAdd() {
      this.$router.push({ name: 'addAddress' })
    },
    handleAddressEdit(item) {
      this.$router.push({ name: 'editAddress', params: { addressId: item.id } })
    },
    handleAddressSelect(item) {
      this.chosenAddress = item
      this.showList = false
    },
    async queryAddressLists() {
      let res = await queryAddress({ userId: session.get('user').id })
      if (res.errorCode === 0) {
        res.data.forEach(item => {
          const { addressDetail, addressId, addressLabel, addressName } = item
          this.addressLists.push({
            id: addressId,
            name: addressName,
            tel: addressLabel,
            address: addressDetail
          })
        })
      }
    },
    async confrimOrder() {
      if (!this.getSelectAddress) {
        this.$toast({
          type: 'fail',
          message: '请填写收获地址'
        })
        return false
      }
      let foods = this.getOrder.foods
      let arr = []
      foods.forEach(item => {
        arr.push({
          goodsId: item.id,
          goodsNum: item.count
        })
      })
      const params = {
        userId: session.get('user').id,
        businessId: session.get('currentShop').id,
        orderStatus: 1, // 0支付,1支付,2已接单，3已完成，4已取消
        addressId: this.getSelectAddress.id,
        orderRecord: arr
      }
      console.log(params)
      // const params = {
      //   shop: this.getOrder.shop,
      //   user: {
      //     name: this.getSelectAddress.name,
      //     id: this.getSelectAddress.id,
      //     tel: this.getSelectAddress.tel,
      //     address: this.getSelectAddress.address
      //   },
      //   foods: this.getOrder.foods,
      //   deliverTime: this.getOrder.deliverTime,
      //   total: this.total,
      //   payType: '在线支付',
      //   deliverType: '蜂鸟专送',
      //   orderTime: moment().format('YYYY-MM-DD hh:mm')
      // }
      // console.log(params)
      let res = await payOrder(params)
      if (res.errorCode === 0) {
        this.$toast({
          type: 'success',
          message: '下单成功'
        })
        this.ADD_ORDER(params)
        this.$router.push({ name: 'Order' })
      }
    }
  },
  created() {
    this.queryAddressLists()
  }
}
</script>

<style lang="less">
@import '../../assets/styles/mixins.less';
.confirm-order {
  .pt(90);
}
.address-img {
  .mr(10);
}
.confrim_order {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.173333rem;
  p {
    line-height: 1.173333rem;
    .fs(32);
    color: #fff;
  }
  p:nth-of-type(1) {
    background-color: #3c3c3c;
    flex: 5;
    padding-left: 0.7rem;
  }
  p:nth-of-type(2) {
    flex: 2;
    background-color: #56d176;
    text-align: center;
  }
}
.order-details {
  .mb(20);
  border-bottom: 1px dotted #000;
}
.delivery-container {
  display: flex;
  align-items: center;
  span {
    .pr(20);
  }
  .van-cell__title {
    flex: 1;
  }
}
.delivery-text {
  color: #3190e8;
}
.food-list {
  .mt(20);
  .van-cell__value {
    display: flex;
    align-items: center;
  }
  .van-cell__title {
    flex: 1;
  }
  .order-container {
    .van-cell__value {
      display: flex;
      align-items: center;
    }
    img {
      .width(50);
      .height(50);
      .mr(10);
    }
    span {
      .fs(35);
      color: #333;
    }
  }
  .num-price {
    .width(200);
    display: flex;
  }
  .food-num {
    text-align: left;
    flex: 1;
    .fs(32);
    color: #f60;
  }
}
.chose-address {
  .van-cell {
    height: auto;
  }
}
</style>
