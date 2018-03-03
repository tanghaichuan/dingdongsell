<template>
<div class="filter-bar">
  <nav>
    <span 
      v-for="(item, index) in navList" 
      :key="index"
      @click="toggleNav(item)" 
      :class="['nav-item',{'active':currentVal===item}]">{{item}}</span>
  </nav>
</div>
</template>

<script>
export default {
  name: 'filterBar',
  data() {
    return {
      currentVal: this.value
    }
  },
  props: {
    navList: {
      type: Array,
      default: () => []
    },
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    toggleNav(item) {
      this.currentVal = item
      this.$emit('input', item)
      this.$emit('on-click', item)
    }
  }
}
</script>

<style lang="less">
@import '../assets/styles/mixins.less';
.filter-bar {
  nav {
    .pt(25);
    .pb(25);
    display: flex;
    .height(40);
    .lh(40);
    border: 1px solid #ccc;
    border-width: 1px 0;
    background: #fff;
  }
  .nav-item {
    flex: 1;
    display: inline-block;
    text-align: center;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    color: #666;
    .fs(28);
    &:not(:last-child) {
      border-right: 1px solid #666;
      text-align: center;
    }
    &.active {
      color: #000;
    }
  }
}
</style>
