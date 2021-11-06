import { Component } from "react";

export default class Permission extends Component{
    constructor(props){
        super(props)
        this.state = ({
            data:[],
            editingKeys:'',
            currentRecord:''
        })
    }

    isEditing = (record)=>record.id===this.state.editingKeys

    handleEdit=(record)=>{
        this.setState=({
            currentRecord:record,
            editingKeys:record.id
        })
    }

    handleAdd=()=>{
        let newData = {
            id:'',
            username:'',
            role:'',
            permission:'',
            comment:''
        }
        const data = this.state.data
        this.setState =({
            data: data ? [newData, ...data] :[newData]
        })
    }

    handleChange=(key,e)=>{
        const index = this.state.data?.findIndex(item =>
            item.id===this.state.editingKeys
            )
            let newData =[...this.state.data]
            newData.splic(index, 1, {
                ...this.state.data[index],
                [key]:e.target.value
            })
            this.setState =({
                data:newData
            })
    }

    handleSave=(id)=>{
        if (!id||id==='') {
            const index = this.state.data?.findIndex(item =>
                item.id ===this.state.editingKeys
                )
                const data = this.state.data[index]
                fetch("url",{
                    method:"POST",
                    header:new Headers({
                        "Content-Type": "application/json;charset=UTF-8",
                    }),
                    body:JSON.stringify({
                        id:data.id,
                        username:data.username,
                        role:data.role,
                        permission:data.permission,
                        comment:data.comment
                    })
                }).then(response =>response.json(
                )).then(result =>{
                    if (result.code===200) {
                        message.success("保存成功")
                        this.setState=({
                            editingKeys:''
                        })
                        this.fetchData()
                    } else{
                        message.error("保存失败"+result.msg)
                    }
                }).catch(function(error){
                    message.error("保存失败"+error)
                })
        } else{
            index = this.state.data?.findIndex(item =>
                item.id===this.state.editingKeys
                )
                const data = this.state.data[index]
                fetch("url",{
                    method:"PUT",
                    body:JSON.stringify({
                        id:data.id,
                        username:data.username,
                        role:data.role,
                        permission:data.permission,
                        comment:data.comment 
                    })
                }).then(response =>response.json(
                )).then(result=>{
                    if (result.code===200) {
                        message.success("保存成功")
                        this.setState=({
                            editingKeys:''
                        })
                        this.fetchData()
                    } else{
                        message.error("保存失败"+result.msg)
                    }
                }).catch(function(error){
                    message.error("保存失败"+error)
                })
        }
    }

    handleCancel=()=>{
        this.setState =({
            editingKeys:''
        })
        this.fetchData()
    }

    handleDelete=(id)=>{
        if (!id||id==='') {
            const index = this.state.data?.findIndex(item =>{
                return item?.id === this.state.editingKeys
            })
            const data = this.state.data[index]
            fetch("url",{
                method:'DELETE',
                body:JSON.stringify({
                    id:data.id
                })
            }).then(response=>response.json(
            )).then(result=>{
                if (result.code===200) {
                    message.success("删除成功")
                    this.setState = ({
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

    render(){

        const columns = [
            {
                title:"序号",
                dataIndex:"index",
                key:"index",
            },
            {
                title:"用户名",
                dataIndex:"username",
                key:"username",
                render:(_,record)=>{
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                        style={{margin:-5}}
                        value={record.username}
                        onChange={(e)=>this.handleChange("username",e)}
                        >

                        </Input>
                    ):(
                        <span>{record.username}</span>
                    )
                }
            },
            {
                title:"角色",
                dataIndex:"role",
                key:'role',
                render:(_,record)=>{
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                        style={{margin:-5}}
                        value={record.role}
                        onChange={(e)=>this.handleChange("role",e)}>
                        </Input>
                    ):(
                        <span>{record.role}</span>
                    )
                }
            },
            {
                title:"权限名",
                dataIndex:"permission",
                key:"permission",
                render:(_,record)=>{
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                        style={{margin:-5}}
                        value={record.permission}
                        onChange={(e)=>this.handleChange("permission",e)}
                        >

                        </Input>
                    ):(
                        <span>{record.permission}</span>
                    )
                }
            },
            {
                title:"权限备注",
                dataIndex:"comment",
                key:"comment",
                render:(_,record)=>{
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                        style={{margin:-5}}
                        value={record.comment}
                        onChange={(e)=>this.handleChange("comment",e)}
                        >

                        </Input>
                    ):(
                        <span>{record.comment}</span>
                    )
                }
            },
            {
                title:"操作",
                key:"operation",
                render:(_,record)=>{
                    const editable = this.isEditing(record)
                    return (
                        <div>
                            {
                                editable ? (
                                    <span>
                                    <a
                                    href="javascript:;"
                                    style={{marginRight:10}}
                                    onClick={this.handleSave(record.id)}
                                    >
                                        保存
                                    </a>
                                    <a
                                    href="javascript:;"
                                    style={{marginRight:10}}
                                    onClick={this.handleCancel}
                                    >
                                        取消
                                    </a>
                                </span>
                                ):(
                                    <Typogrphy.link
                                    disabled ={this.state.editingKeys!==''}
                                    style={{marginRight:10}}
                                    onClick={this.handleEdit(record)}
                                    >
                                        编辑
                                    </Typogrphy.link>
                                )
                            }
                            <Popconfirm
                            title="确定删除吗?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={this.handleDelete(record.id)}>
                                删除
                            </Popconfirm>
                        </div>
                    )
                }
            }
        ]
        return(
            <div>
                <Button
                onClick={this.handleAdd}>
                    增加
                </Button>
                <Table
                columns={columns}
                data={this.state.data}
                ></Table>
            </div>
        )
    }
}