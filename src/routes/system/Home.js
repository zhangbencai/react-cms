import React from 'react'
import { connect } from 'react-redux'
import {
  changeMsg,
  todoAdd,
  todoDel,
  todoUpd,
  todoClear
} from '@/store/actions/todoAction'

function mapStateToProps(store) {
  return {
    msg: store.todo.msg,
    list:store.todo.list
  }
}

function mapActionToProps(dispatch){
  return{
    change:(payload)=>dispatch(changeMsg(payload)),
    add:(payload)=>dispatch(todoAdd(payload)),
    del:(payload)=>dispatch(todoDel(payload)),
    upd:(payload)=>dispatch(todoUpd(payload)),
    clear:()=>dispatch(todoClear())
  }
}

class Home extends React.Component{
  
  changeMsg(){
    console.log('props',this.props)
    this.props.change(10)
  }

  createList(){
    let {list} = this.props
    return list.map(ele=>(
      <div key={ele.id}>
        <span>{ele.id}</span>
        <span>-</span>
        <span onClick={this.updHandle.bind(this,ele.id)}>{ele.task}</span>
        <button onClick={this.delHandle.bind(this,ele.id)}>删除</button>
      </div>
    ))
  }
  //添加
  addHandle(){
    this.props.add({
      id:Date.now(),
      task:'睡觉'
    })
  }
  //修改
  updHandle(id){
    this.props.upd({
      id,
      task:'工作'
    })
  }
  //删除
  delHandle(id){
    this.props.del(id)
  }
  //删除所有
  clearHandle(){
    this.props.clear()
  }

  render(){
   
    return(
      <div>
        <h1>首页</h1>
        <h2>{this.props.msg}</h2>
        <button onClick={this.changeMsg.bind(this)}>改变msg</button>
        <hr/>
        <button onClick={this.addHandle.bind(this)}>添加</button>
        <button onClick={this.clearHandle.bind(this)}>清空所有</button>
        {this.createList()}
      </div>
    )
  }
}

export default connect(mapStateToProps,mapActionToProps)(Home)