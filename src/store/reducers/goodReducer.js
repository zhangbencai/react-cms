import {
  GET_ALL_CATES,
  GET_ALL_LIST,
  GET_GOOD_DETAIL,
  RESET_GOOD_DETAIL
}from '@/store/actionType'
const initState = {
  cates:[],
  goodList:[],
  total:0,
  detail:{}
}

export default function goodReducer(state=initState,action){
  let newState = JSON.parse(JSON.stringify(state))
  switch(action.type){
    case GET_ALL_CATES:
      newState.cates = action.payload
      return newState
    case GET_ALL_LIST:
      newState.goodList = action.payload.list
      newState.total = action.payload.total
      return newState
    case GET_GOOD_DETAIL:
      newState.detail = action.payload
      return newState
    case RESET_GOOD_DETAIL:
      newState.detail = action.payload
      return newState
    default:
      return state
  }
}