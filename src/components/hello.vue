<template>
  <div>hello world</div>
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