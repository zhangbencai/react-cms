import React from 'react'

import MyHeader from './Header'
import MySider from './Sider'
import MyContent from './Content'
import './style.scss'

import { Layout } from 'antd'
const { Header, Sider, Content } = Layout

export default class MyLayout extends React.Component{
    render(){
      return(
        <div className='my-layout'>
          <Layout>
            <Sider width='170'>
              <MySider />
            </Sider>
            <Layout>
              <Header>
                <MyHeader />
              </Header>
              <Content>
                <MyContent />
              </Content>
            </Layout>
          </Layout>
        </div>
      )
    }
}