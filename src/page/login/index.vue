<template>
  <div class="login">
    <header-bar title="用户登录"></header-bar>
    <van-cell-group class="login-cell">
      <van-field type="text" :error="hadUser" v-model="user.username" placeholder="账号" />
    </van-cell-group>
    <van-cell-group class="login-cell">
      <van-field type="password" :error="hadPwd" v-model="user.password" placeholder="密码" />
    </van-cell-group>
    <van-cell-group class="login-cell login-iden-code">
      <van-field type="text" :error="judgeCode" placeholder="验证码" maxlength="4" v-model="idenCode"/>
      <div class="img_change_img">
        <img src="../../../static/img/idenCode.png">
        <div class="change-img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
        </div>
      </div>
    </van-cell-group> 
    <van-button @click.native="login" class="login-btn" size="large">登录</van-button>
    <router-link to="/forget" class="login-forget">重置密码？</router-link>
  </div>
</template>
<script>
import headerBar from '@/components/header'
import { session } from '@/utils/storage'
import { login } from '@/api'

export default {
  name: 'login',
  components: {
    headerBar
  },
  data() {
    return {
      hadUser: false,
      hadPwd: false,
      judgeCode: false,
      user: {
        username: '',
        password: ''
      },
      idenCode: ''
    }
  },
  methods: {
    validForm() {
      if (!this.user.username) {
        this.hadUser = true
        this.$toast({
          type: 'fail',
          message: '请输入用户名'
        })
        return false
      }
      if (!this.user.password) {
        this.hadPwd = true
        this.$toast({
          type: 'fail',
          message: '请输入密码'
        })
        return false
      }
      if (this.idenCode.toLowerCase().trim() !== 'v9am') {
        this.judgeCode = true
        this.$toast({
          type: 'fail',
          message: '验证码错误'
        })
        return false
      }
      return true
    },
    async login() {
      if (this.validForm()) {
        const param = {
          userName: this.user.username,
          userPassword: this.user.password
        }
        let res = await login(param)
        if (res.errorCode === 0) {
          session.set('user', res.data[0])
          this.$router.push({ path: '/profile' })
        } else {
          this.$toast({
            type: 'fail',
            message: '登陆失败'
          })
        }
      }
    },
    getCaptchaCode() {}
  },
  watch: {
    'user.username'(val) {
      if (val) {
        this.hadUser = false
      }
    },
    'user.password'(val) {
      if (val) {
        this.hadPwd = false
      }
    },
    idenCode(val) {
      if (val) {
        this.judgeCode = false
      }
    }
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
  .pl(0);
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
  .van-field {
    width: 56%;
  }
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
