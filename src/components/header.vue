<template>
  <header>
    <van-nav-bar
      :title="title"
      left-arrow
      :right-text='rightText'
      @click-right="onClickRight"
      @click-left="onClickLeft"
    >
    <div class="title" v-if="$slots.default" slot="title">
      <slot></slot>
    </div>
    </van-nav-bar>

  </header>
</template>
<script>
export default {
  name: 'headerBar',
  props: {
    title: String,
    rightText: String,
    onClickRight: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}
</script>
