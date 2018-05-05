<template>
  <div class="pay-order">
    <header-bar title="在线支付"></header-bar>
    <div class="pay-detail">
      <p class="time-text">支付剩余时间</p>
      <p class="pay-time">{{remaining}}</p>
    </div>
    <div class="pay-type">
      <p class="pay-title">选择支付方式</p>
      <van-cell class="delivery-container">
        <span>在线支付</span>
      </van-cell>
    </div>
    <van-button @click.native="pay" class="pay-btn" type="" size="large">确认支付</van-button>
  </div>
</template>
<script>
import headerBar from '@/components/header'
import { session } from '@/utils/storage'
import { payOrder } from '@/api'

export default {
  name: 'payOrder',
  components: {
    headerBar
  },
  data() {
    return {
      timer: null,
      timeCount: 3 // 倒计时
    }
  },
  computed: {
    remaining() {
      let minute = parseInt(this.timeCount / 60)
      if (minute < 10) {
        minute = `0${minute}`
      }
      let second = parseInt(this.timeCount % 60)
      if (second < 10) {
        second = `0${second}`
      }
      return `00 : ${minute} : ${second}`
    }
  },
  methods: {
    remainingTime() {
      clearInterval(this.timer)
      this.timer = setInterval(async () => {
        this.timeCount--
        if (this.timeCount === 0) {
          clearInterval(this.timer)
          this.$dialog
            .alert({
              title: '支付失败'
            })
            .then(async () => {
              let params = session.get('order')
              params.orderStatus = 0
              let res = await payOrder(params)
              if (res.errorCode === 0) {
                this.$router.push({ name: 'Order' })
              }
            })
        }
      }, 1000)
    },
    async pay() {
      clearInterval(this.timer)
      let params = session.get('order')
      let res
      if (this.$route.params.id) {
        const data = {
          userId: session.get('user').id,
          orderId: this.$route.params.id,
          orderStatus: 1
        }
        res = await payOrder(data)
      } else {
        res = await payOrder(params)
      }

      if (res.errorCode === 0) {
        this.$toast({
          type: 'success',
          message: '下单成功'
        })
        this.$router.push({ name: 'Order' })
      } else {
        this.$toast({
          type: 'fail',
          message: '支付失败'
        })
      }
    }
  },
  mounted() {
    this.remainingTime()
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/styles/mixins.less';
.pay-order {
  .pt(100);
}
.pay-detail {
  background: #fff;
  padding: 0.7rem;
  color: #333;
  .time-text {
    text-align: center;
    .fs(32);
  }
  .pay-time {
    .mt(20);
    text-align: center;
    .fs(60);
  }
}
.pay-title {
  .fs(32);
  padding: 0.5rem;
}
.delivery-container {
  .height(100);
}
.pay-btn {
  .mt(50);
  background: #4cd96f;
  color: #fff;
}
</style>
