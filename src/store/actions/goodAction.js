import {
  GET_ALL_CATES,
  GET_ALL_LIST,
  GET_GOOD_DETAIL,
  RESET_GOOD_DETAIL
}from '@/store/actionType'

import {fetchCate, fetchGoodList,fetchGoodDetail} from '@/utils/api'

//商品添加
export function getCates(params){
  return function(dispatch){
    fetchCate(params).then(res=>{
      console.log('cates',res)
      dispatch({
        type:GET_ALL_CATES,
        payload:res
      })
    })
  }
}

//商品列表
export function getGoddList(data){
  return function(dispatch){
    fetchGoodList(data).then(res=>{
        dispatch({
          type:GET_ALL_LIST,
          payload:res
        })
      })
  }
}

//获取商品详情
export function getGoodDetail(params){
  return function(dispatch){
    fetchGoodDetail(params).then(res=>{
      dispatch({
        type:GET_GOOD_DETAIL,
        payload:res
      })
    })
  }
}

export function resetDetail(payload) {
  return {
    type: RESET_GOOD_DETAIL,
    payload
  }
}