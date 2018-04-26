<template>
  <div class="home">
    <div class="link-search">
      <van-search @click.native="linkToSearch" placeholder="请输入商品名称" v-model="searchVal" />
    </div>
    <!--banner-->
    <div class="main-container">
      <van-swipe class="home-swipe" :autoplay="3000">
        <van-swipe-item>
          <img src='../../../static/img/swipe1.jpg' alt="">
        </van-swipe-item>
        <van-swipe-item>
          <img src='../../../static/img/swipe2.jpg' alt="">
        </van-swipe-item>
      </van-swipe>
      <div class="home-geohash" @click="onSearchAddress">
        <van-icon name="location" />
        <span class="geohash-text">{{address}}</span>
      </div>
    </div>
    <!--食品标签-->
    <nav class="nav-container">
      <van-row class="nav-wrapper">
        <van-col v-for="(item, index) in navList" :key="index" span="6">
          <router-link :to="{name:'food',params:{category:item.name}}">
            <figure>
              <img :src="item.img">
              <figcaption>{{item.name}}</figcaption>
            </figure>
          </router-link>
        </van-col>
      </van-row>
    </nav>
    <!--推荐商家列表-->
    <div class="shop-container">
      <div class="shop-title">
        推荐商家
      </div>
      <shopList :list="shopLists"></shopList>
    </div>
    <search-address @onSaveAddress="onSaveAddress" v-model="showSearchAdd"></search-address>
    <footerBar></footerBar>
  </div>
</template>
<script>
import { session } from '@/utils/storage'
import { queryPosition, queryShopList } from '@/api'
import footerBar from '@/components/footer'
import shopList from '@/components/shopList'
import searchAddress from './searchAddress'
import { local } from '@/utils/storage'

export default {
  name: 'home',
  components: {
    footerBar,
    shopList,
    searchAddress
  },
  data() {
    return {
      showSearchAdd: false,
      navList: [
        {
          name: '便当',
          img: require('../../assets/images/biandang.png')
        },
        {
          name: '火锅',
          img: require('../../assets/images/huoguo.png')
        },
        {
          name: '汉堡快餐',
          img: require('../../assets/images/hanbao.jpg')
        },
        {
          name: '地方菜系',
          img: require('../../assets/images/mianshi.png')
        },
        {
          name: '面食粥点',
          img: require('../../assets/images/mianshi.png')
        },
        {
          name: '自助',
          img: require('../../assets/images/zizhu.png')
        },
        {
          name: '生鲜',
          img: require('../../assets/images/shengxian.png')
        },
        {
          name: '果蔬',
          img: require('../../assets/images/guoshu.png')
        }
      ],
      searchVal: '',
      images: [
        '../../../static/img/swipe1.jpg',
        '../../../static/img/swipe2.jpg'
      ],
      address: '请选择地址',
      shopLists: []
      // shopLists: [
      //   // 店铺列表
      //   {
      //     id: 1,
      //     name: '效果演示',
      //     distance: '2287.8公里',
      //     imgPath:
      //       'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
      //     isPremium: true, // 品牌
      //     supports: [
      //       {
      //         description: '新用户下单立减17元',
      //         iconName: '减',
      //         name: '新用户减免'
      //       }
      //     ], // 其他支持服务
      //     rating: 5, // 评分
      //     recentOrderNum: 100, // 月售
      //     deliveryMode: {
      //       text: '峰鸟专送' // 支持特别派送
      //     },
      //     minimumOrderAmount: 120, // 最少配送价
      //     deliveryFee: 5, // 配送费
      //     orderLeadTime: '10小时' // 配送时间
      //   },
      //   {
      //     id: 2,
      //     name: '效果演示',
      //     distance: '2287.8公里',
      //     imgPath:
      //       'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
      //     isPremium: true, // 品牌
      //     supports: [
      //       {
      //         description: '新用户下单立减17元',
      //         iconName: '减',
      //         name: '新用户减免'
      //       }
      //     ], // 其他支持服务
      //     rating: 5, // 评分
      //     recentOrderNum: 100, // 月售
      //     deliveryMode: {
      //       text: '峰鸟专送' // 支持特别派送
      //     },
      //     minimumOrderAmount: 120, // 最少配送价
      //     deliveryFee: 5, // 配送费
      //     orderLeadTime: '10小时' // 配送时间
      //   },
      //   {
      //     id: 3,
      //     name: '效果演示',
      //     distance: '2287.8公里',
      //     imgPath:
      //       'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
      //     isPremium: true, // 品牌
      //     supports: [
      //       {
      //         description: '新用户下单立减17元',
      //         iconName: '减',
      //         name: '新用户减免'
      //       }
      //     ], // 其他支持服务
      //     rating: 5, // 评分
      //     recentOrderNum: 100, // 月售
      //     deliveryMode: {
      //       text: '峰鸟专送' // 支持特别派送
      //     },
      //     minimumOrderAmount: 120, // 最少配送价
      //     deliveryFee: 5, // 配送费
      //     orderLeadTime: '10小时' // 配送时间
      //   },
      //   {
      //     id: 4,
      //     name: '效果演示',
      //     distance: '2287.8公里',
      //     imgPath:
      //       'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
      //     isPremium: true, // 品牌
      //     supports: [
      //       {
      //         description: '新用户下单立减17元',
      //         iconName: '减',
      //         name: '新用户减免'
      //       }
      //     ], // 其他支持服务
      //     rating: 5, // 评分
      //     recentOrderNum: 100, // 月售
      //     deliveryMode: {
      //       text: '峰鸟专送' // 支持特别派送
      //     },
      //     minimumOrderAmount: 120, // 最少配送价
      //     deliveryFee: 5, // 配送费
      //     orderLeadTime: '10小时' // 配送时间
      //   },
      //   {
      //     id: 5,
      //     name: '效果演示',
      //     distance: '2287.8公里',
      //     imgPath:
      //       'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
      //     isPremium: true, // 品牌
      //     supports: [
      //       {
      //         description: '新用户下单立减17元',
      //         iconName: '减',
      //         name: '新用户减免'
      //       }
      //     ], // 其他支持服务
      //     rating: 5, // 评分
      //     recentOrderNum: 100, // 月售
      //     deliveryMode: {
      //       text: '峰鸟专送' // 支持特别派送
      //     },
      //     minimumOrderAmount: 120, // 最少配送价
      //     deliveryFee: 5, // 配送费
      //     orderLeadTime: '10小时' // 配送时间
      //   },
      //   {
      //     id: 6,
      //     name: '效果演示',
      //     distance: '2287.8公里',
      //     imgPath:
      //       'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
      //     isPremium: true, // 品牌
      //     supports: [
      //       {
      //         description: '新用户下单立减17元',
      //         iconName: '减',
      //         name: '新用户减免'
      //       }
      //     ], // 其他支持服务
      //     rating: 5, // 评分
      //     recentOrderNum: 100, // 月售
      //     deliveryMode: {
      //       text: '峰鸟专送' // 支持特别派送
      //     },
      //     minimumOrderAmount: 120, // 最少配送价
      //     deliveryFee: 5, // 配送费
      //     orderLeadTime: '10小时' // 配送时间
      //   }
      // ]
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
      console.log(res)
      if (res.errorCode === 0) {
        res.data.forEach(item => {
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
    },
    async queryPos() {
      try {
        let res = await queryPosition()
        if (res.errCode === 0) {
          this.address = res.data.city
        }
      } catch (error) {
        console.error(error)
      }
    },
    linkToSearch() {
      this.$router.push({ name: 'search' })
    },
    onSearchAddress() {
      this.showSearchAdd = true
    },
    onSaveAddress(item) {
      local.set('address', item)
      this.address = item
      this.showSearchAdd = false
    },
    initAddress() {
      let location = local.get('address')
      if (location) {
        this.address = location
      }
    }
  },
  created() {
    this.initAddress()
    this.queryPos()
    this.queryShops()
  }
}
</script>
<style lang="less">
@import '../../assets/styles/mixins.less';

.home {
  position: relative;
  z-index: -99;
  .home-swipe {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
  }
  .van-swipe-item {
    img {
      width: 100%;
    }
  }
  .van-swipe__indicators {
    left: 85%;
  }
}
.home-geohash,
.link-search {
  color: #fff;
}
.link-search {
  .mt(40);
  position: sticky;
  top: 0;
  z-index: 999;
  text-align: center;
  .van-search {
    display: inline-block;
    width: 80%;
  }
}
.home-geohash {
  .width(100);
  .height(100);
  border-radius: 50%;
  background: #fff;
  position: absolute;
  .top(380);
  left: 325/75*1rem;
  display: flex;
  justify-content: center;
  .van-icon {
    color: blue;
    .fs42;
    .height(50);
    position: relative;
    .top(10);
  }
  .geohash-text {
    position: absolute;
    .top(65);
    display: inline-block;
    color: #000;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.main-container {
  position: relative;
  .top(-100);
  .height(450);
  .pt(42);
  background: #fff;
  z-index: -10;
}
.nav-container {
  .pb(30);
  position: relative;
  .top(-100);
  overflow: hidden;
  text-align: center;
  background: #fff;
  border-bottom: 0.025rem solid #e4e4e4;
  .nav-wrapper {
    figure {
      .mb(10);
    }
    img {
      .mt(10);
      border-radius: 50%;
      width: 60%;
      height: 60%;
    }
    figcaption {
      display: block;
      margin-top: 0.133333rem;
      color: #666;
      font-size: 0.32rem;
    }
  }
}
.shop-container {
  position: relative;
  .top(-50);
  border-top: 0.025rem solid #e4e4e4;
}
.shop-title {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.96rem;
  font-size: 0.4rem;
  color: #000;
  background-color: #fff;
  &::before {
    margin-right: 0.346667rem;
    display: block;
    content: '';
    width: 0.533333rem;
    height: 0.026667rem;
    background-color: #999;
  }
  &::after {
    margin-left: 0.346667rem;
    display: block;
    content: '';
    width: 0.533333rem;
    height: 0.026667rem;
    background-color: #999;
  }
}
</style>
