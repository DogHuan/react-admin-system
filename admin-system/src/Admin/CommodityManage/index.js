import React, { Component } from "react";
import { Table, Tag, Space } from 'antd';
export default class CommondityManage extends Component {
    constructor(props) {
        super(props)
    }
    render() {
    const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: text => <a>{text}</a>,
    },
    {
      title: '商品类别',
      dataIndex: 'commodityType',
      key: 'commodityType',
    },
    {
      title: '商品名称',
      dataIndex: 'commodityName',
      key: 'commodityName',
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
      <>
      {tags.map(tag => {
      let color = tag.length > 5 ? 'geekblue' : 'green';
      if (tag === 'loser') {
          color = 'volcano';
      }
      return (
      <Tag color={color} key={tag}>
          {tag.toUpperCase()}
      </Tag>
      );
      })}
      </>
    ),
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
      <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
      </Space>
      ),
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
        <Table columns={columns} dataSource={data}></Table>
    )
}
}