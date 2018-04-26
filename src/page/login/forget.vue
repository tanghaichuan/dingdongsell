<template>
  <div class="login">
    <header-bar title="用户登录"></header-bar>
    <van-cell-group class="login-cell">
      <van-field type="text" :error="hadUser" v-model="user.username" placeholder="账号" />
    </van-cell-group>
    <van-cell-group class="login-cell">
      <van-field type="password" :error="hadPwd" v-model="user.password" placeholder="旧密码" />
    </van-cell-group>
    <van-cell-group class="login-cell">
      <van-field type="password" :error="rePwd" v-model="user.rePassword" placeholder="新密码" />
    </van-cell-group>
    <van-button @click.native="login" class="login-btn" size="large">确定</van-button>
  </div>
</template>
<script>
import headerBar from '@/components/header'
import { session } from '@/utils/storage'
import { login } from '@/api'

export default {
  name: 'forget',
  components: {
    headerBar
  },
  data() {
    return {
      hadUser: false,
      hadPwd: false,
      rePwd: false,
      user: {
        username: '',
        password: '',
        rePassword: ''
      }
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
      if (!this.user.rePassword) {
        this.rePwd = true
        this.$toast({
          type: 'fail',
          message: '请输入新密码'
        })
        return false
      }
      return true
    },
    async login() {
      if (this.validForm()) {
        const param = {
          id: session.get('user').id,
          userName: this.user.username,
          userPassword: this.user.password
        }
        let res = await login(param)
        if (res.errorCode === 0) {
          this.$router.push('/')
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
    'user.rePassword'(val) {
      if (val) {
        this.rePwd = false
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
