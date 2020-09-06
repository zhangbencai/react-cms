import React from 'react'
import {connect} from 'react-redux'
import {Select} from 'antd'
import {getCates} from '@/store/actions/goodAction'
const { Option } = Select;

function mapStateToProps(store){
  return{
    cates:store.good.cates
  }
}

function mapActionToProps(dispatch){
  return{
    getCates:(params)=>dispatch(getCates(params))
  }
}

class MyCateSelect extends React.Component{
  componentDidMount(){
    this.props.getCates({})
  }
  createOptions(){
    let {cates} = this.props
    return cates.map(ele=>(
    <Option key={ele._id} value={ele.cate}>{ele.cate_zh}</Option>
    ))
  }
  render(){
    return(
      <Select 
        style={{ width: 120 }} 
        value={this.props.value}
        allowClear
        onChange={(val)=>this.props.onChange(val)}
      >
        {this.createOptions()}
      </Select>
    )
  }
}

export default connect(mapStateToProps,mapActionToProps)(MyCateSelect)