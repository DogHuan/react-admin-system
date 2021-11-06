import React, { Component } from "react";
import { Button, Form, Input} from "antd";
const { TextArea } = Input;
export default class Ldap extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Form
                style={{
                    marginTop:20
                }}
                labelCol={{
                    span:3
                }}
                wrapperCol={{
                    span:10
                }}>
                    <Form.Item
                        name="ip"
                        label="ip地址"
                        rules={[
                            {
                                required: true
                            }
                        ]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="dn"
                        label="DN">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="port"
                        label="端口">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="密码">
                        <Input.Password placeholder="请输入密码" />
                    </Form.Item>
                    <Form.Item
                        name="ou"
                        label="OU"
                        extra="使用|分隔OU"
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        name="filters"
                        label="过滤器"
                        extra="可能的选项是(cn或uid或sAMAccountName=%(user)s)"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="mapping"
                        label="映射"
                        extra="用户属性映射代表怎样将LDAP中用户属性映射到umpserver用户上，
                        username，name，email是jumpserver的属性"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                    labelCol={{
                        offset:3,
                        span:8
                    }}>
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