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

  //使用get方法抓取后台数据，使用this.setState重新渲染data的初始数据。
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

  //拿到数据后，我们需要页面一加载就渲染，因此使用生命周期函数componentDidMount(){}挂载，
  //所以可以直接调用this.fetchData()
  componentDidMount() {
    this.fetchData()
  }

  //点击添加事件，创建新的newData对象存储每个单元格的数据，然后渲染新数据到旧数据中
  handleAdd = () => {
    const newData = {
      id: '',
      user: '',
      email: '',
      role: ''
    }
    //拿到初始数据，再从新渲染的时候判断数据是否为新值，如果是，则把他放在就数据最前方。
    const data = this.state.data
    this.setState({
      data: data ? [newData, ...data] : [newData],
    })
  }

  //当单元格变为可编辑状态时，监听input内部的回调函数的变化，因此我们需要一个新的数组来存储变化的数据，
  //然后更新data的新值。
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

  //点击编辑时，传入record对象，更新当前的currentRecord，editingKey为当前的record.id
  handleEdit = (record) => {
    this.setState({
      currentRecord: record,
      editingKey: record.id
    })
  }

  handleSave = (id) => {
    //点击保存时，传入当前的id，判断id是否为空，不为空即是添加新项目，然后使用findIndex查找
    // 满足条件的item?.id === this.state.editingKey的下标；为空即为修改当前项目，执行另一步
    if (!id || id === '') {
      const index = this.state.data?.findIndex((item) => {
        return item?.id === this.state.editingKey
      })
      //此刻的data是当前查找的index下的data数据，执行POST操作添加新数据
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
          //当返回的code或者statue满足成功的条件后，除了打印message.success信息，还需要重新渲染当前页面
          //以及更改editingKey的值。
          message.success("操作成功")
          this.setState({
            editingKey: ''
          })
          this.fetchData()
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
          this.fetchData()
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
    // this.fetchData()
  }

  handleDelete = (id) => {
    if (!id || id === '') {
      this.fetchData()
    } else {
      fetch('url', {
        method: 'DELETE',
        // body:JSON.stringify({
        //   id:id
        // })
      }).then(result => result.json(
      )).then(result => {
        if (result.code === 200) {
          message.success("操作成功")
          this.setState({
            editingKey: ''
          })
          this.fetchData()
        } else {
          message.error("操作失败" + result.msg)
        }
      }).catch(function (error) {
        message.error("操作失败" + error)
      })
    }
  }

  fetchData=()=>{
    fetch("url")
    .then(response =>response.json())
    .then(res =>{
      this.setState({
        data:res.data
      })
    })
  }

  // componentDidMount(){
  //   this.fetchData()
  // }

  render() {

    const dataSource = this.state.data && [...this.state.data]
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
          //当operation的editable为true时，点击编辑隐藏编辑文字，显示保存，取消，删除文字信息。
          //点击删除时，跳出弹窗，提示确认与取消文字信息。当不可编辑时为编辑和删除文字信息
          return (
            //return需要写jsx逻辑代码，文本信息使用div包裹，同时包裹jsx代码。
            <div>
              {
                //editable为true时，span包裹保存和取消显示，分别给他们添加点击事件，
                //其中href="javascript:;"为执行了一条空代码，阻止了a标签的默认事件
                editable ? (
                  <span>
                    <a
                      href="javascript:;"
                      onClick={() => this.handleSave(record?.id)}
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
                //editable为false时，设置排版Typography是否为可编辑状态，disabled通过
                //editingKey判断是否为空来执行，点击事件传入record参数，即包含了每单元格的属性。
                  <Typography.Link
                    disabled={this.state.editingKey !== ''}
                    onClick={() => this.handleEdit(record)}
                    style={{ marginRight: 20 }}
                  >
                    编辑
                  </Typography.Link>
                )
                }
                {/* 气泡确认框内部onConfirm相当于点击事件，传入record.id判断删除的是表格的哪条数据 */}
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
    return (
      <div className='container'>
        <div className='button-container'>
          <Button type="primary"
            onClick={this.handleAdd}
          >
            增加新用户
          </Button>
        </div>
        <Table 
        columns={columns}
        dataSource={dataSource} />
      </div>
    )
  }
}