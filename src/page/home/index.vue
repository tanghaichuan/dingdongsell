<template>
  <div class="home">
    <div class="link-search">
      <van-search placeholder="请输入商品名称" v-model="searchVal" />
    </div>
    <van-swipe class="home-swipe" :autoplay="3000">
      <van-swipe-item>
        <img src='../../../static/img/swipe1.jpg' alt="">
      </van-swipe-item>
      <van-swipe-item>
        <img src='../../../static/img/swipe2.jpg' alt="">
      </van-swipe-item>
    </van-swipe>
    <div class="home-geohash">
      <van-icon name="location" />
      <span class="geohash-text">{{address}}</span>
    </div>
    <nav class="nav-container">
      <van-row class="nav-wrapper">
        <van-col span="6">
          <figure>
            <img src="../../assets/images/biandang.png">
            <figcaption>便当</figcaption>
          </figure>
        </van-col>
        <van-col span="6">
          <figure>
            <img src="../../assets/images/huoguo.png">
            <figcaption>火锅</figcaption>
          </figure>
        </van-col>
        <van-col span="6">
          <figure>
            <img src="../../assets/images/hanbao.jpg">
            <figcaption>汉堡快餐</figcaption>
          </figure>
        </van-col>
        <van-col span="6">
          <figure>
            <img src="../../assets/images/difang.png">
            <figcaption>地方菜系</figcaption>
          </figure>
        </van-col>
        <van-col span="6">
          <figure>
            <img src="../../assets/images/mianshi.png">
            <figcaption>面食粥点</figcaption>
          </figure>
        </van-col>
      </van-row>
    </nav>
    <div class="foot-container">
      <shopList></shopList>
    </div>
    <footerBar></footerBar>
  </div>
</template>
<script>
import footerBar from '@/components/footer'
import shopList from '@/components/shopList'

export default {
  name: 'home',
  components: {
    footerBar,
    shopList
  },
  data() {
    return {
      searchVal: '',
      address: '请选择地址',
      images: [
        '../../../static/img/swipe1.jpg',
        '../../../static/img/swipe2.jpg'
      ]
    }
  }
}
</script>
<style lang="less">
@import '../../assets/styles/mixins.less';

.home {
  background: #fff;
  height: 100%;
  position: relative;
  z-index: -99;
  .home-swipe {
    position: fixed;
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
  .mt(42);
}
.link-search {
  position: sticky;
  top: 0px;
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
  .top(300);
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
.nav-container {
  position: relative;
  .top(400);
  overflow: hidden;
  text-align: center;
  background: #fff;
  .nav-wrapper {
    figure {
      margin-top: 0.293333rem;
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
.foot-container {
  position: relative;
}
</style>
