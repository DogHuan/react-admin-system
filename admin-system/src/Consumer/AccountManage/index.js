import React,{Component} from "react";
import { Table, Input, Button, Popconfirm, Form, Typography} from 'antd';
export default class AccountManage extends Component{
    constructor(props) {
        super(props)
        this.state={
            editingKey:''
        }
      }
    isEditing = (record) => record.id === this.state.editingKey;

    handleEdit =(record)=>{
        this.setState({
            editingKey:record.id
        })
    }

    handleChange =()=>{

    }

    handleAdd =()=>{
        
    }

    handleCancel =()=>{
        // this.fetchData()
        this.setState({
            editingKey:''
        })
    }

    handleSave =()=>{

    }

    handleDelete =()=>{

    }

    render(){
        const {dataSource, editingKey} = this.state
        const data = [
            {
              key: '1',
              name: '胡彦斌',
              age: 32,
              address: '西湖区湖底公园1号',
            },
            {
              key: '2',
              name: '胡彦祖',
              age: 42,
              address: '西湖区湖底公园1号',
            },
          ];

        const columns =[
        {
            title:"序号",
            dataIndex:"index",
            key:"index",
        },{
            title:"用户名",
            dataIndex:"username",
            key:"username",
            render:(_,record) => {
                const editable = this.isEditing(record);
                return editable ? (
                  <Input
                    style={{
                    margin: "-5px",
                    width:"100%"
                    }}
                    value={record.username}
                    onChange={(e) => { this.handleChange(e) }}
                  >
                  </Input>
                ):(
                  <span>{record.username}</span>
                )
            }
          },{
            title:"账号",
            dataIndex:"account",
            key:"account",
            render:(_,record) => {
                const editable = this.isEditing(record)
                return editable ? (
                    <Input 
                    style={{margin:-5,width:"100%"}}
                    value={record.account}
                    onChange={(e) =>{this.handleChange(e.target.value)}}
                    ></Input>
                ):(
                    <span>{record.account}</span>
                )
            }
          },{
            title:"权限",
            dataIndex:"permission",
            key:"permission",
            render:(_,record) => {
                const editable = this.isEditing(record)
                return editable ? (
                    <Input 
                    style={{margin:-5,width:"100%"}}
                    value={record.permission}
                    onChange={(e)=>this.handleChange(e)}></Input>
                ):(
                    <span>{record.permission}</span>
                )
            }
          },{
            title:"操作",
            dataIndex:"operation",
            key:"operation",
            render: (_, record) => {
                const editable = this.isEditing(record);
                return (
                  <div>
                    { editable ? (
                        <span>
                          <a
                            href="javascript:;"
                            onClick={() => this.handleSave(record.id)}
                            style={{
                              marginRight: 8,
                            }}
                          >
                            保存
                          </a>
                          <a
                            href="javascript:;"
                            onClick={() => this.handleCancel()}
                            style={{
                              marginRight: 8,
                            }}
                          >
                            取消
                          </a>
                        </span>
                      ) : (
                        <Typography.Link
                          disabled={this.state.editingKey !== ''}
                          onClick={() => this.handleEdit(record)}
                          style={{
                            marginRight: 8,
                          }}
                        >
                          修改
                        </Typography.Link>
                      )
                    }
                    <Popconfirm
                      title="确认删除？"
                      okText="确定"
                      cancelText="取消"
                      onConfirm={() => {
                        this.handleDelete(record?.id)
                      }}
                    >
                      <span
                        style={{
                          color: 'red',
                        }}
                      >
                        删除
                      </span>
                    </Popconfirm>
                  </div>
                )
            }
          },
        ]
        return(
            <div>
            <Button onClick={this.handleAdd}></Button>
            <Table
              bordered
              dataSource={data}
              columns={columns}
            />
          </div>
        )
    }
}