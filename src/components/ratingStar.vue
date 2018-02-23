<template>
  <div class="star">
    <span 
      v-for="(item, index) in itemClass" 
      :key="index" 
      :class="['star-item',item]"></span>
  </div>  
</template>

<script>
const MAX_LEN = 5
const CLS_ON = 'on'
const CLS_HALF = 'half'
const CLS_OFF = 'off'

export default {
  name: 'star',
  data() {
    return {}
  },
  props: {
    score: {
      type: Number,
      default: 0
    }
  },
  computed: {
    itemClass() {
      let res = []
      let score = Math.floor(this.score * 2) / 2
      let hasDecimal = score % 1 !== 0
      let integer = Math.floor(score)
      for (let i = 0; i < integer; i++) {
        res.push(CLS_ON)
      }
      if (hasDecimal) {
        res.push(CLS_HALF)
      }
      while (res.length < MAX_LEN) {
        res.push(CLS_OFF)
      }
      return res
    }
  },
  methods: {}
}
</script>
<style scoped lang="less">
@import '../assets/styles/mixins.less';
.star {
  .fs(0);
  .star-item {
    display: inline-block;
    .width(20);
    .height(20);
    .mr(7);
    &:last-child {
      .mr(0);
    }
    &.on {
      background: url(../assets/images/star24_on.png) center center;
      background-repeat: no-repeat;
      background-size: 100%;
    }
    &.off {
      background: url(../assets/images/star24_off.png) center center;
      background-repeat: no-repeat;
      background-size: 100%;
    }
    &.half {
      background: url(../assets/images/star24_half.png) center center;
      background-repeat: no-repeat;
      background-size: 100%;
    }
  }
}
</style>