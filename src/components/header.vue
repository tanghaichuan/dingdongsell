<template>
  <header>
    <van-nav-bar
      title="我的"
      left-arrow
      @click-left="onClickLeft"
    />
  </header>
</template>
<script>
export default {
  name: 'headerBar',
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="less">
@import '../assets/styles/mixins.less';
header {
  .van-nav-bar .van-icon {
    color: #5f5b5b;
  }
  .van-nav-bar__title {
    color: #5f5b5b;
  }
  .van-nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: transparent;
    height: 1.173333rem;
  }
  .van-nav-bar__title {
    height: 100%;
    display: inline-block;
    .fs42;
    line-height: 2;
    text-align: center;
  }
  .van-nav-bar__left {
    height: 100%;
    display: flex;
    align-items: center;
    .fs(32);
  }
  .van-nav-bar__right {
    height: 100%;
    display: flex;
    align-items: center;
    .fs(32);
  }
}
</style>
