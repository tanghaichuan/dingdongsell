<template>
  <div class="profile-address">
    <headerBar title="我的地址"></headerBar>
    <van-address-list
      class="address"
      v-model="chosenAddressId"
      :list="addressLists"
      @add="handleAdd"
      @edit="handleEdit"
      @select="handleSelect"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import headerBar from '@/components/header'
import { session } from '@/utils/storage'

export default {
  name: 'profileAddress',
  components: {
    headerBar
  },
  data() {
    return {
      chosenAddressId: '1'
    }
  },
  computed: {
    ...mapState(['addressLists'])
  },
  methods: {
    handleAdd() {
      this.$router.push({ name: 'addAddress' })
    },
    handleEdit(item, index) {
      this.$router.push({ name: 'editAddress', params: { addressId: item.id } })
    },
    handleSelect(item) {
      session.set('address', item)
    }
  }
}
</script>
<style lang="less">
@import '../../assets/styles/mixins.less';
.profile-address {
  padding-top: 1.173333rem;
}
.address {
  .van-cell {
    &:first-child {
      .mt(10);
    }
    .height(100);
    background-color: #fff;
    padding: 0.2rem;
    border-bottom: 1px solid #ddd;
    display: flex;
    align-items: center;
    min-height: 1.813333rem;
  }
  .van-address-list__name {
    font-size: 0.466667rem;
    margin: 0;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.106667rem;
  }
  .van-radio__label {
    margin-left: 0.7rem;
  }
  .van-address-list__address {
    color: #666;
    font-size: 0.373333rem;
    margin: 0;
    display: flex;
    align-items: center;
  }
  .van-icon {
    font-size: 0.5rem;
  }
  .van-cell__text {
    color: #3190e8;
    font-size: 0.426667rem;
  }
}
</style>
