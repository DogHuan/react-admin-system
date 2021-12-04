import React, { Component } from "react";
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import CryptoJS from "crypto-js";
import './index.css'
const key = CryptoJS.enc.Utf8.parse("hPF36*nC&b0yIDNz");
const iv = CryptoJS.enc.Utf8.parse('25sXG$HdoDjNj*J!');

export default class Login extends Component {
  constructor(props) {
    super(props)
    cookie.load()
    this.state = {
      password:window.password,
      username:window.username,
      remember:true
    }
  }

  onFinish = () => {
    fetch("http://30a3e94429.zicp.vip/auth", {
      method: "POST",
      header: new Headers({
        "Content-Type": "application/json;charset=UTF-8",
      }),   
      body:JSON.stringify({
        username:this.state.username,
        password:this.state.password
      })
    }).then(response => response.json()
    ).then((result) => {
      if (result.code ===200) {
        cookie.load(['username','password','role','token'])
        if (cookie?.username) {
          cookie.remove(['username', 'password', 'role', 'token'])
        }
        if (this.state.remember === true) {
          cookie.save({
            username: this.state.username,
            password: this.state.password,
            role: result?.data?.role,
            token: result?.data?.token
          })
        }
        else {
          cookie.remove(['password'])
          cookie.save({
            username: this.state.username,
            role: result?.data?.role,
            token: result?.data?.token
          })
        }
        this.props.history.replace("/mainMenu")
      }
      else {
        message.error("登录失败" + result.msg)
      }
    }).catch(function (error) {
      message.error("登录失败" + error)
    })
  }

  handleCheck=(event)=>{
    this.setState({
      remeber:event.target.checked
    })
  }

  handleName=(e)=>{
    this.setState({
      username:e.target.value
    })
  }

  handleChange=(e)=>{
    cookie.load(['username','password','role','token'])
    if (cookie.password ===this.state.password && cookie.password!==undefined) {
      this.setState({
        password:this.Encrypt(this.state.password)
      })
    } else{
      this.setState({
        password:this.Encrypt(e.target.value)
      })
    }
  }

  Encrypt(word) {
    if (word) {
      let srcs = CryptoJS.enc.Utf8.parse(word);
      let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.ciphertext.toString().toUpperCase();
    }
  }

  Decrypt(word) {
    if (word) {
      let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
      let decrypt = CryptoJS.AES.decrypt(srcs, key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
      let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      return decryptedStr.toString();
    }
  }

  componentDidCatch(){
    if (cookie.token) {
      this.props.history.push("/mainMenu")
    }
  }

  render() {

    return (
      <div className="login">
        <div className="loginForm">
          <Form className="login-form" 
          initialValues={{
            remember:true,
            username:this.state.username,
            password:this.Decrypt(this.state.password)
          }} 
          onFinish={this.onFinish.bind(this)}>
            <Form.Item
              name="username"
              onChange={this.handleName.bind(this)}
              rules={[
                {
                  required: true,
                  message: '请输入你的用户名或账号！',
                },
              ]}
            >
              <Input prefix={<UserOutlined />}
                placeholder="请输入用户名或账号" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入你的密码！',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                onChange={(e)=>this.handleChange(e)}
              />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox
              checked={this.state.remember}
              onChange={(e)=>this.handleCheck(e)}>
                记住密码
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}