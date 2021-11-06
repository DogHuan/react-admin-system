import React,{Component} from 'react';
export default class Cloud extends Component{
    constructor(props){
        super(props)
        this.state = ({
            data:[],
            editingKeys:'',
            currentRecord:''
        })
    }

    isEditing = (record)=> record.id===this.state.editingKeys

    handleEdit = (record) =>{
        this.setState = ({
            currentRecord:record,
            editingKeys:record.id
        })
    }

    handleAdd =()=>{
        let newData ={
            id:'',
            cloud:'',
            content:''
        }
        const data =this.state.data
        this.setState =({
            data: data ? [newData,...data] : [newData]
        })
    }

    handleChange = (key,e) =>{
        const index = this.state.data?.findIndex((item) =>{
            return item?.id === this.state.editingKeys
        })
        let newData = [...this.state.data]
        newData.splice(index,1,{
            ...this.state.data[index],
            [key]:e.target.value.toString()
        })
        this.setState = ({
            data:newData
        })
    }

    handleSava =(id)=>{
        if(!id || id===''){
            const index = this.state.data?.findIndex(item =>
                item.id === this.state.editingKeys
                )
                const data = this.state.data[index]
                fetch("url",{
                    method:'POST',
                    header:new Headers ({
                        "Content-Type": "application/json;charset=UTF-8",
                    }),
                    body:JSON.stringify({
                        cloud:data.cloud,
                        content:data.content
                    })
                }).then(result =>result.json(
                )).then(result =>{
                    if (result.code===200) {
                        message.success("修改成功")
                        this.setState = ({
                            editingKeys:''
                        })
                        this.fetchData()
                    } else{
                        message.error("修改失败"+result.msg);
                    }
                }).catch(function(error){
                    message.error("修改失败"+error)
                })
        } else{
            const index = this.state.data?.findIndex(item =>{
                return item?.id === this.state.editingKeys
            })
            const data = this.state.data[index]
            fetch("url",{
                method:"PUT",
                body:JSON.stringify({
                    id:data.id,
                    cloud:data.cloud,
                    content:data.content
                })
            }).then(result =>result.json(
            )).then(result =>{
                if (result.code ===200 ) {
                    message.success("修改成功")
                    this.setState=({
                        editingKeys:''
                    })
                    this.fetchData()
                } else{
                    message.error("修改失败"+result.msg)
                }
            }).catch(function(error){
                message.error("修改失败"+error)
            })
        }
    }

        handleCancel=()=>{
            this.fetchData()
            this.setState = ({
                editingKeys:''
            })
        }

        handleDelete =(id)=>{
            if (!id || id==='') {
                const index = this.state.data?.findIndex(item =>
                    item?.id === this.state.editingKeys
                    )
                    const data = this.state.data[index]
                    fetch("url",{
                        method:"DELETE",
                        body:JSON.stringify({
                            id:data.id
                        })
                    }).then(result =>result.json(
                    )).then(result =>{
                        if (result.code ===200) {
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
    render() {
        const columns = [
            {
                title:"序号",
                dataIndex:"index",
                key:"index",
            },
            {
                title:"云服务商",
                dataIndex:"cloud",
                key:"cloud",
                render:(_,record)=>{
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                        value={record.cloud}
                        style={{margin:-5}}
                        onChange={(e)=>this.handleChange("cloud",e)}>

                        </Input>
                    ):(
                        <span>{record.cloud}</span>
                    )
                }
            },
            {
                title:"描述",
                dataIndex:"content",
                key:"content",
                render:(_,record)=>{
                    const editable = this.isEditing(record)
                    return editable ? (
                        <Input
                        style={{margin:-5}}
                        value={record.content}
                        onChange={(e)=>this.handleChange("content",e)}
                        >

                        </Input>
                    ):(
                        <span>{record.content}</span>
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
                                        onClick={()=>this.handleSava(record.id)}
                                        style={{marginRight:10}}
                                        >
                                            保存
                                        </a>
                                        <a
                                        href="javascript:;"
                                        onClick={this.handleCancel}
                                        style={{marginRight:10}}
                                        >
                                            取消
                                        </a>
                                    </span>
                                ):(
                                    <Typography.Link
                                    disabled={this.state.editingKeys !==''}
                                    onClick={()=>this.handleEdit(record.id)}
                                    >
                                        编辑
                                        </Typography.Link>
                                )
                            }
                            <Popconfirm
                            title="确定删除?"
                            okText="确定"
                            cancelText="取消"
                            onConfirm={this.handleDelete}
                            >
                                <span style={{color:"red"}}>
                                    删除
                                </span>
                            </Popconfirm>
                        </div>
                        )
                }
            }
        ]
        return (
            <div>
                <Button
                onClick={this.handleAdd}></Button>
                <Table
                columns={columns}
                data={this.state.data}
                ></Table>
            </div>
        )
    }
}