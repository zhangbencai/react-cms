import React from 'react'

import {connect} from 'react-redux'
import {getUsers} from '@/store/actions/userAction'

function mapStateToProps(store){
  return{
    users:store.user.list
  }
}

function mapActionToProps(dispatch){
  return{
    init:(params)=>dispatch(getUsers(params))
  }
}

class Analyze extends React.Component{

  componentDidMount(){
    this.props.init({})
  }
  createUserList(){
    let {users} = this.props
    console.log('aaa',users)
    return users.map(ele=>(
      <div key={ele._id}>
        <span>{ele._id}</span>
        <span>-</span>
        <span>{ele.username}</span>
      </div>
    ))
  }

  render(){
    return(
      <div>
        <h1>数据发现</h1>
        {this.createUserList()}
      </div>
    )
  }
}

export default connect(mapStateToProps,mapActionToProps)(Analyze)