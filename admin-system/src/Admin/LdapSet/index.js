import React, { Component } from "react";
import { Button, Form, Input, message} from "antd";
const { TextArea } = Input;
export default class Ldap extends Component {
    constructor(props) {
        super(props)
    }

    formRef = React.createRef()

    handleSumit=()=>{
        const formData = this.formRef.current.getFieldsValue([
            'ip','dn','port','password','ou','filters','mapping'
        ])
        fetch("url",{
            method:"POST",
            header : {
                contentType: 'application/json',
              },
            body:JSON.stringify({
                ip:formData.ip,
                dn:formData.dn,
                port:formData.port,
                password:formData.password,
                ou:formData.ou,
                filters:formData.filters,
                mapping:formData.mapping
            })
        }).then(result =>result.json(
        )).then(result =>{
            if (result.code===200) {
                message.success("设置成功")
                this.fetchData()
            } else{
                message.error("设置失败"+result.msg)
            }
        }).catch(function(error){
            message.error("设置失败"+error)
        })
    }

    handleTest=()=>{
        const formData = this.formRef.current.getFieldsValue([
            'ip','dn','port','password','ou','filters','mapping'
        ])
        fetch("url",{
            method:"PUT",
            header:{
                contentType: 'application/json',
              },
              body:JSON.stringify({
                ip:formData.ip,
                dn:formData.dn,
                port:formData.port,
                password:formData.password,
                ou:formData.ou,
                filters:formData.filters,
                mapping:formData.mapping
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
                    wrapperCol={{ offset:3, span:10}} >
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