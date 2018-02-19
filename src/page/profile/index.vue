<template>
  <div class="profile">
    <headerBar></headerBar>
    <div>
      <div class="profile-user">  
          <div class="user-status">
            <div class="private-image">
              <svg viewBox="0 0 122 122" id="avatar-default">
                <path fill="#DCDCDC" fill-rule="evenodd" d="M61 121.5c33.413 0 60.5-27.087 60.5-60.5S94.413.5 61 .5.5 27.587.5 61s27.087 60.5 60.5 60.5zm12.526-45.806c-.019 3.316-.108 6.052.237 9.825 3.286 8.749 18.816 9.407 28.468 17.891-1.833 1.998-6.768 6.788-15 10.848-7.02 3.463-16.838 6.416-24.831 6.416-17.366 0-32.764-7.149-42.919-17.264 9.713-8.407 25.49-9.173 28.769-17.891.345-3.773.258-6.509.24-9.825l-.004-.002c-1.903-.985-5.438-7.268-6.01-12.571-1.492-.12-3.843-1.561-4.534-7.247-.37-3.053 1.107-4.77 2.004-5.31-5.046-19.212 1.507-33.16 20.749-34.406 5.753 0 10.18 1.52 11.909 4.523 15.35 2.702 11.756 22.658 9.328 29.882.899.54 2.376 2.258 2.004 5.31-.689 5.687-3.042 7.127-4.534 7.248-.575 5.305-3.25 10.82-5.873 12.57l-.003.003zM61 120.5C28.14 120.5 1.5 93.86 1.5 61S28.14 1.5 61 1.5s59.5 26.64 59.5 59.5-26.64 59.5-59.5 59.5z"></path>
              </svg>
            </div>
            <p>请先登录</p>
          </div>
      </div>
      <van-row class="user-links">
        <van-col span="12">
          <img src="../../assets/images/hongbao.png" alt="">
          <p>红包</p>
        </van-col>
        <van-col span="12">
          <img src="../../assets/images/shoucang.png" alt="">
          <p>收藏</p>
        </van-col>
      </van-row>
      <van-cell-group class="user-group">
        <van-cell icon="records" title="我的地址" is-link>
          <img src="../../assets/images/dizhi.png" slot="icon" alt="我的地址">
        </van-cell>
      </van-cell-group>
      <van-cell-group class="option-group">
        <van-cell title="客服中心" is-link>
          <img src="../../assets/images/kefu.png" slot="icon" alt="客服中心">
        </van-cell>
        <van-cell icon="gold-coin" title="意见反馈" is-link>
          <img src="../../assets/images/fankui.png" slot="icon" alt="意见反馈">
        </van-cell>
      </van-cell-group>
      <van-cell-group class="user-group">
        <van-cell title="我是商家" is-link>
          <img slot="icon" src="../../assets/images/shangjia.png" alt="我是商家">
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>
<script>
import headerBar from '@/components/header'

export default {
  name: 'profile',
  components: {
    headerBar
  }
}
</script>
<style lang="less">
@import '../../assets/styles/mixins.less';
.profile-user {
  .height(330);
  background: #e7ded6;
  background-size: cover;
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  .user-status {
    transform: translateY(65%);
  }
  .private-image {
    margin-bottom: 0.213333rem;
    background: #fff;
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    display: inline-block;
  }
  p {
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 0.32rem;
    color: #5f5b5b;
  }
}
.user-links {
  height: 1.57rem;
  background-color: #fff;
  .van-col {
    padding: 0.3rem 0;
    &:first-child {
      border-right: 1px solid #ddd;
    }
    img {
      margin-bottom: 0.133333rem;
      width: 0.693333rem;
      height: 0.693333rem;
    }
    p {
      .fs(28);
    }
  }
}
.user {
  &-poster {
    width: 100%;
    height: 4rem;
    display: block;
  }
  &-group {
    margin-bottom: 0.3rem;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.user-group {
  margin: 0.3rem 0;
}
.van-cell {
  display: flex;
  align-items: center;
  padding-left: 0.466667rem;
  line-height: 2.5;
  .van-cell__title {
    display: flex;
    align-items: center;
    .van-icon {
      .fs42;
    }
    img {
      margin-right: 0.266667rem;
      width: 0.6rem;
      height: 0.6rem;
    }
  }
  .van-icon-arrow {
    .fs(28);
  }
  span {
    font-size: 0.426667rem;
    color: #333;
  }
}
</style>
