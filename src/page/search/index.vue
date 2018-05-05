<template>
  <div class="search">
    <header-bar right-text="搜索" :on-click-right="onSearch">
      <div class="search-wrap">
        <van-search autofocus class="search-input" placeholder="请输入商品名称" v-model="searchVal" />
      </div>
    </header-bar>
    <div v-if="showWrap" class="food-wrap">
      <filter-bar v-model="active"  :nav-list="navList"></filter-bar>
      <shop-list :list="list"></shop-list>
    </div>
  </div>
</template>

<script>
import headerBar from '@/components/header'
import filterBar from '@/components/filterBar'
import shopList from '@/components/shopList'
import { queryShopByName } from '@/api'
import { session } from '@/utils/storage'
import { orderBy } from 'lodash'

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
      showWrap: false,
      shopLists: [],
      list: []
    }
  },
  methods: {
    async onSearch() {
      if (this.searchVal) {
        this.shopLists = []
        this.list = []
        this.queryShops()
        this.showWrap = true
      }
    },
    async queryShops() {
      let res = await queryShopByName({ searchStr: this.searchVal })
      if (res) {
        res.forEach(item => {
          let {
            id,
            businessName,
            distance,
            businessScore,
            businessPic,
            businessSalesNum
          } = item
          this.shopLists.push({
            id,
            name: businessName,
            imgPath: businessPic,
            isPremium: true, // 品牌
            distance: `${distance}公里`,
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
  watch: {
    shopLists(val) {
      if (val) {
        this.list = orderBy(val, ['recentOrderNum'], ['desc'])
      }
    },
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
