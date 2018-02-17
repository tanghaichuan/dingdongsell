<template>
  <div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>
    <van-button type="danger">危险按钮</van-button>
    <van-button size="large">大号按钮</van-button>
  </div>
</template>
<script>
import { getTest } from '@/api'
export default {
  name: 'hello',
  async created() {
    let res = await getTest()
    console.log(res)
  }
}
</script>