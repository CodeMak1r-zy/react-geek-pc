import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useStore } from '@/store'
import { observer } from 'mobx-react-lite'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './index.scss'
import { http } from '@/utils'

const { Option } = Select

const Publish = () => {
  // 点击编辑文章后获取文章ID
  const [search] = useSearchParams()
  const id = search.get('id')
  // 频道数据store
  const { channelStore } = useStore()
  // 存放上传图片的列表
  const [fileList, setFileList] = useState([])
  // 使用useRef声明一个暂存仓库
  const cacheImgList = useRef()
  // 上传组件的onchange回调
  const onUploadChange = ({ fileList }) => {
    // console.log(fileList)
    // 格式化fileList数据
    const formatFileList = fileList.map(file => {
      if (file.response) {
        return {
          url: file.response.data.url
        }
      }
      // 在上传中时，不做处理
      return file
    })
    // console.log(formatFileList)
    setFileList(formatFileList)
    // 同时把图片列表存入仓库一份
    cacheImgList.current = formatFileList
    // console.log('current', cacheImgList.current)
  }
  // 单图1、三图3、无图0 状态
  const [imgCount, setImgCount] = useState(1)
  // 切换图片状态
  const radioChange = (e) => {
    setImgCount(e.target.value)
  }
  // 使用useEffect拿到最新的imgCount（异步)
  useEffect(() => {
    // 从仓库里取对应的图片数量，交给我们用来渲染图片列表的fileList
    // 通过调用setFileList
    if (imgCount === 1) {
      setFileList(cacheImgList.current ? [cacheImgList.current[0]] : [])
    } else if (imgCount === 3) {
      setFileList(cacheImgList.current)
    } else if (imgCount === 0) {
      setFileList([])
    }
  }, [imgCount])

  const navigate = useNavigate()
  // 发布文章表单提交事件
  const submitFinish = async values => {
    // 数据的二次处理 重点是处理cover字段
    const { channel_id, content, title, type } = values
    const params = {
      channel_id,
      content,
      title,
      type,
      cover: {
        type,
        images: fileList.map(item => item.url)
      }
    }
    // console.log(params)
    try {
      if (!id) {
        await http.post('/mp/articles?draft=false', params)
        message.success('发布文章成功！', 2)
      } else {
        await http.put(`/mp/articles/${id}?draft=false`, params)
        message.success('更新文章成功！', 2)
        navigate('/article')
      }
      // 发布文章成功后，重置表单数据
      form.current.resetFields(['title', 'channel_id', 'type', 'content'])
      setImgCount(1)
      setFileList([])
    } catch (error) {
      console.log(error)
      message.error(`${id ? '更新' : '发布'}文章失败！请重新检查各配置项`, 2)
    }
  }

  // 编辑文章功能
  const form = useRef()
  useEffect(() => {
    if (id) {
      const getArticle = async () => {
        const res = await http.get(`/mp/articles/${id}`)
        console.log(res)
        const { cover } = res.data
        form.current.setFieldsValue(res.data)
        form.current.setFieldValue('type', cover.type)
        setImgCount(cover.type)
        setFileList(cover.images.map(url => ({ url })))
        // 暂存列表里也存一份
        cacheImgList.current = cover.images.map(url => ({ url }))
      }
      getArticle()
    }
  }, [id])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb separator=">">
            <Breadcrumb.Item>
              <Link to="/home">首页</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{id ? '编辑文章' : '发布文章'}</Breadcrumb.Item>
          </Breadcrumb>
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={submitFinish}
          ref={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {
                channelStore.channelList.map((channelObj) => {
                  return <Option value={channelObj.id} key={channelObj.id}>{channelObj.name}</Option>
                })
              }
            </Select>
          </Form.Item>

          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={radioChange}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>
            {imgCount > 0 && (
              <Upload
                name="image"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList
                action="http://geek.itheima.net/v1_0/upload"
                fileList={fileList}
                onChange={onUploadChange}
                multiple={imgCount > 1}
                maxCount={imgCount}>
                <div style={{ marginTop: 8 }}>
                  <PlusOutlined />
                </div>
              </Upload>
            )}
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}>
            <ReactQuill className='publish-quill' theme='snow' placeholder='请输入文章内容...'></ReactQuill>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {id ? '更新文章' : '发布文章'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default observer(Publish)