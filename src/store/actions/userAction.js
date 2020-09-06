import {GET_USER_LIST} from '@/store/actionType'
import {getUser} from '@/utils/api'

export function getUsers(params){
  return function(dispatch){
    getUser(params).then(res=>{
      dispatch({
        type:GET_USER_LIST,
        payload:res
      })
    }).catch(err=>{
      dispatch({
        type:GET_USER_LIST,
        payload:[]
      })
    })
  }
}