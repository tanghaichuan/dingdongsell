<template>
  <div class="shoplist-container">
    <ul v-load-more="loaderMore" class="shoplist-wrap" v-if="shopLists.length" type='1'>
      <router-link 
        :to="{name:'shop',params:{id:item.id}}" 
        v-for="item in shopLists" 
        tag="li" 
        :key="item.id"
        class="shop-li">
        <section>
					<img :src="item.imgPath" class="shop-img">
				</section>
        <hgroup class="shop-right">
          <header class="shop-detail-header">
						<h4 :class="['shop_title ellipsis',item.isPremium? 'premium': '']">{{item.name}}</h4>
						<ul class="shop-detail-ul">
							<li v-for="(item,index) in item.supports" :key="index" class="supports">{{item.iconName}}</li>
						</ul>
					</header>
          <h5 class="rating-order_num">
            <section class="rating-order_num--left">
							<section class="rating-section">
								<rating-star :score='item.rating'></rating-star>
								<span class="rating-num">{{item.rating}}</span>
							</section>
							<section class="order-section">
								月售{{item.recentOrderNum}}单
							</section>
						</section>
						<section class="rating-order_num--right">
							<span class="delivery-style delivery-left" v-if="item.deliveryMode">{{item.deliveryMode.text}}</span>
							<span class="delivery-style delivery-right">准时达</span>
						</section>
          </h5>
          <h5 class="fee-distance">
						<p class="fee">
							¥{{item.minimumOrderAmount}}起送
							<span class="segmentation">/</span>
              配送费约{{item.deliveryFee}}元
						</p>
						<p class="distance-time">
							<span v-if="Number(item.distance)">{{item.distance > 1000? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
								<span class="segmentation">/</span>
							</span>
							<span v-else>{{item.distance}}</span>
							<span class="segmentation">/</span>
							<span class="order-time">{{item.orderLeadTime}}</span>
						</p>
					</h5>
        </hgroup>
      </router-link>
    </ul>
    <aside class="return-top" @click="backTop" v-if="showBackStatus">
			<svg class="back-top-svg">
				<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop">
          <symbol viewBox="0 0 32 32" id="backtop">
            <g fill-rule="evenodd">
              <circle cx="16" cy="16" r="15" stroke="#999" stroke-width="0.6" fill="none"/>
              <line x1="16" y1="10" x2="16" y2="21" style="stroke:#999;stroke-width:0.8"/>
              <line x1="10" y1="10" x2="22" y2="10" style="stroke:#999;stroke-width:0.8"/>
              <path d="M9.5 18 L16 10 L22.5 18" style="stroke:#999;stroke-width:0.8;fill:none"/>
              <text x="10" y="27"  style="font-size:6px;fill:#999;font-weight:700;">顶部</text>
            </g>
          </symbol>
        </use>
			</svg>
		</aside> 
  </div>
</template>
<script>
import ratingStar from './ratingStar'
import loadMore from '@/mixins/loadMore'
import { animate } from '@/utils/dom'

const MAX_OFFSET = 5 // 最大懒加载量

export default {
  name: 'shopList',
  components: {
    ratingStar
  },
  mixins: [loadMore],
  data() {
    return {
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
      shopLists: [
        // 店铺列表
        {
          id: 1,
          name: '效果演示',
          distance: '2287.8公里',
          imgPath:
            'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
          isPremium: true, // 品牌
          supports: [
            {
              description: '新用户下单立减17元',
              iconName: '减',
              name: '新用户减免'
            }
          ], // 其他支持服务
          rating: 5, // 评分
          recentOrderNum: 100, // 月售
          deliveryMode: {
            text: '峰鸟专送' // 支持特别派送
          },
          minimumOrderAmount: 120, // 最少配送价
          deliveryFee: 5, // 配送费
          orderLeadTime: '10小时' // 配送时间
        },
        {
          id: 2,
          name: '效果演示',
          distance: '2287.8公里',
          imgPath:
            'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
          isPremium: true, // 品牌
          supports: [
            {
              description: '新用户下单立减17元',
              iconName: '减',
              name: '新用户减免'
            }
          ], // 其他支持服务
          rating: 5, // 评分
          recentOrderNum: 100, // 月售
          deliveryMode: {
            text: '峰鸟专送' // 支持特别派送
          },
          minimumOrderAmount: 120, // 最少配送价
          deliveryFee: 5, // 配送费
          orderLeadTime: '10小时' // 配送时间
        },
        {
          id: 3,
          name: '效果演示',
          distance: '2287.8公里',
          imgPath:
            'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
          isPremium: true, // 品牌
          supports: [
            {
              description: '新用户下单立减17元',
              iconName: '减',
              name: '新用户减免'
            }
          ], // 其他支持服务
          rating: 5, // 评分
          recentOrderNum: 100, // 月售
          deliveryMode: {
            text: '峰鸟专送' // 支持特别派送
          },
          minimumOrderAmount: 120, // 最少配送价
          deliveryFee: 5, // 配送费
          orderLeadTime: '10小时' // 配送时间
        },
        {
          id: 4,
          name: '效果演示',
          distance: '2287.8公里',
          imgPath:
            'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
          isPremium: true, // 品牌
          supports: [
            {
              description: '新用户下单立减17元',
              iconName: '减',
              name: '新用户减免'
            }
          ], // 其他支持服务
          rating: 5, // 评分
          recentOrderNum: 100, // 月售
          deliveryMode: {
            text: '峰鸟专送' // 支持特别派送
          },
          minimumOrderAmount: 120, // 最少配送价
          deliveryFee: 5, // 配送费
          orderLeadTime: '10小时' // 配送时间
        },
        {
          id: 5,
          name: '效果演示',
          distance: '2287.8公里',
          imgPath:
            'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
          isPremium: true, // 品牌
          supports: [
            {
              description: '新用户下单立减17元',
              iconName: '减',
              name: '新用户减免'
            }
          ], // 其他支持服务
          rating: 5, // 评分
          recentOrderNum: 100, // 月售
          deliveryMode: {
            text: '峰鸟专送' // 支持特别派送
          },
          minimumOrderAmount: 120, // 最少配送价
          deliveryFee: 5, // 配送费
          orderLeadTime: '10小时' // 配送时间
        },
        {
          id: 6,
          name: '效果演示',
          distance: '2287.8公里',
          imgPath:
            'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
          isPremium: true, // 品牌
          supports: [
            {
              description: '新用户下单立减17元',
              iconName: '减',
              name: '新用户减免'
            }
          ], // 其他支持服务
          rating: 5, // 评分
          recentOrderNum: 100, // 月售
          deliveryMode: {
            text: '峰鸟专送' // 支持特别派送
          },
          minimumOrderAmount: 120, // 最少配送价
          deliveryFee: 5, // 配送费
          orderLeadTime: '10小时' // 配送时间
        }
      ],
      preventRepeatReuqest: false, //到达底部加载数据，防止重复加载
      showBackStatus: false, //显示返回顶部按钮
      showLoading: true, //显示加载动画
      touchend: false, //没有更多数据
      mockShop: {
        name: '效果演示',
        distance: '2287.8公里',
        imgPath:
          'https://fuss10.elemecdn.com/5/4b/8ec8657cc284d74ffea5a6957aa9djpeg.jpeg?imageMogr/format/webp/thumbnail/!130x130r/gravity/Center/crop/130x130/',
        isPremium: true, // 品牌
        supports: [
          {
            description: '新用户下单立减17元',
            iconName: '减',
            name: '新用户减免'
          }
        ], // 其他支持服务
        rating: 5, // 评分
        recentOrderNum: 100, // 月售
        deliveryMode: {
          text: '峰鸟专送' // 支持特别派送
        },
        minimumOrderAmount: 120, // 最少配送价
        deliveryFee: 5, // 配送费
        orderLeadTime: '10小时' // 配送时间
      }
    }
  },
  methods: {
    showBack() {
      if (document.body.scrollTop > 500) {
        this.showBackStatus = true
      } else {
        this.showBackStatus = false
      }
    },
    backTop() {
      animate(document.body, { scrollTop: '0' }, 400, 'ease-out')
    },
    getShopList() {
      let arr = []
      for (let i = 1; i <= MAX_OFFSET; i++) {
        arr.push(this.mockShop)
      }
      return arr
    },
    loaderMore() {
      if (this.touchend) {
        return
      }
      this.offset += MAX_OFFSET
      let res = this.getShopList()
      this.shopLists = [...this.shopLists, ...res]
    }
  },
  mounted() {
    document.addEventListener('scroll', this.showBack, false)
  },
  destroyed() {
    document.removeEventListener('scroll', this.showBack)
  }
}
</script>
<style lang="less">
@import '../assets/styles/mixins.less';

.shoplist-container {
  background-color: #fff;
}
.shoplist-wrap {
  margin-bottom: 2rem;
}
.shop-li {
  display: flex;
  border-bottom: 0.025rem solid #f1f1f1;
  padding: 0.7rem 0.4rem;
}
.shop-img {
  width: 1.733333rem;
  height: 1.733333rem;
  display: block;
  margin-right: 0.2rem;
}
.list-back-li {
  height: 4.85rem;
  .list-back_svg {
    width: 100%;
    height: 100%;
  }
}
.shop-right {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-grow: 1;
  flex-direction: column;
  user-select: none;
  .shop-detail-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .shop_title {
      display: inline-block;
      color: #333;
      padding-top: 0.01rem;
      font-size: 0.4rem;
      font-weight: 700;
    }
    .premium::before {
      content: '品牌';
      display: inline-block;
      font-size: 0.3rem;
      line-height: 0.6rem;
      color: #333;
      background-color: #ffd930;
      padding: 0 0.1rem;
      border-radius: 0.1rem;
      margin-right: 0.166667rem;
    }
    .shop-detail-ul {
      display: flex;
      transform: scale(0.8);
      .supports {
        font-size: 0.5rem;
        color: #999;
        border: 0.025rem solid #f1f1f1;
        padding: 0 0.04rem;
        border-radius: 0.08rem;
        margin-left: 0.05rem;
      }
    }
  }
  .rating-order_num {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 0.6rem;
    .rating-order_num--left {
      display: flex;
      justify-content: flex-start;
      .rating-section {
        display: flex;
        .rating-num {
          color: #666;
          font-weight: 100;
          margin: 0 0.106667rem;
        }
        svg {
          width: 1.493333rem;
          height: 0.266667rem;
        }
        .star_container {
          width: 80%;
        }
      }
      .order-section {
        color: #666;
      }
    }
    .rating-order_num--right {
      display: flex;
      align-items: center;
      transform: scale(0.7);
      min-width: 3rem;
      justify-content: flex-end;
      margin-right: -0.3rem;
      .delivery-style {
        font-size: 0.4rem;
        padding: 0.04rem 0.08rem 0;
        border-radius: 0.08rem;
        margin-left: 0.08rem;
        border: 1px;
      }
      .delivery-left {
        color: #fff;
        background-color: #3190e8;
        border: 0.025rem solid #3190e8;
      }
      .delivery-right {
        color: #3190e8;
        border: 0.025rem solid #3190e8;
      }
    }
  }
  .fee-distance {
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    color: #333;
    .fee {
      color: #666;
    }
    .distance-time {
      span {
        color: #999;
      }
      .segmentation {
        color: #ccc;
      }
    }
  }
}
.return-top {
  position: fixed;
  bottom: 3rem;
  right: 1rem;
  .back-top-svg {
    width: 1rem;
    height: 1rem;
  }
}
</style>
