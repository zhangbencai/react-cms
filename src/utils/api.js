import axios from './axios'

export function getUser(params){
    return axios({
        url:'/users/cms/user',
        method:'GET',
        params
    })
}

//todoList
//获取所有任务
export function getMyTodos(params){
    return axios({
      url:'/todo/getMyTodos',
      method:'GET',
      params
    })
  }
  //添加任务
export function addTodo(data){
return axios({
    url:'/todo/addTodo',
    method:'POST',
    data
})
}
//删除任务
export function deleteTodo(params){
return axios({
    url:'/todo/deleteTodo',
    method:'GET',
    params
})
}
//切换任务
export function changeTodoStatus(params){
return axios({
    url:'/todo/changeTodoStatus',
    method:'GET',
    params
})
}
//修改任务
export function editTodo(data){
return axios({
    url:'/todo/editTodo',
    method:'POST',
    data
})
}

//商品管理
//用户登入
export function fetchLogin(data){
    return axios ({
        url:'/users/cms/login',
        method:'POST',
        data
    })
}
//获取所有品类
export function fetchCate(params){
    return axios({
        url:'/cates/getAllCates',
        method:'GET',
        params
    })
}
//商品添加
export function fetchAddGood(data){
    return axios({
        url:'/goods/cms/create',
        method:'POST',
        data
    })
}
//获取商品列表
export function fetchGoodList(params){
    return axios({
        url:'/goods/cms/list',
        method:'GET',
        params
    })
}
//删除商品
export function fetchDelGood(params){
    return axios({
        url:'/goods/cms/del',
        method:'GET',
        params
    })
}
//获取商品详情
export function fetchGoodDetail(params){
    return axios({
        url:'/goods/cms/detail',
        method:'GET',
        params
    })
}