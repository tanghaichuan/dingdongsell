<template>
  <div class="profile-info">
    <headerBar title="账户信息"></headerBar>
    <van-cell-group>
      <van-cell class="info" title="头像" is-link />
      <van-cell class="info" title="用户名" is-link />
    </van-cell-group>
    <van-button @click.native="logout" class="login-btn" size="large">退出登录</van-button>
  </div>
</template>
<script>
import headerBar from '@/components/header'
import { session } from '@/utils/storage'

export default {
  name: 'profileInfo',
  components: {
    headerBar
  },
  methods: {
    logout() {
      if (!!session.get('user')) {
        session.remove('user')
      }
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
<style scoped lang="less">
@import '../../assets/styles/mixins.less';
.profile-info {
  .pt(130);
  .info {
    .fs(24);
  }
  .login-btn {
    .mt(50);
    .mb(20);
    background: #d8584a;
    color: #fff;
  }
}
</style>
