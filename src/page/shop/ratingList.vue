<template>
  <div class="rating-list">
		<ul>
			<li class="index-comment" v-for="(item, index) in list" :key="index">
				<div class="comment-block-container">
					<small class="comment-block-time">2017-07-27</small>
					<img :src="item.avatar" width="10px" height="10px" class="comment-block-avatar" alt="">
					<div class="comment-block-content">
						<h3 class="comment-block-username">{{item.username}}</h3>
						<star :score="item.score"></star>
            <p>{{item.text}}</p>
						<div>
							<ul class="comment-block-foods">
								<li>香汁鲐</li>
							</ul>
						</div>	
					</div>
				</div>
			</li>
		</ul>
		<div class="no-ratings" v-show="!list || !list.length">
			
		</div>
	</div>
</template>

<script>
import star from '@/components/ratingStar'

export default {
  name: 'ratingList',
  components: {
    star
  },
  props: {
    list: Array
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/styles/mixins.less';
.rating-list {
  background-color: #fff;
  padding: 0.266667rem 0.32rem 0;
  font-size: 0.36rem;
  .index-comment {
    padding: 0.4rem 0;
    border-bottom: 0.013333rem solid #ddd;
    .comment-block-container {
      position: relative;
      padding-left: 1.2rem;
    }
    .comment-block-time {
      position: absolute;
      top: 0.133333rem;
      right: 0;
      font-size: 0.32rem;
      color: #999;
    }
    .comment-block-avatar {
      position: absolute;
      top: 0;
      left: 0;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
      max-width: 100%;
    }
    .comment-block-content {
      .lh(31);
      font-size: 0.346667rem;
    }
    .comment-block-username {
      font-size: 0.346667rem;
      margin-top: 0;
      margin-bottom: 0.133333rem;
      color: #666;
    }
    .comment-block-foods li {
      display: inline-block;
      font-size: 0.293333rem;
      color: #999;
      border: 1px solid #ddd;
      padding: 0.106667rem 0.266667rem;
      margin: 0.093333rem;
      border-radius: 0.08rem;
      max-width: 1.6rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
