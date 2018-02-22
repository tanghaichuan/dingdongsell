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
      class="address__add"
      :area-list="areaList"
      @save="onSave"
      :isSaving="isSaving"
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import headerBar from '@/components/header'

export default {
  name: 'addAddress',
  components: {
    headerBar
  },
  data() {
    return {
      title: this.$route.meta.title,
      isSaving: false,
      areaList: {
        province_list: {
          110000: '北京市',
          120000: '天津市'
        },
        city_list: {
          110100: '北京市',
          110200: '县',
          120100: '天津市',
          120200: '县'
        },
        county_list: {
          110101: '东城区',
          110102: '西城区',
          110105: '朝阳区',
          110106: '丰台区',
          120101: '和平区',
          120102: '河东区',
          120103: '河西区',
          120104: '南开区',
          120105: '河北区'
        }
      }
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
          this.$router.push({ name: 'profileAddress' })
        }, 0)
      } catch (error) {
        this.$toast({
          type: 'fail',
          message: error
        })
      }
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
  }
}
.address__add {
  margin-top: 1.173333rem;
}
</style>
