import {
  CHANGE_MSG,
  TODO_ADD,
  TODO_DEL,
  TODO_UPD,
  TODO_CLEAR,
  TODO_MYTODOS,
  TODO_ADDTODO,
  TODO_DELETETODO,
  TODO_CHANGETODOSTATUS,
  TODO_EDITTODO
} from '@/store/actionType'

import {
  getMyTodos,
  addTodo,
  deleteTodo,
  changeTodoStatus,
  editTodo
} from '@/utils/api'

//actions生成器，用于组件视图传递action
export function changeMsg(payload){
  return {
    type:CHANGE_MSG,
    payload
  }
}

export function todoAdd(payload){
  return{
    type:TODO_ADD,
    payload
  }
}
export function todoDel(payload){
  return{
    type:TODO_DEL,
    payload
  }
}
export function todoUpd(payload){
  return{
    type:TODO_UPD,
    payload
  }
}
export function todoClear(payload){
  return{
    type:TODO_CLEAR,
    payload:''
  }
}

//调接口的todoList
//获取所有任务
export function getMyTodo(params){
  return function(dispatch){
    getMyTodos(params).then(res=>{
      dispatch({
        type:TODO_MYTODOS,
        payload:res
      })
    }).catch(res=>{
      dispatch({
        type:TODO_MYTODOS,
        payload:[]
      })
    })
  }
}
//添加任务
export function getAddTodo(data){
  return function(dispatch){
    addTodo(data).then(res=>{
      dispatch({
        type:TODO_ADDTODO,
        payload:res
      })
    }).catch(err=>{
      dispatch({
        type:TODO_ADDTODO,
        payload:[]
      })
    })
  }
}
//删除任务
export function getDeleteTodo(params){
  return function(dispatch){
    deleteTodo(params).then(res=>{
      dispatch({
        type:TODO_DELETETODO,
        payload:res
      })
    }).catch(err=>{
      dispatch({
        type:TODO_DELETETODO,
        payload:[]
      })
    })
  }
}
//切换任务
export function getChangeTodoStatus(params){
  return function(dispatch){
    changeTodoStatus(params).then(res=>{
      dispatch({
        type:TODO_CHANGETODOSTATUS,
        payload:res
      })
    }).catch(err=>{
      dispatch({
        type:TODO_CHANGETODOSTATUS,
        payload:[]
      })
    })
  }
}
//修改任务
export function getEditTodo(data){
  return function(dispatch){
    editTodo(data).then(res=>{
      dispatch({
        type:TODO_EDITTODO,
        payload:res
      })
    }).catch(err=>{
      dispatch({
        type:TODO_EDITTODO,
        payload:[]
      })
    })
  }
}