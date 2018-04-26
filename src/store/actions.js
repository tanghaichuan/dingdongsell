import * as constant from './constant'
import {Toast} from 'vant'
import {session} from '@/utils/storage'
import {editAddress} from '../api'

// 获取用户身份
export function fetchUser({commit}) {
  let user = session.get('user')
  commit(constant.FETCH_USER, {
    user,
    isLogin: !!user
  })
}

// 新增收获地址
export async function addAddress({
  commit
}, content) {
  try {
    // 新增地址入库
    const {
      id,
      name,
      tel,
      province,
      city,
      county,
      address_detail
    } = content
    let address = `${province}${city}${county}${address_detail}`
    let param = {}
    if (id) {
      param = {
        addressId: id,
        userId: session
          .get('user')
          .id,
        addressName: name,
        addressLabel: tel,
        addressDetail: address
      }
    } else {
      param = {
        userId: session
          .get('user')
          .id,
        addressName: name,
        addressLabel: tel,
        addressDetail: address
      }
    }

    let res = await editAddress(param)
    if (res.errorCode === 0) {
      commit(constant.ADD_ADDRESS, {name, tel, address})
      Toast.success('添加成功')
    } else {
      Toast.fail('添加失败')
    }
  } catch (error) {
    Toast.fail(error)
  }
}

// 删除收获地址
export async function delAddress({
  commit
}, index) {
  try {
    // 删除地址出库
    commit(constant.DEL_ADDRESS, index)
    Toast.success('删除成功')
  } catch (error) {
    Toast.fail(error)
  }
}
