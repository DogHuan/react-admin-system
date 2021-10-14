import React,{Component} from "react";
import { Form, Input, Button, Select } from 'antd';
const { Option } = Select;
import './index.css'
export default class Login extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
        <div className="login">
            <div className="loginForm">
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );

                <p>登录页面</p>
                </div> 
            </div>
        )
    }
}