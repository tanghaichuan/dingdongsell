<template>
<div class="shop">
  <shop-header :shop="shop"></shop-header>
  <div class="tab">
    <div class="tab-item" @click="changeShowType='food'">
      <span :class="{activity_show:changeShowType==='food'}">商品</span>
    </div>
    <div class="tab-item" @click="changeShowType='rating'">
      <span :class="{activity_show:changeShowType==='rating'}">评论</span>
    </div>
  </div>
  <menu-view :goods="goods" v-show="changeShowType==='food'"></menu-view>
  <shop-rating v-show="changeShowType==='rating'"></shop-rating>
</div>
</template>
<script>
import { mapMutations } from 'vuex'
import shopHeader from './shopHeader'
import menuView from './menuView'
import shopRating from './shopRating'
import { getGoodsList } from '@/api'

export default {
  name: 'shop',
  components: {
    shopHeader,
    menuView,
    shopRating
  },
  data() {
    return {
      changeShowType: 'food',
      goods: [],
      shop: {}
    }
  },
  methods: {
    ...mapMutations(['SET_SHOP']),
    async queryGoods() {
      try {
        const params = {
          businessId: this.$route.params.id
        }
        const shop = await getGoodsList(params)
        if (shop.errorCode === 0) {
          this.goods = shop.data
          // console.log(shop)
          // this.shop = Object.assign({}, this.shop, {
          //   name: shop.name,
          //   img: shop.img,
          //   text: shop.text,
          //   deliverFee: shop.deliverFee,
          //   deliverTime: shop.deliverTime
          // })
          // this.SET_SHOP(this.shop)
        }
      } catch (error) {
        this.$toast({
          type: 'fail',
          message: error
        })
      }
    }
  },
  created() {
    this.queryGoods()
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
