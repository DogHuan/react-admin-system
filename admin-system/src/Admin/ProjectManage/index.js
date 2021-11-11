import { Table, Button, Input, Select, Typography, Popconfirm, message } from "antd";
import React, { Component } from "react";
import './index.css'
import '../../common.css'
const { Option } = Select
export default class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: '',
            editingKeys: '',
            currentRecord: '',
            clickAble:true,
            page:1,
            pageSize:10
        }
    }

    isEditing = (record) => record.id === this.state.editingKeys

    handleEdit = (record) => {
        this.setState({
            currentRecord: record,
            editingKeys: record.id
        })
    }

    handleAdd = () => {
        const newData = {
            id: '',
            project: '',
            type: '',
            approver: '',
            accountId: ''
        }
        const data = this.state.data
        if (this.state.clickAble===false) {
            return false
        }
        this.setState({
            clickAble:false,
            page:1,
            data: data ? [newData, ...data] : [newData]
        })
    }

    handleChange = (key, e) => {
        const index = this.state.data?.findIndex(item =>
            item.id === this.state.editingKeys
        )
        let newData = [...this.state.data]
        newData.splice(index, 1, {
            ...this.state.data[index],
            [key]: e.target.value?.toString()
        })
        this.setState({
            data: newData
        })
    }

    handleSave = (id) => {
        if (!id || id === '') {
            const index = this.state.data?.findIndex((item) => {
                return item?.id === this.state.editingKeys
            })
            const data = this.state.data[index]
            fetch("url", {
                method: "POST",
                header: new Headers({
                    "Content-Type": "application/json;charset=UTF-8",
                }),
                body: JSON.stringify({
                    id: data.id,
                    project: data.project,
                    type: data.type,
                    approver: data.approver,
                    accountId: data.accountId
                })
            }).then(result => result.json(
            )).then(result => {
                if (result.code === 200) {
                    message.success("修改成功");
                    this.setState({
                        editingKeys: ''
                    })
                    this.fetchData()
                } else {
                    message.error("修改失败" + result.msg)
                }
            }).catch(function (error) {
                message.error("保存失败" + error)
            })
        } else {
            const index = this.state.data?.findIndex((item) => {
                return item?.id === this.state.editingKeys
            })
            const data = this.state.data[index]
            fetch("url", {
                method: "PUT",
                body: JSON.stringify({
                    id: data.id,
                    project: data.project,
                    type: data.type,
                    approver: data.approver,
                    accountId: data.accountId
                })
            }).then(result => result.json(
            )).then(result => {
                if (result.code === 200) {
                    message.success("修改成功")
                    this.setState({
                        editingKeys: ''
                    })
                    this.fetchData()
                } else {
                    message.error("修改失败" + result.msg)
                }
            }).catch(function (error) {
                message.error("保存失败" + error)
            })
        }
    }

    handleCancel = () => {
        this.setState({
            editingKeys: ''
        })
        this.fetchData()
    }

    handleDelete = (id) => {
        if (!id || id === '') {
            const index = this.state.data?.findIndex(item =>
                item?.id === this.state.editingKeys
            )
            const data = this.state.data[index]
            fetch("url", {
                method: "DELETE",
                body: JSON.stringify({
                    id: data.id
                })
            }).then(result => result.json(
            )).then(result => {
                if (result.code === 200) {
                    message.success("删除成功")
                    this.setState({
                        editingKeys: ''
                    })
                    this.fetchData()
                } else {
                    message.error("删除失败" + result.msg)
                }
            }).catch(function (error) {
                message.error("删除失败" + error)
            })
        }
    }

    fetchData = () => {
        fetch("url")
            .then(response => response.json())
            .then(res => {
                this.setState({
                    data: res.data
                })
            })
    }

    // componentDidMount(){
    //     this.fetchData()
    // }

    render() {

        const filterList = []
        this.state.data?.cpsList?.forEach(item => {
            filterList.push({
                title: item.name,
                value: item.name
            })
        });

        const pagination = {
            showSizeChanger:true,
            current:this.state.page,
            pageSize:this.state.pageSize,
            onChange:(page,pageSize)=>{
                this.setState({
                    page:page,
                    pageSize:pageSize
                })
            }
        }
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
                key: 'index',
            },
            {
                title: '项目名称',
                dataIndex: 'project',
                key: 'project',
                render: (_, record) => {
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                            style={{ margin: -5 }}
                            value={record.commodityType}
                            onChange={(e) => this.handleChange("commodityType", e)}
                        ></Input>
                    ) : (
                        <span>{record.commodityType}</span>
                    )
                }
            },
            {
                title: '项目类别',
                dataIndex: 'type',
                key: 'type',
                filters: filterList,
                onFilter: (value, record) => record.type?.indexOf(value) === 0,
                render: (_, record) => {
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                            value={record.commodityName}
                            style={{ margin: -5 }}
                            onChange={(e) => this.handleChange("commodityName", e)}
                        >
                        </Input>
                    ) : (
                        <span>{record.commodityName}</span>
                    )
                }
            },
            {
                title: "云服务商账号",
                dataIndex: "accountId",
                key: "accountId",
                render: (_, record) => {
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                            style={{ margin: -5 }}
                            value={record.accountId}
                            onChange={(e) => this.handleChange("accountId", e)}
                        >
                        </Input>
                    ) : (
                        <span>{record.accountId}</span>
                    )
                }
            },
            {
                title: "审批人",
                dataIndex: "approver",
                key: "approver",
                render: (_, record) => {
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Select
                            defaultValue={record.approver}
                            onChange={(e) => this.handleChange("approver", e)}>
                            {
                                this.state.cpsList.map(item => {
                                    <Option
                                        value={item.title}
                                        key={item.key}
                                    >
                                        {item.title}
                                    </Option>
                                })
                            }
                        </Select>
                    ) : (
                        <span>{record.approver}</span>
                    )
                }
            },
            {
                title: '操作',
                key: 'operation',
                render: (_, record) => {
                    const editable = this.isEditing(record)
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
                                            onClick={() => this.handleCancel}
                                            style={{ marginRight: 10 }}
                                        >
                                            取消
                                        </a>
                                    </span>
                                ) : (
                                    <Typography.Link
                                        disabled={this.state.editingKeys !== ''}
                                        onClick={() => this.handleEdit(record)}
                                        style={{ marginRight: 10 }}
                                    >
                                        编辑</Typography.Link>
                                )
                            }
                            <Popconfirm
                                title="确认删除?"
                                okText="确认"
                                cancelText="取消"
                                onConfirm={() => this.handleDelete(record.id)}
                            >
                                <span
                                    style={{ color: "red" }}>
                                    删除
                                </span>
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ];
        return (
            <div className="container">
                <div className="project-statistic-card" style={{marginBottom:20}}>
                    <Button className="summary-box listDiv" onClick={() => this.fetchData()}
                     style={{
                        height: "90px",
                        backgroundColor: "#1872cf"
                      }}>
                        <div className="number">
                            模块
                        </div>
                        <div className="text" >
                            计数
                        </div>
                    </Button>
                    {
                        this.state.data?.testData?.map((item,index)=>{
                            <Button
                            key={item.id}
                            onClick={()=>this.handleBoxFilter(item.name)}
                            >
                                <div className="number">
                                    {item.testname}
                                </div>
                                <div className="text">
                                    {item.testname}
                                </div>
                            </Button>
                        })
                    }
                </div>
                <Button
                    onClick={this.handleAdd}
                >
                    添加项目
                </Button>
                <Table
                    columns={columns}
                    data={this.state.data}
                    pagination={pagination}
                >
                </Table>
            </div>
        )
    }
}