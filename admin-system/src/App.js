import './App.css';
import { Route, Switch } from 'react-router-dom'
import Login from './Login/index'

// 一、函数组件的声明方式有两种：
// 1、function + 函数名   2、const + 函数名=(props)=>
const App = (props) => {
  return (
    //二、设置默认路由的两种方式
    // 1、再次添加Route组件，path="/"，component值设置为默认页面的className或者函数名
    // 然后设置exact属性
    // 2、添加Redirect组件，path="/"，to值设置为默认页面的className或者函数名
    // 方法2用 Redirect 会重定向url，推荐方法1。
    <Switch>
      {/* 此刻页面路由就会自定义为Login登录页面了 */}
      <Route path="/" component={Login} exact></Route>
      <Route path="/login" component={Login}></Route>
    </Switch>
  );
}

export default App;
