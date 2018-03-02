<template>
  <div class="login">
    <header-bar title="用户登录"></header-bar>
    <van-cell-group class="login-cell">
      <van-field v-model="user.username" placeholder="账号" />
    </van-cell-group>
    <van-cell-group class="login-cell">
      <van-field v-model="user.password" placeholder="密码" />
    </van-cell-group>
    <section class="login-iden-code">
        <input type="text" placeholder="验证码" maxlength="4" v-model="idenCode">
        <div class="img_change_img">
            <img src="../../../static/img/idenCode.png">
            <div class="change-img" @click="getCaptchaCode">
                <p>看不清</p>
                <p>换一张</p>
            </div>
        </div>
    </section>
    <van-button @click.native="login" class="login-btn" size="large">登录</van-button>
    <router-link to="/forget" class="login-forget">重置密码？</router-link>
  </div>
</template>
<script>
import headerBar from '@/components/header'
import { session } from '@/utils/storage'

export default {
  name: 'login',
  components: {
    headerBar
  },
  data() {
    return {
      user: {
        username: '',
        password: ''
      },
      idenCode: ''
    }
  },
  methods: {
    login() {
      session.set('user', this.user)
      this.$router.go(-1)
    },
    getCaptchaCode() {}
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/mixins.less';
.login {
  .pt(130);
  overflow: hidden;
}
.login-cell {
  .pl(20);
  .height(100);
  .lh(100);
  border-bottom: 1px solid #f1f1f1;
}
.login-btn {
  .mt(20);
  .mb(20);
  background: #4cd96f;
  color: #fff;
}
.login-forget {
  float: right;
  font-size: 0.4rem;
  color: #3b95e9;
  margin-right: 0.3rem;
}
.login-iden-code {
  display: flex;
  justify-content: center;
  input {
    .pl(30);
    border: 0;
    flex: 1;
    .fs(32);
  }
  .img_change_img {
    display: flex;
    align-items: center;
    img {
      .height(100);
    }
    .change-img {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      flex-direction: column;
      p {
        display: inline-block;
        line-height: 1.5;
      }
    }
  }
}
</style>
