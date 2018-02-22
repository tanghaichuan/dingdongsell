<template>
  <footer>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop">外卖</van-tabbar-item>
      <van-tabbar-item icon="records" dot>订单</van-tabbar-item>
      <van-tabbar-item icon="contact" info="5">个人</van-tabbar-item>
    </van-tabbar>
  </footer>  
</template>
<script>
export default {
  name: 'footerBar',
  data() {
    return {
      active: 0
    }
  },
  methods: {
    redirect() {
      if (this.$route.meta) {
        const { active = 0 } = this.$route.meta
        this.active = active
      }
    }
  },
  created() {
    this.redirect()
  },
  watch: {
    $route(val) {
      if (val.meta) {
        const { active = 0 } = val.meta
        this.active = active
      }
    },
    active(val) {
      val = parseInt(val)
      switch (val) {
        case 0:
          this.$router.push({ name: 'Home' })
          break
        case 1:
          this.$router.push({ name: 'Order' })
          break
        case 2:
          this.$router.push({ name: 'Profile' })
          break
        default:
          this.$router.push({ name: 'Home' })
          break
      }
    }
  }
}
</script>
<style lang="less">
footer {
  height: 1.6rem;
}
.van-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.12rem;
  background-color: #fff;
  height: 1.333333rem;
  box-shadow: 0 -0.026667rem 0.053333rem rgba(0, 0, 0, 0.1);
  box-shadow: 0 -0.266667vw 0.533333vw rgba(0, 0, 0, 0.1);
}
.van-tabbar-item {
  line-height: 1.5;
  .van-tabbar-item__icon {
    font-size: 0.466667rem;
  }
  .van-tabbar-item__text {
    color: #8e8e93;
    font-size: 0.266667rem;
  }
}
.van-tabbar-item--active {
  .van-tabbar-item__text {
    color: #38f !important;
  }
}
</style>