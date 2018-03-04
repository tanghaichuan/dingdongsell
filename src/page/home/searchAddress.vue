<template>
  <transition name="slide">
    <div class="search-address" v-show="show">
      <header>
        <van-nav-bar
          title="选择收获地址"
          left-arrow
          @click-left="onClickLeft"
        />
      <div class="search-wrap">
        <van-search
          v-model="searchVal"
          show-action
          placeholder="请输入地址"
          @search="onSearch"
        >
          <div class="search-input-right" slot="action" @click="onSearch"><van-icon name="location" />重新定位</div>
        </van-search>
      </div>
      <div class="search-list">
        <div class="address-cell" 
          v-for="(item, index) in addressList" 
          :key="index"
          @click="saveAddress(item)">
          <p>{{item.name}}</p>
          <p>{{item.address}}</p>
        </div>
      </div>
    </header>
    </div>
  </transition>
</template>
<script>
import { local } from '@/utils/storage'
import headerBar from '@/components/header'

export default {
  name: 'searchAddress',
  components: {
    headerBar
  },
  props: {
    value: Boolean
  },
  data() {
    return {
      searchVal: '',
      show: this.value,
      addressList: []
    }
  },
  methods: {
    onClickLeft() {
      this.show = false
    },
    onSearch() {
      this.searchVal = '石家庄'
    },
    saveAddress(item) {
      const address = {
        name: item.name
      }
      this.$emit('onSaveAddress', item.name)
    }
  },
  watch: {
    value(val) {
      this.show = val
    },
    show(val) {
      this.$emit('input', val)
    },
    searchVal(val) {
      if (val && val !== ' ') {
        const temp = [
          {
            name: '河北师范大学',
            address: '河北省石家庄市裕华区南二环东路20号'
          },
          {
            name: '河北师范大学汇华学院',
            address: '河北省石家庄市桥西区红旗大街469号'
          }
        ]
        this.addressList = temp
      }
    }
  }
}
</script>

<style lang="less">
@import '../../assets/styles/mixins.less';
.search-address {
  .pt(100);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  overflow: auto;
  background-color: #f4f4f4;
  .van-search {
    border-radius: 0;
    .pd(20,10,20,30);
    .van-search__input-wrap {
      background: #f4f4f4;
      & > input {
        background: #f4f4f4;
      }
    }
    .van-search__action {
      .fs24;
      color: #2395ff;
      .search-input-right {
        .pl(10);
        display: flex;
        align-items: center;
      }
    }
    .van-search__input-wrap {
      .height(72);
    }
  }
  .address-cell {
    font-size: 0.32rem;
    background-color: #fff;
    padding: 0.293333rem 0.4rem;
    color: #2a2a2a;
    &:not(:last-child) {
      border-bottom: 1px solid #ccc;
    }
    p:first-of-type {
      .fs32;
      font-weight: 700;
    }
    p:last-of-type {
      color: #333;
      font-size: 0.32rem;
      line-height: 0.453333rem;
      margin-top: 0.053333rem;
    }
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
