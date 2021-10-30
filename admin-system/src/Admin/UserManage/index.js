import React, { Component } from "react";
import { Table, Typography, Popconfirm, Input, message, Button } from 'antd';
import './index.css'
export default class UserManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      editingKey: '',
      currentRecord: undefined
    }
  }

  //isEditing函数使用record参数监听当前editable的变化,时刻判断record.id的变化是否等于this.state.editingKey
  //此刻的参数record即为columns数组内部的每个对象值。
  isEditing = (record) => record.id === this.state.editingKey;

  //当单元格变为可编辑状态时，监听input内部的回调函数的变化，因此我们需要一个新的数组来存储变化的数据，
  //然后更新data的新值。

  fetchData = () => {
    fetch('url'
    ).then(result =>result.json(
    )).then(result =>{
      this.setState({
        data:result.data
      })
    }).catch(function (error) {
      message.error("取值失败"+error)
    })
  }

  componentDidMount(){
    this.fetchData()
  }

  handleAdd = () => {
    const newData = {
      id: '',
      user: '',
      email: '',
      role: ''
    }
    const data = this.state.data
    this.setState({
      data: data ? [newData, ...data] : [newData],
    })
  }

  handleChange = (key, e) => {
    //传入的参数key为input的name属性，e即为目标值e.target.value的变化
    //查找data数组里元素item与this.state.editingKey的相等的id属性，然后返回给index。
    const index = this.state.data?.findIndex((item) => {
      return item?.id === this.state.editingKey
    })
    //
    let newData = [...this.state.data]
    newData.splice(index, 1, {
      ...this.state.data[index],
      [key]: e.target.value
    })
    this.setState({
      data: newData,
    })
  }

  handleEdit = (record) => {
    this.setState({
      currentRecord: record,
      editingKey: record.id
    })
  }

  handleSave = (id) => {
    if (!id || id === '') {
      const index = this.state.data?.findIndex((item) => {
        return item?.id === this.state.editingKey
      })
      const data = this.state.data[index]
      fetch('url', {
        method: "POST",
        header: new Headers({
          "Content-Type": "application/json;charset=UTF-8",
        }),
        body: JSON.stringify({
          user: data.user,
          email: data.email,
          role: data.role
        })
      }).then((result) => result.json(
      )).then(result => {
        if (result.code > 199 && result.code < 300) {
          message.success("操作成功")
          this.setState({
            editingKey: ''
          })
          this.fetch()
        } else {
          message.error("操作失败" + result.msg)
        }
      }).catch(function (error) {
        message.error("操作失败" + error)
      })
    } else {
      const index = this.state.data?.findeIndex((item) => {
        return item?.id === this.state.editingKey
      })
      const data = this.state.data[index]
      fetch('url', {
        method: 'PUT',
        body: JSON.stringify({
          user: data.user,
          email: data.email,
          role: data.email
        })
      }).then((result) => result.json(
      )).then(result => {
        if (result.code === 200) {
          message.success("操作成功")
          this.setState({
            editingKey: ''
          })
          this.fetch()
        } else {
          message.error("操作失败" + result.msg)
        }
      }).catch(function (error) {
        message.error("操作失败" + error)
      })
    }
  }

  handleCancel = () => {
    this.setState({
      editingKey: ''
    })
    // this.fetch()
  }

  handleDelete = (id) => {
    if (!id || id === '') {
      this.fetch()
    } else {
      fetch('url', {
        method: 'DELETE',
        // body:JSON.stringify({
        //   id:id
        // })
      }).then(result => result.json(
      )).then(result => {
        if (result.code === '200') {
          message.success("操作成功")
          this.setState({
            editingKey: ''
          })
          this.fetch()
        } else {
          message.error("操作失败" + result.msg)
        }
      }).catch(function (error) {
        message.error("操作失败" + error)
      })
    }
  }

  render() {

    //1、设置columns内部对象属性，注意render属性方法的两种使用方式。
    const columns = [
      {
        title: '序号',
        dataIndex: 'index',
        key: 'index',
        //使用方法1：columns内部的render()方法具有四个参数data,type,row,meta。
        //其中data代表columns里每个对象的序号index or id，type包含了columns数组内部
        //每个对象的全部属性值，row代表了每一个对象的下标，也就是columns的下标。
        // render:(data,type,row,meta) =>{
        //   console.log("data",data,"type",type,"row",row,"meta",meta);
        // }
        //使用方法2：render()方法的_,record,index属性。
        //_参数相当于data,代表了每个对象的序号，而record参数相当于type包含了columns数组中
        //每个对象的全部属性值，index相当于row代表了columns数组的下标。
        render: (_, record, index) => {
          console.log("_", _, "record", record, "index", index);
        }
      },
      {
        title: '用户名',
        dataIndex: 'user',
        key: 'user',
        //2、当点击编辑时，用户名对象呈现为可编辑状态。点击取消调用handleCancel()方法，恢复不可编辑状态。
        render: (_, record) => {
          //2.1、columns中editable控制当前表格是否为可编辑状态，我们初始定义editable为isEditing调用
          // record参数所取得后布尔值
          const editable = this.isEditing(record)
          //2.2、三目运算符判断editable布尔值如果为true即可编辑，执行input输入框的出现。false则重新渲染
          //record内部的属性值
          return editable ? (
            <Input
              value={record.user}
              onChange={(e) => this.handleChange("user", e)}
              style={{
                margin: -5
              }}>
            </Input>
          ) : (
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
        render: (_, record) => {
          const editable = this.isEditing(record)
          return editable ? (
            <Input
              value={record.email}
              onChange={(e) => this.handleChange("email", e)}
              style={{
                margin: -5
              }}
            >
            </Input>
          ) : (
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
        render: (_, record) => {
          const editable = this.isEditing(record)
          return editable ? (
            <Input
              value={record.role}
              onChange={(e) => this.handleChange("role", e)}
              style={{
                margin: -5
              }}
            >
            </Input>
          ) : (
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
                      style={{ marginRight: 10 }}
                    >
                      保存
                    </a>
                    <a
                      href="javascript:;"
                      onClick={() => this.handleCancel()}
                      style={{ marginRight: 10 }}
                    >
                      取消
                    </a>
                  </span>
                ) : (
                  <Typography.Link
                    disabled={this.state.editingKey !== ''}
                    onClick={() => this.handleEdit(record)}
                    style={{ marginRight: 20 }}
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
                <span style={{ color: 'red' }}>
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
        index: '1',
        user: 'John Brown',
        email: 32,
        role: 'New York No. 1 Lake Park',
        permission: ['nice', 'developer'],
      },
      {
        index: '2',
        user: 'Jim Green',
        email: 42,
        role: 'London No. 1 Lake Park',
        permission: ['loser'],
      },
      {
        index: '3',
        user: 'Joe Black',
        email: 32,
        role: 'Sidney No. 1 Lake Park',
        permission: ['cool', 'teacher'],
      },
    ];
    return (
      <div className='container'>
        <div className='button-container'>
          <Button type="primary"
            onClick={this.handleAdd}
          >
            增加新用户
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>
    )
  }
}