import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from '../Image/background-1.jpg'
import { Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'
import { UserOutlined, AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import UserManage from '../Admin/UserManage/index'
import CommondityManage from '../Admin/CommodityManage'
import FormManage from '../Admin/FormManage/index'
import ChartManage from '../Admin/ChartManage/index'
import Recharts from '../Admin/RchartManage/Recharts'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
//一、对函数组件的初步使用以及数据的存储
//1、思考：这里我们一级目录和二级目录怎么去存储？怎么去取值？怎么去渲染不同级别目录的页面以及怎么存储的问题。
//1.1、我们对系统要具备的功能进行配置，即需要什么角色，每个角色又拥有多少功能。也就转变为父菜单和子菜单。
// 这里我们借鉴使用对象去存储数据，每个对象以角色去命名，设置key，title等属性，代表一级目录（父菜单）。
// 同时每个对象内部嵌套一个childern孩子数组来存储二级目录（子菜单），设置key，title等属性，component来作为
// 渲染不同页面时的入口，而此刻link作为不同页面渲染时出口存储字符串。
const menuAdmin = {
  title: "管理员功能",
  key: "admin",
  icon: <AppstoreOutlined />,
  children: [
    {
      title: "用户管理",
      key: "/MainMenu/Admin/UserManage",
      link: "/MainMenu/Admin/UserManage",
      icon: <BarsOutlined />,
      component: UserManage,
    }, {
      title: "商品管理",
      key: "/MainMenu/Admin/CommondityManage",
      link: "/MainMenu/Admin/CommondityManage",
      icon: <BarsOutlined />,
      component: CommondityManage,
    }, {
      title: "图型管理",
      key: "/MainMenu/Admin/ChartManage",
      link: "/MainMenu/Admin/ChartManage",
      icon: <BarsOutlined />,
      component: ChartManage,
    }, {
      title: "表单管理",
      key: "/MainMenu/Admin/FormManage",
      link: "/MainMenu/Admin/FormManage",
      icon: <BarsOutlined />,
      component: FormManage,
    }, {
      title: "图表管理",
      key: "/MainMenu/Admin/RchartManage",
      link: "/MainMenu/Admin/RchartManage",
      icon: <BarsOutlined />,
      component: Recharts,
    }, {
      title: "SMTP设置",
      key: "/main/admin/smtp",
      link: "/main/admin/smtp",
      icon: <BarsOutlined />,
      component: UserManage,
    }, {
      title: "SQS设置",
      key: "/main/admin/sqs",
      link: "/main/admin/sqs",
      icon: <BarsOutlined />,
      component: UserManage,
    },
  ]
}
const MainMenu = (props) => {
  let menuList = []
  const defaultSelectedKeys = ''
  const openKeys = menuList?.[0]?.children[0]
  menuList.push(menuAdmin)
  const defaultRoute = menuList?.[0]?.children?.[0]?.link
  return (
    //二、整体使用layout布局大框架包裹网页的整个页面
    <Layout style={{ minHeight: '100vh' }}>
      {/* 1、头部导航栏的设置和logo图标的添加，后期可以在这里维护退出登录和个人信息修改 */}
      <Header className="header">
      {/* 1.2、头部导航栏的设计，增加图片logo，设置背景色，宽度和个人信息logo等样式 */}
        <div className="left-nav-header header-logo">
          <Link to="/mainMenu">
            <img className="logo-img" src={logo} alt=""
              style={{ width: 40, height: 40 }} />
          </Link>
        </div>
      </Header>
      {/* 2、设置左侧导航栏菜单，首先包裹大的layout，设置宽高等样式。
      添加Sider侧边栏组件，然后添加Meun菜单组件。*/}
      <Layout className="layout-main">
        <Sider className="layout-sider">
        {/*2.1、 Menu中设置defaultSelectedKeys初始化选中的菜单项key数组以及
        openKeys当前展开的SubMenu菜单项key数组，为SubMenu菜单父列表添加key，title */}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            openKeys={openKeys} >
            {
              menuList?.map(item => console.log("item", item)),
              menuList?.map((item) => (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                >
          {/*2.2、 Menu.item菜单子列表中设置key，title以及路由Link的出口*/}
                  {
                    item?.children?.map(e => console.log("e.title", e.title)),
                    item?.children?.map((e) => (
                      <Menu.Item key={e.link} icon={e.icon}>
                        <Link to={e.link}>{e.title}</Link>
                      </Menu.Item>
                    ))
                  }
                </SubMenu>
              ))
            }
          </Menu>
        </Sider>
        <Layout>
          {/* 3、设置layout的中间件即中间内容Content组件用来包裹渲染不同菜单选项的页面 */}
          <Content className="layout-content">
            <Switch>
            {/* 3.1、Content渲染不同的菜单选项数据需要根据Route不同的路由入口来配置path，component路径 */}
              {
                menuList?.map(item =>
                  item?.children?.map(subItem =>
                    <Route
                      path={subItem.link}
                      component={subItem.component}
                    />
                  ))
              }
              {/* 3.2、进入系统内部默认路由出口为mainAdmin */}
              <Redirect to={defaultRoute || '/mainAdmin'} />
            </Switch>
          </Content>
          <Footer className="layout-footer" style={{margin:"auto"}}>Copyright © 2021</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default withRouter(MainMenu)