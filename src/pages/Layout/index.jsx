import { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { useStore } from '@/store'
import { Layout, Menu, message, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'

const { Header, Sider } = Layout

function GeekLayout() {
  const navigate = useNavigate()
  const { pathname: selectedKey } = useLocation()
  const { userStore, loginStore } = useStore()
  useEffect(() => {
    userStore.getUserInfo()
  }, [userStore])

  const confirm = () => {
    // 退出登录 删除token 跳回到登录
    loginStore.loginOut()
    navigate('/login')
    message.warn('退出登录！', 2)
  }

  const cancel = () => {
    message.warn('您取消了该操作！', 2)
  }

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
              onConfirm={confirm}
              onCancel={cancel}
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[selectedKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/home" onClick={() => navigate('home')}>
              数据概览
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/article" onClick={() => navigate('article')}>
              内容管理
            </Menu.Item>
            <Menu.Item icon={<EditOutlined />} key="/publish" onClick={() => navigate('publish')}>
              发布文章
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}><Outlet /></Layout>
      </Layout>
    </Layout>
  )
}

export default observer(GeekLayout)