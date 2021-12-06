import './App.css';
import { Route, Switch, Redirect, withRouter, BrowserRouter } from 'react-router-dom'
import Login from './Login/index';
import Base64 from 'base-64';
import MainMenu from './MainMenu/index';
import cookie from 'react-cookies';

const App = (props) => {

  const parseTokenGetUser = (jwtTokenString) => {
    let base64Url = jwtTokenString.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    try {
      return JSON.parse(Base64.decode(base64))
    } catch (e) {
      console.log(e);
    }
  }
  const querys = new URLSearchParams(props.location.search?.slice(1))
  const token = querys.get("token")
  if (token) {
    const tokenGetContext = parseTokenGetUser(token)
    cookie.load(['username','password','role','token'])
    if (tokenGetContext?.username === cookie.username) {
      props.history.replace(props.location.pathname)
    } else {
      cookie.remove(['username', 'password', 'role', 'token'])
      cookie.save({
        username: tokenGetContext?.username,
        token: token,
        role: tokenGetContext?.role
      })
      props.history.replace(props.location.pathname)
    }
  } else if (!window.username || !window.role) {
    if (props.location.pathname !== '/login') {
      cookie.load()
      if (!window.username || !window.role) {
        props.history.replace('/login')
      }
    }
  }

  return (
    //二、设置默认路由的两种方式
    // 方法1、再次添加Route组件，path="/"，component值设置为默认页面的className或者函数名
    // 然后设置exact属性
    // 方法2、添加Redirect组件，path="/"，to值设置为默认页面的className或者函数名
    // 方法2用 Redirect 会重定向url，推荐方法1。
    <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login}></Route>
      <Route path="/mainMenu" component={MainMenu}></Route>
      <Redirect to="/login" />
    </Switch>
    </BrowserRouter>
  );
}

export default withRouter(App);
