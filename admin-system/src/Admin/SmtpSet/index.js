import React, { Component } from "react";
import { Form, Input, InputNumber,Checkbox, Button } from 'antd'

export default class Smtp extends Component {
    constructor(props) {
        super(props)
    }
    formRef = React.createRef()
    render() {
        return (
            <div>
                <Form style={{marginTop:20}} labelCol={{span:3}}
                wrapperCol={{span:10}} ref={this.formRef}>
                    <Form.Item
                        name="address"
                        label="地址">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="smtp_port"
                        label="端口"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <InputNumber style={{width:"100%"}}/>
                    </Form.Item>
                    <Form.Item
                        name="sender"
                        label="发送账号"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="s_password"
                        label="密码"
                        extra="提示：一些邮件提供商需要输入的是Token"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        name="send"
                        label="发送账号"
                        extra="提示：发送邮件账号，默认使用SMTP账号作为发送账号"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="recipient_list"
                        label="收件人"
                        extra="提示：仅用来作为测试邮件收件人"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="is_ssl"
                        label="SSL"
                        valuePropName="checked"
                    >
                        <Checkbox
                            style={{
                                marginTop: 5,
                            }}>
                            <p
                                style={{
                                    color: "rgba(0, 0, 0, 0.45)"
                                }}>
                                提示：如果是SMTP接口是465，通常需要启用SSL
                            </p>
                        </Checkbox>
                    </Form.Item>
                    <Form.Item>
                        <Button
                        onClick={this.onReset}>重置</Button>
                        <Button
                        onClick={this.handleTest}>测试</Button>
                        <Button
                        onClick={this.handleSumit}>设置</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}