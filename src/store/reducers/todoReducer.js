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
//定义初始化数据，可以被所有组件进行共享使用
const initState = {
  msg:'1000',
  list:[
    {id:1,task:'敲代码'},
    {id:2,task:'读书'},
    {id:3,task:'游戏'}
  ],
  data:{},
  undone:[],
  done:[],
}

export default function todoReducer(state=initState,action){
  //进行深复制
  let newState = JSON.parse(JSON.stringify(state))

  switch(action.type){
    case CHANGE_MSG:
      newState.msg = action.payload
      return newState
    //添加一条数据
    case TODO_ADD:
      newState.list.push(action.payload)
      return newState
    //删除一条数据
    case TODO_DEL:
      let id = action.payload
      newState.list = newState.list.filter(ele=>ele.id !==id)
      return newState
    //更新一条数据
    case TODO_UPD:
      newState.list.map((ele,idx,arr)=>{
        if(ele.id === action.payload.id){
          arr[idx].task = action.payload.task
        }
        return false
      })
      return newState
    //删除所有数据
    case TODO_CLEAR:
      newState.list = []
      return newState
    //调接口todoList
    //获取所有任务
    case TODO_MYTODOS:
      newState.data = action.payload
      newState.undone = newState.data.undone
      newState.done = newState.data.done
      return newState
    //添加任务
    case TODO_ADDTODO:
      newState.undone.push (action.payload)
      return newState
    //删除任务
    case TODO_DELETETODO:
      newState.data = action.payload
      return newState
    //切换任务
    case TODO_CHANGETODOSTATUS:
      newState.data = action.payload
      return newState
    //修改任务
    case TODO_EDITTODO:
      newState.data = action.payload
      return newState
    default:
      return state
  }
}