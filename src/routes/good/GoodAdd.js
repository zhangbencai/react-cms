import React from 'react'

import {connect} from 'react-redux'
import {fetchAddGood} from '@/utils/api'
import {MyUpload,MyCateSelect} from '@/components'
import {getGoodDetail,resetDetail} from '@/store/actions/goodAction'
import img from '@/utils/img'
import { 
  Form, 
  Input, 
  Button, 
  InputNumber,
  Switch
} from 'antd';
const { TextArea } = Input;


function mapStateToProps(store){
  return{
    detail:store.good.detail
  }
}

function mapActionToProps(dispatch){
  return{
    getDetail:(params)=>dispatch(getGoodDetail(params)),
    resetDetail:()=>dispatch(resetDetail())
  }
}

class GoodAdd extends React.Component{
  constructor(props){
    super(props)
    this.state={
      imageUrl: img.uploadIcon,
      cate:''
    }
  }
  componentDidMount(){
    let id = this.props.match.params.id
    //新增
    if(id==='0'){
      this.props.resetDetail({
        name: '',
        desc: '',
        price: '',
        cate: '',
        img: '',
        hot: false
      })
    }else{
      //编辑
      this.props.getDetail({good_id:id})
    }
  }
  // 当store中的props发生更新，
  shouldComponentUpdate(props){
    console.log('aaa')
    //设置form表单值
    this.refs.form.setFieldsValue(props.detail)
    console.log('props detail', props.detail)
    return true
  }
  //提交数据
  onFinish(values) {
    let id = this.props.match.params.id
    if(id!=='0'){
      values.id = id
    }
    // 触发actions
    fetchAddGood(values).then(res=>{
      this.refs.form.setFieldsValue({
        name: '',
        desc: '',
        price: '',
        cate: '',
        img: '',
        hot: false
      })
      this.props.history.goBack()
    })
  }
  //图片上传
  // imgChange(url) {
  //   console.log('文件上传成功', url)
  //   this.setState({imageUrl: url})
  // }
  // //改变品类
  // cateChange(val){
  //   console.log('cate',val)
  //   this.setState({cate:val})
  // }
  // handleChange(){

  // }

  render(){
    let {imageUrl} = this.state
    console.log('detail', this.props.detail)
    let id = this.props.match.params.id
    console.log('imageUrl', imageUrl)
    const layout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 10,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 4,
        span: 16,
      },
    };
    return(
      <div>
        <h1>{id ==='0' ? '商品新增' : '商品编辑'}</h1>
        <Form
          {...layout}
          ref='form'
          name="basic"
          onFinish={this.onFinish.bind(this)}
        >
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              {
                required: true,
                message: '商品名称不符合要求',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label='商品描述'
            name='desc'
            rules={[
              {
                required: true,
                message: '商品描述不符合要求',
              }
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label='商品价格'
            name='price'
            rules={[
              {
                required: true,
                message: '商品价格不符合要求',
              }
            ]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item
            label='商品品类'
            name='cate'
            rules={[
              {
                required: true,
                message: '商品品类不符合要求',
              }
            ]}
          >
            <MyCateSelect/>
          </Form.Item>

          <Form.Item
            label='商品图片'
            name='img'
          >
            <MyUpload/>
          </Form.Item>

          <Form.Item
            label='是否热销'
            name='hot'
            valuePropName='checked'
          >
            <Switch />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              {id === '0' ? '提交' : '修改'}
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapActionToProps)(GoodAdd)