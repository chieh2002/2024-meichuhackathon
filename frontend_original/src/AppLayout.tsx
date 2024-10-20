import React from 'react'
import { UserOutlined, FormOutlined } from '@ant-design/icons'
import { Layout, Menu, MenuProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const { Content, Footer, Sider } = Layout

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'fixed',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  paddingTop: 24,
  scrollbarWidth: 'thin',
  scrollbarColor: 'unset',
  
}

const items = [
  {
    icon: <FormOutlined />,
    label: 'TechBoard',
    link: '/'
  },
  {
    icon: <FormOutlined />,
    label: 'TechBoard',
    link: '/about-me'
  },
  {
    icon: <FormOutlined />,
    label: 'TechBoard',
    link: '/about-me'
  },
  {
    icon: <FormOutlined />,
    label: 'TechBoardss',
    link: '/about-me'
  },
  {
    icon: <UserOutlined />,
    label: 'About Me',
    link: '/about-me'
  }
]

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const menuItems: MenuProps['items'] = items.map((item) => ({
    key: item.link,
    icon: item.icon,
    label: <Link to={item.link}>{item.label}</Link>
  }))
  return (
    <Layout hasSider>
      <Sider style={siderStyle} collapsible>
        <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]} items={menuItems} />
      </Sider>
      <Layout style={{ marginInlineStart: 200 }}>
        <Content style={{ margin: '24px 16px 0' }}>{children}</Content>
        <Footer style={{ textAlign: 'center' }}>
          Message Board Project ©{new Date().getFullYear()} Created by Yubin
        </Footer>
      </Layout>
    </Layout>
  )
}

export default AppLayout
