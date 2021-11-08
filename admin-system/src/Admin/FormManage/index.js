import React, { Component } from "react";
import { Form, Input, InputNumber, Button,message } from 'antd';
export default class FormManage extends Component {
  formRef =React.createRef();

  handleSubmit=()=>{
    const formData = this.formRef.current.getFieldsValue([
      'Name','Email','password','rePassword','Age',
      'Website','Introduction'
    ])
    //1、设置响应地址，方法，请求头，请求体body的JSON格式
    fetch('url',{
      method:"POST",
      headers:{
        contentType:'application/json',
      },
      body:JSON.stringify(formData)
    }).then((response)=>response.json(
    //2、设置对请求结果的处理
    )).then((result)=>{
      if(result.code===200){
        message.success('提交成功')
      }else{
        message.error("设置失败"+result.msg)
      }
    }).catch(function(error){
      message.error("提交失败"+error)
    })
  }

  handleReset=()=>{
    this.formRef.current.resetFields()
  }
  
  render() {
    return (
      <Form style={{ marginTop: 20 }} ref={this.formRef}
        labelCol={{ span: 3 }} wrapperCol={{ span: 8 }}>
        <Form.Item
          name="Name"
          label="姓名"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Email"
          label="邮箱"
          rules={[
            {
              type: 'email',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="输入原密码"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
          </Form.Item>
          <Form.Item
          name="rePassword"
          label="确认密码"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input.Password />
          </Form.Item>
        <Form.Item
          name="Age"
          label="年龄"
          rules={[
            {
              type: 'number',
              min: 0,
              max: 99,
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="Website" label="网址">
          <Input />
        </Form.Item>
        <Form.Item name="Introduction" label="简介">
          <Input.TextArea />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 3, span: 8 }}>
          <Button htmlType="submit" style={{marginRight:10}}
          onClick={this.handleReset}>
            重置
          </Button>
          <Button type="primary" htmlType="submit"
          onClick={this.handleSubmit}>
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  };
}