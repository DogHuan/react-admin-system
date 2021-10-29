import React, { Component } from "react";
import { Table, Typography, Popconfirm, Input } from 'antd';
export default class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editingKey: ''
    }
  }
  isEditing = (record) => record.id === this.state.editingKey;
  render() {
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        render: (_, record, index) => console.log("record", record, "index", index)
      },
      {
        title: '用户名',
        dataIndex: 'users',
        key: 'users',
        render:(_,record)=>{
          const editable = this.isEditing(record)
          return editable ? (
            <Input
            value={record.user}
            onChange={(e)=>this.handleChange("user",e)}>
            </Input>
          ):(
            <span>
              {record.user}
            </span>
          )
        }
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        render:(_,record)=>{
          const editable = this.isEditing(record)
          return editable ? (
            <Input
            value={record.email}
            onChange={(e)=>this.handleChange("email",e)}
            >
            </Input>
          ):(
            <span>
              {record.email}
            </span>
          )
        }
      },
      {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        render:(_,record)=>{
          const editable = this.isEditing(record)
          return editable ? (
            <Input
            value={record.role}
            onChange={(e)=>this.handleChange("role",e)}
            >
            </Input>
          ):(
            <span>
              {record.role}
            </span>
          )
        }
      },
      {
        title: '权限',
        dataIndex: 'permission',
        key: 'permission',
      },
      {
        title: '操作',
        key: 'operation',
        render: (_, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {
                editable ? (
                  <span>
                    <a
                      href="javascript:;"
                      onClick={() => this.handleSave(record.id)}
                    >
                      保存
                    </a>
                    <a
                      href="javascript:;"
                      onClick={() =>this.handleCancel()}
                    >
                      取消
                    </a>
                  </span>
                ) : (
                  <Typography.Link
                    disabled={this.state.editingKey !== ''}
                    onClick={() => this.handleEdit(record)}
                    style={{marginRight:20}}
                  >
                    编辑
                  </Typography.Link>
                )}
              <Popconfirm
                title="确定删除？"
                okText="确定"
                cancelText="取消"
                onConfirm={() => this.handleDelete(record?.id)}
              >
                <span style={{color:'red'}}>
                删除
                </span>
              </Popconfirm>
            </div>
          )
        },
      },
    ];
    const data = [
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      },
    ];
    return (
      <Table columns={columns} dataSource={data} />
    )
  }
}