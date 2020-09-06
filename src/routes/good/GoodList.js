import React from 'react'
import { connect } from 'react-redux'
import {MyCateSelect} from '@/components'
import {getGoddList} from '@/store/actions/goodAction'
import {fetchDelGood} from '@/utils/api'
import {toDate} from '@/utils/date'
import { 
  Row, 
  Col, 
  DatePicker,
  Table, 
  Button,
  Modal 
 } from 'antd';
 import './style.scss' 
const { RangePicker } = DatePicker;
function mapStateToProps(store) {
  return {
    goodList:store.good.goodList,
    total:store.good.total
  }
}

function mapActionToProps(dispatch){
  return{
    getList:(params)=>dispatch(getGoddList(params))
  }
}

class GoodList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      show:false,
      curRow:null,
      filter:{
        cate:'',
        hot:false,
        page:1,
        size:3
      }
    }
  }
  componentDidMount(){
    let {filter} = this.state
    this.props.getList(filter)
  }
  //更新filter
  updateFilter(key,val){
    let {filter} = this.state
    if(key !== 'page'){
      filter.page = 1
    }
    filter[key] = val
    this.setState({filter})
    //触发调接口
    this.props.getList(filter)
  }
  //品类变化
  cateFilter(val){
    this.updateFilter('cate',val)
  }
  //日期变化
  // dateFilter(e){
  //   let endTime = e[1].valueOf()
  // }
  //控制分页
  pageFilter(page){
    this.updateFilter('page',page)
  }
  //显示删除的警告框
  showModel(row){
    this.setState({show:true,curRow:row})
  }
  //编辑
  skipToEdit(row){
    this.props.history.push('/good/add/'+row._id)
  }
  //关闭删除框警告框
  handleCancel(){
    this.setState({show:false})
  }
  //确定删除
  handleOk(){
    fetchDelGood({id:this.state.curRow._id}).then(()=>{
      //触发列表刷新
      if(this.props.goodList.length===1){
        console.log("aaa")
        // let page = this.state.filter.page
        let { filter } = this.state
        filter.page--
        this.setState(filter)
      }
      this.props.getList(this.state.filter)
      this.setState({show:false})
    })
  }
  //新增
  GoodAdd(){
    this.props.history.push('/good/add/0')
  }
  render(){
    let { filter ,show} = this.state
    let {goodList,total} = this.props
    console.log('goodList',goodList)
    console.log('total',total)
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        align:'center',
      },
      {
        title: '商品描述',
        dataIndex: 'desc',
        key: 'desc',
        align:'center',
        width:100
      },
      {
        title: '商品价格',
        dataIndex: 'price',
        key: 'price',
        align:'center',
        render:(text)=>(
          <div>
            {'￥'+text+'元'}
          </div>
        )
      },
      {
        title: '商品品类',
        key: 'cate',
        dataIndex: 'cate',
        align:'center',
        
      },
      {
        title: '商品图片',
        key: 'img',
        dataIndex: 'img',
        align:'center',
        render:(text,row,index)=>(
          <div className='row-first'>
            <img className='row-img' src={row.img} alt='hi'/>
          </div>
        )
      },
      {
        title: '是否热销',
        key: 'hot',
        dataIndex: 'hot',
        width:140,
        align:'center',
        render:(text)=>(
          <div>
            {text ? '是' : '否'}
          </div>
        )
      },
      {
        title:'上架时间',
        key:'create_time',
        dataIndex:'create_time',
        align:'center',
        width:140,
        render:(text)=>(
          <div>
            {toDate(text)}
          </div>
        )
      },
      {
        title: '操作',
        key: 'action',
        align:'center',
        width:200,
        render: (text,row, index) => (
          <div className='btn'>
            <Button onClick={this.skipToEdit.bind(this,row)}>编辑</Button>
            <Button danger onClick={this.showModel.bind(this,row)}>删除</Button>
          </div>
        ),
      },
    ];
    
    return(
      <div>
        <h1>商品列表</h1>
        <Row align='middle'>
          <Col span={3}><span>品类筛选:</span></Col>
          <Col span={6}>
            <MyCateSelect value={filter.cate} onChange={this.cateFilter.bind(this)}/>
          </Col>
          <Col span={3}><span>日期筛选:</span></Col>
          <Col span={8}>
             <RangePicker showTime />
          </Col>
          <Col span={2} offset={2}>
            <Button onClick={this.GoodAdd.bind(this)}>新增</Button>
          </Col>
        </Row>
        <div className='good-table'>
          <Table 
            rowKey='_id'
            columns={columns} 
            dataSource={goodList} 
            pagination={{
              total,
              pageSize:3,
              onChange:this.pageFilter.bind(this),
              current:filter.page
            }}
          />
        </div>
        <Modal
          title="警告"
          visible={show}
          onOk={this.handleOk.bind(this)}
          onCancel={this.handleCancel.bind(this)}
        >
          <p>你确定要删除这条商品?</p>
        </Modal>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapActionToProps)(GoodList)