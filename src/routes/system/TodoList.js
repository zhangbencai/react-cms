import React from 'react'
import '@/routes/css/todoList.scss'

import { Row, Col, Input, Badge, Checkbox } from 'antd';
import {MinusCircleOutlined} from '@ant-design/icons'
//, StarOutlined
import {connect} from 'react-redux'
import {
  getMyTodo,
  // getAddTodo,
  // getDeleteTodo,
  // getChangeTodoStatus,
  // getEditTodo
}from '@/store/actions/todoAction'

function mapStateToProps(store){
  return{
    data:store.todo.data,
    undone:store.todo.undone,
    done:store.todo.done
  }
}

function mapActionToProps(dispatch){
  return{
    init:(params)=>dispatch(getMyTodo(params)),
    //add:(data)=>dispatch(getAddTodo(data))
  }
}

class TodoList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      value:'',
      aa:''
    }
  }
 componentDidMount(){
   this.props.init({userId:'SZ000000000'})
   //this.props.add()
 }
 //未完成
 createTodoList(){
   let {undone}= this.props
   //const aa = data.undone
   console.log('aaa',undone)
   return undone.map(ele=>(
    <Row justify='center' key={Date.now()}>
    <Col span={14}>
      <div>
      <Row gutter={30}>
        <Col span={2}><Checkbox /></Col>
        <Col span={20}><Input value={ele.task} /></Col>
        <Col span={1} ><MinusCircleOutlined /></Col>
      </Row>
      </div>
    </Col>
  </Row>
   ))
 }
 //已完成
 createAccomplish(){
  let {done}= this.props
  return done.map(ele=>(
   <Row justify='center' key={Date.now()}>
   <Col span={14}>
     <div>
     <Row gutter={30}>
       <Col span={2}><Checkbox /></Col>
       <Col span={20}><Input value={ele.task} /></Col>
       <Col span={1} ><MinusCircleOutlined /></Col>
     </Row>
     </div>
   </Col>
 </Row>
  ))
}
changeHandel(e){
  this.setState({value:e.target.value})
}
//添加任务
KeyUpHandel(e){
  // if(e.keyCode==13){
  //   ({
  //     userId:'SZ000000000',
  //     task:e.target.value
  //   })
  // }
}
  render(){
    let {value} = this.state
    return(
      <div>
        <div className='my-todo-header'>
          {/*头部*/}
          <Row gutter={20} justify='center'>
            <Col className="gutter-row" span={4}>
              <h1>ToDoList</h1>
            </Col>
            <Col className="gutter-row" span={10}>
              <Input placeholder="添加ToDo" value={value} onChange={this.changeHandel.bind(this)} onKeyUp={this.KeyUpHandel.bind(this)}/>
            </Col>
          </Row>
        </div>
         {/*中间*/}
        <div className='my-todo-content'>
          <Row gutter={20} justify='center'>
            <Col className="gutter-row" span={4}>
              <h1>正在进行</h1>
            </Col>
            <Col className="gutter-row" span={1} offset={9}>
              <Badge count={4} className="site-badge-count-4" />
            </Col>
          </Row>
          {this.createTodoList()}
        </div>
        <div className='my-todo-accomplish '>
          <Row gutter={20} justify='center'>
            <Col className="gutter-row" span={4}>
              <h1>已经完成</h1>
            </Col>
            <Col className="gutter-row" span={1} offset={9}>
              <Badge count={4} className="site-badge-count-4" />
            </Col>
          </Row>
          {this.createAccomplish()}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapActionToProps)(TodoList)