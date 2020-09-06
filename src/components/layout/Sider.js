import React from 'react'
import routes from '@/routes'
import img from '@/utils/img'
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
const { SubMenu } = Menu

export default class Sider extends React.Component{

  //添加子集路由的方法
  createMenuItem(children){
    if(children){
      return children.map(ele=>(
        <Menu.Item  key={ele.id} icon={ele.icon}>
          <Link to={ele.path}>{ele.text}</Link>
        </Menu.Item>
      ))
    }
  }
  createNavs(){
    let arr = []
    routes.map(ele=>{
      arr.push(
        <SubMenu
            key={ele.id}
            icon={ele.icon}
            title={ele.text}>
            {this.createMenuItem(ele.children)}
        </SubMenu>
      )
      return false
    })
    return arr
  }
    render(){
        return(
            <div className='my-sider'>
              <div className='my-logo'>
                <img src={img.logo} alt='logo'/>
              </div>
              <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
              >
                {this.createNavs()}
              </Menu>
            </div>
        )
    }
}