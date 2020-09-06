import React from 'react';
import './assets/css/app.scss';
import {Layout,Login} from '@/components'
//引用antd的样式
import 'antd/dist/antd.css'
//引用route
import { HashRouter } from 'react-router-dom'
//引用redux
import {Provider} from 'react-redux'
import store from '@/store'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state={
      token:localStorage.getItem('token')
    }
  }
  onLogin(){
    this.setState({
      token:localStorage.getItem('token')
    })
  }
  render(){
    let {token} = this.state
    return (
      <HashRouter>
        <Provider store={store}>
          {
            token ? <Layout /> : <Login onLogin={this.onLogin.bind(this)}/>
          }
        </Provider>
      </HashRouter>
    )
  }
}


export default App;
