import React,{Component} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from '../Image/background-1.jpg'
import { Route, Switch, Link } from 'react-router-dom'
import {
  DesktopOutlined, PieChartOutlined, FileOutlined, TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

export default class MainMeun extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (   
      <Layout style={{ minHeight: '100vh' }}>
        {/* 头部导航栏的设置和logo图标的添加，后期可以在这里维护退出登录和个人信息修改 */}
        <Header className="header">
          <div className="left-nav-header header-logo">
            <Link to="/mainMeun">
              <img className="logo-img" src={logo} alt="" 
              style={{width:40,height:40}}/>
            </Link>
          </div>
        </Header>
        <Layout className="layout-main">
          <Sider className="layout-sider">
            <Menu 
                theme="dark"  
                mode="inline"
                defaultSelectedKeys={defaultSelectedKeys}
                openKeys={openKeys} >

            </Menu>
          </Sider>
        </Layout>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>    
    );
  }
}
{/* <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
        <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" >
            <Menu.Item key="1" icon={<PieChartOutlined />} style={{
              height:64,
              margin:0
            }}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />} style={{
              height:64,
              margin:0
            }}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
         
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
             
            </div>
          </Content> */}