import React, { Component } from "react";
import { Form, Input, InputNumber,Checkbox, Button, message } from 'antd'

export default class Smtp extends Component {

    formRef = React.createRef()

    handleSumit=()=>{
        const formData = this.formRef.current.getFieldsValue([
            'address','smtp_port','sender','s_password','send',
            'recipient_list','is_ssl'
        ])
        fetch("url",{
            method:"POST",
            header:{
                contentType: 'application/json',
              },
            body:JSON.stringify({
                address:formData.address,
                smtp_port:formData.smtp_port,
                sender:formData.sender,
                s_password:formData.s_password,
                send:formData.send,
                recipient_list:formData.recipient_list,
                is_ssl:formData.is_ssl
            })
        }).then(response=>response.json(
        )).then(result =>{
            if (result.code===200) {
                message.success("修改成功")
                this.fetchData()
            } else{
                message.error("修改失败"+result.msg)
            }
        }).catch(function(error){
            message.error("修改失败"+error)
        })
    }

    handleTest=()=>{
        const formData = this.formRef.current.getFieldsValue([
            'address','smtp_port','sender','s_password','send',
            'recipient_list','is_ssl'
        ])
        fetch("url",{
            method:"PUT",
            header:{
                contentType: 'application/json',
              },
            body:JSON.stringify({
                address:formData.address,
                smtp_port:formData.smtp_port,
                sender:formData.sender,
                s_password:formData.s_password,
                send:formData.send,
                recipient_list:formData.recipient_list,
                is_ssl:formData.is_ssl
            })
        }).then(response =>response.json(
        )).then(result =>{
            if (result.code===200) {
                message.success("修改成功")
                this.fetchData()
            } else{
                message.error("修改失败"+result.msg)
            }
        }).catch(function(error){
            message.error("修改失败"+error)
        })
    }

    fetchData=()=>{
        fetch("url"
        ).then(response =>response.json()
        ).then(result =>{
            this.formRef.current.setFieldsValue(result.data)
        }).catch(function(error){
            message.error("获取失败"+error)
        })
    }

    // componentDidMount(){
    //     this.fetchData()
    // }
    
    render() {
        return (
            <div>
                <Form 
                style={{marginTop:20}} labelCol={{span:3}}
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
                    <Form.Item
                    wrapperCol={{ offset:3, span:8}}>
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