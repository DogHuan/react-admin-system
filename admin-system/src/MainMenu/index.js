import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import logo from '../Image/background-1.jpg'
import { Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'
import cookie from 'react-cookies'
import { UserOutlined, AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import UserManage from '../Admin/UserManage/index'
import CommondityManage from '../Admin/CommodityManage'
import FormManage from '../Admin/FormManage/index'
import RichTextEditor from '../Consumer/RichTextManage/index'
import AccountManage from '../Consumer/AccountManage/index'
import Drags from '../Consumer/DragManage/Draggable'
import Ldap from '../Admin/LdapSet';
import Smtp from '../Admin/SmtpSet';
import Project from '../Admin/ProjectManage';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const menuAdmin = {
  title: "管理员功能",
  key: "admin",
  icon: <AppstoreOutlined />,
  children: [
    {
      title: "用户管理",
      key: "/mainMenu/Admin/UserManage",
      link: "/mainMenu/Admin/UserManage",
      icon: <BarsOutlined />,
      component: UserManage,
    }, {
      title: "商品管理",
      key: "/mainMenu/Admin/CommondityManage",
      link: "/mainMenu/Admin/CommondityManage",
      icon: <BarsOutlined />,
      component: CommondityManage,
    }, {
      title: "LDAP设置",
      key: "/mainMenu/Admin/LdapSet",
      link: "/mainMenu/Admin/LdapSet",
      icon: <BarsOutlined />,
      component: Ldap,
    }, {
      title: "表单管理",
      key: "/mainMenu/Admin/FormManage",
      link: "/mainMenu/Admin/FormManage",
      icon: <BarsOutlined />,
      component: FormManage,
    }, {
      title: "SMTP设置",
      key: "/mainMenu/Admin/SmtpSet",
      link: "/mainMenu/Admin/SmtpSet",
      icon: <BarsOutlined />,
      component: Smtp,
    }, {
      title: "轮播图管理",
      key: "/mainMenu/Admin/SlideshowManage",
      link: "/mainMenu/Admin/SlideshowManage",
      icon: <BarsOutlined />,
    }, {
      title: "项目管理",
      key: "/mainMenu/Admin/ProjectManage",
      link: "/mainMenu/Admin/ProjectManage",
      icon: <BarsOutlined />,
      component:Project
    }
  ]
}

const menuUser = {
  title:"用户功能",
  key:"user",
  children:[{
    title:"邮件设置",
    key:"/mainMenu/Consumer/RichTextManage",
    link:"/mainMenu/Consumer/RichTextManage",
    component:RichTextEditor,
  },{
    title:'账号管理',
    key:'/mainMenu/Consumer/AccountManage',
    link:'/mainMenu/Consumer/AccountManage',
    component:AccountManage,
  },{
    title:'拖拽功能',
    key:'/mainMenu/Consumer/DragManage',
    link:'/mainMenu/Consumer/DragManage',
    component:Drags,
  }
 ]
}

const MainMenu = (props) => {
  const defaultOpenKeys = [window.location.pathname.split("/")?.[2]]
  const [openKeys, setOpenKeys] = React.useState(defaultOpenKeys)
  const handleChange=(keys)=>{
    const lastOpenKeys = keys.find(key =>openKeys.indexOf(key)===-1)
    for(var i=0; i<menuList.length; i++){
      if(menuList[i].key===lastOpenKeys){
        return setOpenKeys = (lastOpenKeys ? [lastOpenKeys] : [])
      }
    }
    setOpenKeys = [keys];
  }
  const role = window.role
  let menuList = []
  role?.[0] ==='1' && menuList.push(menuAdmin, menuUser)
  const defaultSelectedKeys = [window.location.pathname]
  const defaultRoute = menuList?.[0]?.children?.[0]?.link


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div className="left-nav-header header-logo">
          <Link to="/mainMenu">
            <img className="logo-img" src={logo} alt=""
              style={{ width: 40, height: 40 , borderRadius:"50%"}} />
          </Link>
        </div>
        <Dropdown overlay={
          <Menu>
            <Menu.Item
            key="0"
            onClick={()=>{
              cookie.remove(['role','token'])
              props.history.replace('/login')
            }}
            >
              退出登录
            </Menu.Item>
          </Menu>
        }>
          <Avatar
              className="avatar"
              icon={<UserOutlined />}
              onClick={e => e.preventDefault()}
          />
        </Dropdown>
        <span className="avatarName">
          欢迎{window.username}
        </span>
      </Header>
      <Layout className="layout-main">
        <Sider className="layout-sider">
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={defaultSelectedKeys}
            openKeys={openKeys} 
            onChange={handleChange}>
            {
              menuList?.map((item) => (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                >
                  {
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
          <Content className="layout-content">
            <Switch>
              {
                menuList?.map(item =>
                  item?.children?.map(subItem =>
                    <Route
                      path={subItem.link}
                      component={subItem.component}
                    />
                  ))
              }
              {/* 3.2、进入系统内部默认路由出口为mainMenu */}
              <Redirect to={defaultRoute || '/mainMenu'} />
            </Switch>
          </Content>
          <Footer className="layout-footer" style={{margin:"auto"}}>Copyright © 2021</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default withRouter(MainMenu)