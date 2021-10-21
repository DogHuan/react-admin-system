import React, { Component } from "react";
import { Form, Input, InputNumber, Button } from 'antd';
export default class FormManage extends Component {
  constructor(props) {
    super(props)
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
          <Button htmlType="submit" style={{marginRight:10}}>
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  };
}