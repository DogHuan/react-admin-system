import { Button, Input, message } from "antd";
import Table from "rc-table/lib/Table";
import React, { Component } from "react";
export default class extends Component {
    constructor(props){
        super(props)
        this.state = ({
            data:'',
            editingKeys:'',
            currentRecord:'',
        })
    }

    isEditing =(record)=>record.id === this.state.editingKeys

    handleEdit =(record)=>{
        this.setState = ({
            currentRecord:record,
            editingKeys:record.id
        })
    }

    handleAdd =()=>{
        const newData = {
            id:'',
            project:'',
            type:'',
            approver:'',
            accountId:''
        }
        const data = this.state.data
        this.setState = ({
            data: data ? [newData, ...data] : [newData]
        })
    }

    handleChange=(key,e)=>{
        const index = this.state.data?.findIndex(item =>
            item.id===this.state.editingKeys
            )
            let newData =[...this.state.data]
            newData.splice(index,1,{
                ...this.state.data[index],
                [key]:e.target.value?.toString()
            })
            this.setState =({
                data:newData
            })
    }

    handleSave =(id)=>{
        if (!id||id==='') {
            const index =this.state.data?.findIndex((item)=>{
                return item?.id === this.state.editingKeys
            })
            const index =this.state.data[index]
            fetch("url",{
                method:"POST",
                header:new Headers({
                    "Content-Type": "application/json;charset=UTF-8",
                }),
                body:JSON.stringify({
                    id:data.id,
                    project:data.project,
                    type:data.type,
                    approver:data.approver,
                    accountId:data.accountId
                })
            }).then(result =>result.json(
            )).then(result =>{
                if(result.code===200){
                    message.success("修改成功");
                    this.setState=({
                        editingKeys:''
                    })
                    this.fetchData()
                } else{
                    message.error("修改失败"+result.msg)
                }
            }).catch(function(error){
                message.error("保存失败"+error)
            })
        } else{
            const index = this.state.data?.findIndex((item) =>{
                return item?.id === this.state.editingKeys
            })
            const data = this.state.data[index]
            fetch("url",{
                method:"PUT",
                body:JSON.stringify({
                    id:data.id,
                    project:data.project,
                    type:data.type,
                    approver:data.approver,
                    accountId:data.accountId
                })
            }).then(result =>result.json(
            )).then(result =>{
                if (result.code === 200) {
                    message.success("修改成功")
                    this.setState = ({
                        editingKeys:''
                    })
                    this.fetchData()
                } else{
                    message.error("修改失败"+result.msg)
                }
            }).catch(function(error){
                message.error("保存失败"+error)
            })
        }
    }
    
    handleCancel =()=>{
        this.setState = {
            editingKeys:''
        }
        this.fetchData()
    }

    handleDelete =(id)=>{
        if(!id || id ===''){
            const index = this.state.data?.findIndex(item =>
                item?.id===this.state.editingKeys
                )
            const data = this.state.data[index]
            fetch("url",{
                method:"DELETE",
                body:JSON.stringify({
                    id:data.id
                })
            }).then(result =>result.json(
            )).then(result =>{
                if (result.code===200) {
                    message.success("删除成功")
                    this.setState=({
                        editingKeys:''
                    })
                    this.fetchData()
                } else{
                    message.error("删除失败"+result.msg)
                }
            }).catch(function(error){
                message.error("删除失败"+error)
            })
        }
    }

    render() {

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
            <div>
                <Button 
                onClick={this.handleAdd}
                >
                    添加项目
                    </Button>
                <Table
                columns={columns}
                data={this.state.data}
                >
                </Table>
            </div>
        )
    }
}