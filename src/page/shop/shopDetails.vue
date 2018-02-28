<template>
  <div class="shop-details">
    <headerBar title="商店详情"></headerBar>
    <div class="details-content">
			<div class="shop-info">
				<section class="section">
					<h3 class="section-title">活动与属性</h3>
					<div>
						<div class="activity-containerWrap activity-container">
							<i class="activity-activityIcon" style="
							color: rgb(255, 255, 255);
    						border-color: rgb(240, 115, 115);
    						background-color: rgb(240, 115, 115);
							">减</i>
							<span class="activity-description">
								<span>满30减5</span>
							</span>
						</div>
						<div class="activity-containerWrap activity-container">
							<i class="activity-activityIcon" style="
							color: rgb(255, 255, 255);
    						border-color: rgb(240, 115, 115);
    						background-color: rgb(240, 115, 115);
							">减</i>
							<span class="activity-description">
								<span>满30减5</span>
							</span>
						</div>
						<div class="activity-containerWrap activity-container">
							<i class="activity-activityIcon" style="
							color: rgb(255, 255, 255);
    						border-color: rgb(240, 115, 115);
    						background-color: rgb(240, 115, 115);
							">减</i>
							<span class="activity-description">
								<span>满30减5</span>
							</span>
						</div>
					</div>
				</section>
				<section class="section">
					<h3 class="section-title">商家实景</h3>
					<a>
						<img src="https://fuss10.elemecdn.com/0/58/7ee5ce1a6df412cba136c8c7d79fcjpeg.jpeg?imageMogr/format/webp/thumbnail/!200x200r/gravity/Center/crop/200x200/" alt="">
						<span class="album-albumDesc">门面(1)张</span>
					</a>
				</section>
				<section class="section">
					<h3 class="section-title">商家信息</h3>
					<ul class="detail-list">
						<li>欢迎光临！</li>
						<li>地址：北京市东城区北京站西街1号</li>
						<li>营业时间：07:00-21:30</li>
					</ul>
				</section>
			</div>
		</div>
  </div>
</template>

<script>
import headerBar from '@/components/header'

export default {
  name: 'shopDetails',
  components: {
    headerBar
  }
}
</script>

<style scoped lang="less">
@import '../../assets/styles/mixins.less';
.shop-details {
  .details-content {
    padding-top: 1.173333rem;
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
  }
  .shop-info {
    background-color: #eee;
    font-size: 0.346667rem;
    overflow-y: auto;
  }
  .section {
    .detail-list li {
      display: flex;
      justify-content: space-between;
      margin-right: -0.4rem;
      padding: 0.4rem 0.133333rem 0.4rem 0;
    }
    .clearfix;
    a {
      position: relative;
      float: left;
      overflow: hidden;
      margin-top: 0.32rem;
      margin-right: 0.186667rem;
      width: 2.106667rem;
      height: 2.106667rem;
      img {
        .width(158);
        .height(158);
        display: block;
      }
      .album-albumDesc {
        display: block;
        position: absolute;
        bottom: 0;
        width: 100%;
        text-align: center;
        height: 0.48rem;
        line-height: 0.48rem;
        color: #eee;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
    margin-bottom: 0.266667rem;
    padding: 0 0.4rem 0.4rem;
    font-size: 0.346667rem;
    background-color: #fff;
    color: #666;
    .section-title {
      margin: 0 -0.4rem;
      padding: 0.213333rem 0.4rem;
      border-bottom: 1px solid #eee;
      color: #333;
      font-weight: 400;
      font-size: 0.4rem;
      line-height: 0.6rem;
    }

    .activity-container {
      &.activity-containerWrap:not(:last-child) {
        margin: 0.4rem 0;
      }
      line-height: 0.426667rem;
      display: flex;
      font-size: 0.266667rem;
      .activity-description {
        flex: 1;
        display: block;
        width: 0;
      }
    }
    .activity-activityIcon {
      margin-top: 0.066667rem;
      margin-right: 0.133333rem;
      font-size: 0.266667rem;
      font-style: normal;
      line-height: 1;
      height: 0.293333rem;
      display: inline-block;
      box-sizing: border-box;
      text-align: center;
      border: 1px solid;
      border-radius: 0.04rem;
    }
  }
}
</style>
