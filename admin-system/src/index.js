import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, } from 'react-router-dom'
import './index.css';
import App from './App';
//为index入口配置BrowerRouter路由，这样每个页面都能匹配到路由设置
ReactDOM.render(
  <BrowserRouter>
  <App />
  </BrowserRouter>,   
  document.getElementById('root')
);
