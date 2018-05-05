<template>
  <div class="food">
    <header-bar :title="$route.params.category"></header-bar>
    <filter-bar v-model="active"  :nav-list="navList"></filter-bar>
    <shop-list :list="list"></shop-list>
  </div>
</template>

<script>
import headerBar from '@/components/header'
import filterBar from '@/components/filterBar'
import shopList from '@/components/shopList'
import { queryShopList } from '@/api'
import { session } from '@/utils/storage'
import { orderBy } from 'lodash'

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
      navList: ['销量最高', '距离最近', '评分最高'],
      shopLists: [],
      list: []
    }
  },
  methods: {
    async queryShops() {
      let userId = '-1'
      if (session.get('user')) {
        userId = session.get('user').id
      }
      let res = await queryShopList({
        userLat: 114.520235,
        userLng: 38.002036,
        shoppingUserId: userId
      })
      if (res.errorCode === 0) {
        res.data.forEach(item => {
          let {
            id,
            businessName,
            distance,
            businessScore,
            businessPic,
            businessSalesNum,
            businessTag
          } = item
          this.shopLists.push({
            tag: businessTag,
            id,
            name: businessName,
            imgPath: businessPic,
            isPremium: true, // 品牌
            distance: distance,
            rating: businessScore, // 评价
            recentOrderNum: businessSalesNum, // 月售
            deliveryMode: {
              text: '峰鸟专送' // 支持特别派送
            },
            deliveryFee: 5, // 配送费
            orderLeadTime: '10小时', // 配送时间
            supports: [
              {
                description: '新用户下单立减17元',
                iconName: '减',
                name: '新用户减免'
              }
            ] // 其他支持服务
          })
        })
      }
    }
  },
  created() {
    this.queryShops()
  },
  watch: {
    active: {
      handler(val) {
        switch (val) {
          case '销量最高':
            this.list = orderBy(this.list, ['recentOrderNum'], ['desc'])
            break
          case '距离最近':
            this.list = orderBy(this.list, ['distance'], ['desc'])
            break
          case '评分最高':
            this.list = orderBy(this.list, ['rating'], ['desc'])
            break
          default:
            this.list = orderBy(this.list, ['recentOrderNum'], ['desc'])
            break
        }
      },
      immediate: true
    },
    shopLists(val) {
      if (val) {
        let tag = this.$route.params.category
        this.list = this.shopLists.filter(item => item.tag === tag)
        this.list = orderBy(this.list, ['recentOrderNum'], ['desc'])
      }
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
