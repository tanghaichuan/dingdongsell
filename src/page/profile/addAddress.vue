<template>
  <div class="profile-address__add">
    <headerBar 
      :title="title" 
      v-if="$route.name === 'editAddress'" 
      right-text="删除"
      :onClickRight="onClickdel"></headerBar>
    <headerBar 
      :title="title" 
      v-else></headerBar>
    <van-address-edit
      :address-info="addressInfo"
      class="address__add"
      :area-list="areaList"
      @save="onSave"
      :isSaving="isSaving"
    />
  </div>
</template>
<script>
import { session } from '@/utils/storage'
import { mapActions } from 'vuex'
import headerBar from '@/components/header'
import area from './area'

export default {
  name: 'addAddress',
  components: {
    headerBar
  },
  data() {
    return {
      title: this.$route.meta.title,
      isSaving: false,
      areaList: {},
      addressInfo: {}
    }
  },
  methods: {
    ...mapActions(['addAddress', 'delAddress']),
    async onSave(address) {
      try {
        const res = await this.addAddress(address)
        setTimeout(() => {
          this.$router.push({ name: 'profileAddress' })
        }, 0)
      } catch (error) {
        this.$toast({
          type: 'fail',
          message: error
        })
      }
    },
    async onClickdel() {
      try {
        const { addressId = '-1' } = this.$route.params
        const res = await this.delAddress(addressId)
        setTimeout(() => {
          //this.$router.push({ name: 'profileAddress' })
        }, 0)
      } catch (error) {
        this.$toast({
          type: 'fail',
          message: error
        })
      }
    }
  },
  created() {
    this.areaList = Object.assign({}, this.areaList, {
      province_list: area.province_list,
      city_list: area.city_list,
      county_list: area.county_list
    })
    if (this.$route.name === 'editAddress') {
      const { id, name, tel } = session.get('address')
      this.addressInfo = Object.assign({}, this.addressInfo, {
        id,
        name,
        tel
      })
    }
  }
}
</script>
<style lang="less">
.profile-address__add {
  .van-button {
    color: #fff;
  }
  .van-cell__title {
    flex-basis: 1.733333rem;
    margin-right: 0.3rem;
  }
}
.address__add {
  margin-top: 1.173333rem;
}
</style>
