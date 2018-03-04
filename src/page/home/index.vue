<template>
  <div class="home">
    <div class="link-search">
      <van-search @click.native="linkToSearch" placeholder="请输入商品名称" v-model="searchVal" />
    </div>
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
    <div class="shop-container">
      <div class="shop-title">
        推荐商家
      </div>
      <shopList></shopList>
    </div>
    <search-address @onSaveAddress="onSaveAddress" v-model="showSearchAdd"></search-address>
    <footerBar></footerBar>
  </div>
</template>
<script>
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
        }
      ],
      searchVal: '',
      images: [
        '../../../static/img/swipe1.jpg',
        '../../../static/img/swipe2.jpg'
      ],
      address: '请选择地址'
    }
  },
  methods: {
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
