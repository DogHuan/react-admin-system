import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './Login/index'

ReactDOM.render(
  <BrowserRouter>
  {/* <App /> */}
  <Login />
  </BrowserRouter>,   
  document.getElementById('root')
);
