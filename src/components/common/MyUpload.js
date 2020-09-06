import React from 'react'
import img from '@/utils/img'
import { Upload} from 'antd'

const MyUpload = (props)=>{
  const onChange = (e)=>{
    console.log('e',e)
    if(e.file && e.file.response && e.file.response.data) {
      const url = 'http://localhost:3000'+ e.file.response.data.url

      // 对后端响应数据进行过滤
      props.onChange(url)
    }
  }
  return(
    <Upload
      name="file"
      action={img.uploadUrl+'/api/v1/upload/img'}
      multiple={false}
      listType="picture-card"
      className="avatar-uploader"
      onChange={onChange}
      showUploadList={false}
    >
      <img src={props.value||img.uploadIcon} style={{width:'100%'}} alt="avatar" />
    </Upload>
  )
}
export default MyUpload