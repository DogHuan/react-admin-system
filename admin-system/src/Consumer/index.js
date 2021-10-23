import React,{Component} from "react";
import RichText from './Email/index';
import {Form, Input, Button} from 'antd'
export default class RichTextEditor extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
     <Form
        labelCol={{
          span: 3,
        }}
        wrapperCol={{
          span: 16,
        }}
      >
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 12,
          }}
        >
        </Form.Item>
        <Form.Item
          name="title"
          label="标题"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="content"
          label="内容"
          rules={[
            {
              required: true,
            },
          ]}
        >
            <RichText></RichText>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 8,
          }}
        >
        </Form.Item>
      </Form>
            </div>
        )
    }
}