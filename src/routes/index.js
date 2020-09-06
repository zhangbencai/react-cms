import React from 'react'
import loadable from '@loadable/component'
import {
  SettingOutlined,
  FormOutlined,
  AimOutlined,
  AreaChartOutlined,
  SnippetsOutlined,
  EditOutlined,
  UserAddOutlined
} from '@ant-design/icons';


const Home = loadable(()=>import('./system/Home'))
const Analyze = loadable(()=>import('./system/Analyze'))
const TodoList = loadable(()=>import('./system/TodoList'))
const GoodAdd = loadable(()=>import('./good/GoodAdd'))
const GoodList = loadable(()=>import('./good/GoodList'))

const router = [
  {
    id:1,
    text:'系统概况',
    icon:<SettingOutlined />,
    children:[
      {
        id:11,
        text:'首页概况',
        path:'/home',
        component:Home,
        icon:<AimOutlined />
      },
      {
        id:12,
        text:'数据分析',
        path:'/analyze',
        component:Analyze,
        icon:<AreaChartOutlined />
      },
      {
        id:13,
        text:'待办事项',
        path:'/todo',
        component:TodoList,
        icon:<SnippetsOutlined />
      }
    ]
  },
  {
    id:2,
    text:'商品管理',
    icon:<FormOutlined />,
    children:[
      {
        id:22,
        text:'商品列表',
        path:'/good/list',
        component:GoodList,
        icon:<EditOutlined />,
        children:[
          {
            id:21,
            text:'商品添加',
            path:'/good/add/:id',
            component:GoodAdd,
            icon:<EditOutlined />
          },
        ]
      },
    ]
  },
  {
    id:3,
    text:'系统管理员',
    icon:<UserAddOutlined />,
    children:[]
  }
]
export default router