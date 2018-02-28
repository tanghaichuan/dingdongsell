<template>
<!--商店评价-->
<div class="shop-rating">
    <div class="rating-content">
      <div class="overview">
        <div class="overleft">
          <h1 class="score">{{totalScore}}</h1>
          <div class="title">综合评价</div>
          <div class="rank">高于周边商家{{morePercent}}</div>
        </div>
        <div class="overright">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score="severScore"></star>
            <span class="score">{{severScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score="shopScore"></star>
            <span class="score">{{shopScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <div class="title">送达时间</div>
            <div class="time">{{deliveryTime}}</div>
          </div>
        </div>
      </div>
      <div class="space"></div>
      <div class="rating">
        <feed-back></feed-back>
        <rating-list :list="ratingLists"></rating-list>
      </div>
    </div>
  </div>  
</template>
<script>
import { queryRatingList } from '@/api'
import star from '@/components/ratingStar'
import feedBack from './feedBack'
import ratingList from './ratingList'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
  name: 'shopRating',
  components: {
    star,
    feedBack,
    ratingList
  },
  data() {
    return {
      selectType: ALL,
      onlyContent: false,
      deliveryTime: '',
      morePercent: '',
      severScore: 0,
      shopScore: 0,
      totalScore: 0,
      ratingLists: []
    }
  },
  methods: {
    async ratingList() {
      try {
        let { id = -1 } = this.$route.params
        let res = await queryRatingList({ shopId: id })
        let rating = res.data
        this.deliveryTime = rating.deliveryTime
        this.morePercent = rating.morePercent
        this.severScore = rating.severScore
        this.shopScore = rating.shopScore
        this.totalScore = rating.totalScore
        this.ratingLists = rating.ratingList
      } catch (error) {
        this.$toast({
          type: 'fail',
          message: error
        })
      }
    }
  },
  async created() {
    await this.ratingList()
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/mixins.less';
.shop-rating {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .rating-content {
    .space {
      width: 100%;
      .height(32);
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      background: #f3f5f7;
    }
    .rating {
      .pt(36);
      .ml(36);
    }
    .overview {
      display: flex;
      align-items: center;
      .pt(36);
      .pb(36);
      .overleft {
        .pb(12);
        .pt(12);
        flex: 0 0 137*2/75*1rem;
        .width(137*2);
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        line-height: 1.5;
        .score {
          font-size: 0.8rem;
          line-height: 1;
          font-weight: 400;
          color: #f60;
          display: block;
        }
        .title {
          line-height: 1.5;
          font-size: 0.36rem;
          color: #666;
        }
        .rank {
          font-size: 0.266667rem;
          color: #999;
          font-weight: 400;
        }
      }
      .overright {
        flex: 1;
        .pl(48);
        .score-wrapper {
          .lh(30);
          .fs(0);
          display: flex;
          align-items: center;
          .title {
            display: inline-block;
            .fs(24);
            color: rgb(7, 17, 27);
          }
          .star {
            display: inline-block;
            .ml(24);
            .mr(24);
          }
          .score {
            display: inline-block;
            .fs(30);
            .pb(10);
            color: rgb(255, 153, 0);
          }
        }
        .delivery-wrapper {
          .pt(4);
          .title {
            display: inline-block;
            .fs(24);
            color: rgb(7, 17, 27);
            .lh(36);
            .mr(20);
          }
          .time {
            display: inline-block;
            .fs(28);
            color: rgb(147, 153, 159);
            .lh(36);
          }
        }
      }
    }
  }
}
</style>
