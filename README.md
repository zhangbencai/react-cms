# 项目创建
安装
```
cnpm install create-react-app -g
```
创建项目
```
create-react-app react-antd-cms
```
暴露隐藏文件(一创建项目就暴露隐藏文件)
```
npm run eject
```
在暴露隐藏文件时报错,在本地创建一个本地仓库，用git
```
cd react-antd-cms
git init
git add .
git commit -m '备注'
npm run eject
```
启动项目
```
npm start
```
打包项目
```
npm run build
```
安装node-sass
```
cnpm install node-sass -D
```

# 改造项目目录
### src目录
assets ->存放css、scss和img

components ->放组件

routes ->放页面，要被route包裹

utils ->放自己封装的js方法

App.js ->跟组件

main.js ->入口文件

# 环境配置
自定义端口号 /scripts/start.js 搜索 PORT
配置 @ 别名 /config/webpack.config.js 里找到 resolve.alias
## 本地环境配置
安装
```
cnpm install http-proxy-middleware -D
```
在src目录创建setupProxy.js
```
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://xxx.com',   // 目标服务器
      changeOrigin: true
    })
  );
};
```
## antd
安装
```
cnpm install antd -S
```
## axios
安装
```
npm install axios -S
```
## 代码分割
安装
```
cnpm install @loadable/component -S
```
使用：
```
import loadable from '@loadable/component'
const TestJsx = loadable(()=>import('./study/TestJsx'))
```
## route
安装
```
cnpm install react-router-dom -S
```

## redux
安装
```
cnpm install redux -S
cnpm install react-redux -S
cnpm install redux-thunk -S //调接口时要安装
```
概念
1. Flux是Facebook官方提出一种应用程序管理思想
2. Redux 是其他团队基于Flux思想而开发出来、用于React项目架构的数据容器
3. Redux 在中大型的React项目，都会配套使用
4. Mobx非常小而美的React项目

核心概念:
1. action 它是reducer更新store的信号，包括type和payload ,它是视图中来，由dispatch派发而来。主要的作用是用来触发数据改变的行为
2. reducer 是一个纯函数，它的作用就是用来改变store中的数据
3. store 这是共享数据的存储中心

### 使用：
在src目录创建store,在store创建：actions文件夹(生成action)、reducers文件夹(放各种reducer)、index.js文件(将store抛出)、actionType.js文件(管理type的)
#### index.js
3个API:
1. createStore：创建store，必填参数：reducer
2. combineReducers:合并多个reducer
3. applyMiddleware：实现异步
```
import { createStore, combineReducers, applyMiddleware } from 'redux' 

import todoReducer from './reducers/todoReducer'
//是一个中间件，用于支持redux中的异步action
import thunk from 'redux-thunk'
const reducer = combineReducers({
  todo:todoReducer,
})
const store = createStore(reducer,applyMiddleware(thunk))
export default store
```
#### reducers
进行深复制的方法
1. let newState = JSON.parse(JSON.stringify(state))
2. let newState = {...state}
3. let newState = Object.assign({}, state)
4. 第二和第三的方法只能复制单一的结构
```
import {
  CHANGE_MSG,
} from '@/store/actionType'
// 定义初始化数据，可以被所有组件进行共享使用
const initState = {
  msg: '10000',
}
export default function todoReducer(state=initState, action) {
  // 深复制
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case CHANGE_MSG:
      newState.msg = action.payload
      return newState
    default:
      return state
  }
}
```
#### actions
```
import {
  CHANGE_MSG,
} from '@/store/actionType'
export function changeMsg(payload) {
  return {
    type: CHANGE_MSG,
    payload
  }
}
```
#### actionType.js
这样可以保证action type 是唯一的，也更好的维护。在两个地方会用到，一个是视图发送action时，还有一个在reducer中用到
```
export const CHANGE_MSG = 'CHANGE_MSG'
```
#### 在组件中的用法
```
import React from 'react'
import { connect } from 'react-redux'
import {
  changeMsg,
} from '@/store/actions/todoAction'
// 把store中需要共享的数据变成 this.props的方式进行访问
function mapStateToProps(store) {
  return {
    msg: store.todo.msg,
  }
}
// 把外部的actions生成器方法，遇到到this.props
function mapActionToProps(dispatch) {
  return {
    change: (payload)=>dispatch(changeMsg(payload)),
  }
}
class Home extends React.Component {
  changeMsg() {
    // dispatch一个action，发出去
    // 发到store
    // 交给reducer进行深复制
    console.log('props', this.props)
    this.props.change('30000')
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <h2>{this.props.msg}</h2>
        <button onClick={this.changeMsg.bind(this)}>改变msg</button>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapActionToProps)(Home)
```
#### 调接口
1. actions/userAction.js
```
import {
  GET_USER_LIST
} from '@/store/actionType'

import { fetchUsers } from '@/utils/api'

// 异步数据，相当于vuex中的actions
export function getUsers(params) {

  return function(dispatch) {
    // 调接口
    fetchUsers(params).then(res=>{
      // 调接口时，派发第二个action
      dispatch({
        type: GET_USER_LIST,
        payload: res
      })
    }).catch(err=>{
      // 如果失败，派发这个action
      dispatch({
        type: GET_USER_LIST,
        payload: []
      })
    })
  }
}
```
2. reducers/userReducer.sj
```
import {
  GET_USER_LIST
} from '@/store/actionType'

const initState = {
  list: []
}

export default function userReducer(state=initState, action) {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case GET_USER_LIST:
      newState.list = action.payload
      return newState
    default:
      return state
  }
}

```
3. actionType.js
```
export const GET_USER_LIST = 'GET_USER_LIST'
```
4. 组件
```
import React from 'react'

import { connect } from 'react-redux'
import { getUsers } from '@/store/actions/userAction'

function mapStateToProps(store) {
  return {
    users: store.user.list
  }
}
function mapActionToProps(dispatch) {
  return {
    init: (params)=>dispatch(getUsers(params))
  }
}
class Analyze extends React.Component {
  componentDidMount() {
    // 触发一个调接口的action
    this.props.init({})
  }
  createUserList() {
    let { users } = this.props
    return users.map(ele=>(
      <div key={ele._id}>
        <span>{ele._id}</span>
        <span>-</span>
        <span>{ele.username}</span>
      </div>
    ))
  }
  render() {
    console.log('this', this.props)
    return (
      <div className='qf-system-home'>
        {this.createUserList()}
      </div>
    )
  }
}
export default connect(mapStateToProps, mapActionToProps)(Analyze)
```
#### 异步数据
1. 组件的外部数据，都要从props进来
2. 异步action和同步action:前者需要三个action,后者只需要一个action
3. 异步数据的三个action
   1. 第一个action：通知store我要调接口
   2. 第二个action：我调接口已成功，这是后端返回的数据，给reducer更新
   3. 第三个action：我调接口已失败，告诉store失败了，不让reducer更新