import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import logo from '../Image/background-1.jpg'
import { Route, Switch, Link, withRouter, Redirect } from 'react-router-dom'
import { UserOutlined, AppstoreOutlined, BarsOutlined } from "@ant-design/icons";
import UserManage from '../Admin/UserManage/index'
import CommondityManage from '../Admin/CommodityManage'
import FormManage from '../Admin/FormManage/index'
import RichTextEditor from '../Consumer/RichTextManage/index'
import AccountManage from '../Consumer/AccountManage/index'
import Drags from '../Consumer/DragManage/Draggable'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
//一、对函数组件的初步使用以及数据的存储
//1、思考：如何选择存储一级目录和二级目录？怎么去取值？怎么去渲染不同级别目录的页面以及怎么存储的问题。
//1.1、我们对系统要具备的功能进行配置，即需要什么角色，每个角色又拥有多少功能。也就转变为父菜单和子菜单。
// 这里我们借鉴使用对象去存储数据，每个对象以角色去命名，设置key，title等属性，代表一级目录（父菜单）。
// 同时每个对象内部嵌套一个childern孩子数组来存储二级目录（子菜单），设置key，title等属性，component来作为
// 渲染不同页面时的入口，而此刻link作为不同页面渲染时出口存储字符串。
//管理员功能的子菜单以及配置
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
    }, {
      title: "表单管理",
      key: "/MainMenu/Admin/FormManage",
      link: "/MainMenu/Admin/FormManage",
      icon: <BarsOutlined />,
    }, {
      title: "图表管理",
      key: "/MainMenu/Admin/RchartManage",
      link: "/MainMenu/Admin/RchartManage",
      icon: <BarsOutlined />,
    }, {
      title: "轮播图管理",
      key: "/MainMenu/Admin/SlideshowManage",
      link: "/MainMenu/Admin/SlideshowManage",
      icon: <BarsOutlined />,
    }
  ]
}

//普通用户功能对象，后续可以依次添加对应的角色功能模块
const menuUser = {
  title:"用户功能",
  key:"user",
  children:[{
    title:"邮件设置",
    key:"/MainMenu/Consumer/RichTextManage",
    link:"/MainMenu/Consumer/RichTextManage",
    component:RichTextEditor,
  },{
    title:'账号管理',
    key:'/MainMenu/Consumer/AccountManage',
    link:'/MainMenu/Consumer/AccountManage',
    component:AccountManage,
  },{
    title:'拖拽功能',
    key:'/MainMenu/Consumer/DragManage',
    link:'/MainMenu/Consumer/DragManage',
    component:Drags,
  }
 ]
}

//二、使用函数组件，列出菜单变化的事件以及动态识别menu的菜单选项。
const MainMenu = (props) => {
  //注意：Menu为左侧整个菜单栏，而菜单栏里的每一个级目录都统称菜单项
  //SubMenu是每个一级菜单项（父级菜单项），而Menu.Item是二级菜单（即子菜单项）。

  //1、defaultOpenKeys默认菜单项,获取当前地址栏window.location.pathname，去分割得到当前点击菜单项
  //的动态类组件的组件名。
  const defaultOpenKeys = [window.location.pathname.split("/")?.[2]]

  //2、openKeys控制当前SubMenu父级菜单项是否展开，取defaultOpenKeys分割后的字符,保持父级菜单的动态展开。
  //要使函数组件具有状态管理，可以使用钩子函数useState() Hook。
  const [openKeys, setOpenKeys] = useState(defaultOpenKeys)

  //3、然后我们开始给菜单Menu添加回调函数，监听事件的变化。改变openKeys的状态。
  const handleChange =(keys)=>{
    const lastOpenKeys = keys.find(key =>openKeys.indexOf(key)===-1)
    for(var i=0; i<menuList.length; i++){
      if(menuList[i].key===lastOpenKeys){
        return setOpenKeys = (lastOpenKeys ? [lastOpenKeys] : [])
      }
    }
    setOpenKeys = [keys];
  }

  //设置role接收全局变量role角色，以及menuList存储菜单列表项
  const role = window.role
  let menuList = []

  //4、取到角色数组后，通过数组0或1判断role满足哪个角色。

  //4.1、假设以数字0为false，1为true
  //角色判断之后更新menuList数组存储菜单列表。数组role[0]代表管理员，role[1]代表审查员， 
  //role[2]代表普通用户，紧接着依次添加角色。当角色为true更新menuList，push菜单对象。
  role?.[0] ==='1' && menuList.push(menuAdmin,menuUser)
  role?.[1] ==='1' && menuList.push(menuUser)

  //4.2、defaultSelectedKeys初始被选中的菜单项，设置为路由link的值。
  const defaultSelectedKeys = [window.location.pathname]
  //4.3、defaultRoute初始选中菜单的路由，这里取menuList列表第一个孩子节点的第一个link值
  const defaultRoute = menuList?.[0]?.children?.[0]?.link

  //测试数据
  let CmenuList = []
  const CdefaultSelectedKeys = ''
  const CopenKeys = CmenuList?.[0]?.children[0]
  CmenuList.push(menuAdmin,menuUser)
  const CdefaultRoute = CmenuList?.[0]?.children?.[0]?.link

  return (
    //三、整体使用layout布局大框架包裹其他两个layout,
    //网页的整个页面三个部分Header(头部导航栏),Sider(左侧菜单栏),Content(中间内容),Footer(底部内容)

    <Layout style={{ minHeight: '100vh' }}>
      {/* 1、头部导航栏的设置和logo图标的添加，后期可以在这里维护退出登录和个人信息修改 */}
      <Header className="header">
      {/* 1.2、头部导航栏的设计，增加图片logo，设置背景色，宽度和个人信息logo等样式 */}
        <div className="left-nav-header header-logo">
          <Link to="/mainMenu">
            <img className="logo-img" src={logo} alt=""
              style={{ width: 40, height: 40 , borderRadius:"50%"}} />
          </Link>
        </div>
      </Header>
      {/* 2、设置左侧导航栏菜单，首先包裹大的layout，设置宽高等样式。
      添加Sider侧边栏组件，然后添加Meun菜单组件。*/}
      <Layout className="layout-main">
        <Sider className="layout-sider">
        {/*2.1、 Menu中设置默认选择的菜单项属性defaultSelectedKeys以及
        设置菜单项展开属性openKeys，添加监听事件。*/}
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={CdefaultSelectedKeys}
            openKeys={CopenKeys} 
            onChange={handleChange}>
            {
              // 2.2、遍历menuList里item对象属性,即管理员或用户的数据值，
              //一级目录（父菜单）SubMenu的title和key
              CmenuList?.map((item) => (
                <SubMenu
                  key={item.key}
                  icon={item.icon}
                  title={item.title}
                >
                  {/*2.3、 遍历父级菜单选项中的childern数组，为Menu.item二级目录（子菜单）列表中
                  设置key，title以及路由Link的出口*/}
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
          {/* 3、设置layout的中间件即中间内容Content组件用来包裹渲染不同菜单选项的页面 */}
          <Content className="layout-content">
            <Switch>
            {/* 3.1、Content渲染不同的菜单选项数据需要根据Route不同的路由入口来配置path，component路径 */}
              {
                CmenuList?.map(item =>
                  item?.children?.map(subItem =>
                    <Route
                      path={subItem.link}
                      component={subItem.component}
                    />
                  ))
              }
              {/* 3.2、进入系统内部默认路由出口为mainMenu */}
              <Redirect to={CdefaultRoute || '/mainMenu'} />
            </Switch>
          </Content>
          <Footer className="layout-footer" style={{margin:"auto"}}>Copyright © 2021</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
export default withRouter(MainMenu)