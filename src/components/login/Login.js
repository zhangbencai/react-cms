import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import './style.scss'
import {fetchLogin} from '@/utils/api'
import {withRouter} from 'react-router-dom'
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 18,
  },
};

class Login extends React.Component{
  componentDidMount(){
    this.props.history.replace('/login')
  }
  onLogin(values){
    fetchLogin(values).then((res)=>{
      this.props.history.replace('/')
      localStorage.setItem('token',res.token)
      //让APP刷新
      this.props.onLogin()
    })
  }
  render(){
    return(
      <div className='login'>
        <div>
          <Form
            {...layout}
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={this.onLogin.bind(this)}
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  pattern:/^[a-zA-Z][a-zA-Z0-9]{5,9}$/,
                  required: true,
                  message: '用户名不能为空',
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* eslint-disable */}
            <Form.Item
              label="密码"
              name="password"
              pattern='//'
              rules={[
                {
                  pattern:/^[a-zA-Z][a-zA-Z0-9]{7,19}$/,
                  required: true,
                  message: '密码不能为空',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            {/* eslint-disable */}
            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>记住用户名</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登入
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
export default withRouter(Login)