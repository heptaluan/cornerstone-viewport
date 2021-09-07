import React from 'react'
import './StudyList.scss'
import { useHistory } from 'react-router-dom'
import { Table } from 'antd'

const dataSource = [
  {
    id: 1,
    key: '1',
    name: '张三',
    age: 32,
    day: '2020-02-02',
    date: '08:45:14',
    code: '',
    mm: '1.5',
    fps: '100',
    num: '5',
    state: '检测成功',
  },
  {
    id: 2,
    key: '2',
    name: '李四',
    age: 32,
    day: '2020-02-02',
    date: '08:45:14',
    code: '',
    mm: '1.5',
    fps: '100',
    num: '5',
    state: '检测成功',
  },
  {
    id: 3,
    key: '3',
    name: '王五',
    age: 32,
    day: '2020-02-02',
    date: '08:45:14',
    code: '',
    mm: '1.5',
    fps: '100',
    num: '5',
    state: '检测成功',
  },
]

const columns = [
  {
    title: '受检者编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '检查日期',
    dataIndex: 'day',
    key: 'day',
  },
  {
    title: '检查时间',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '影像号',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '层厚（mm）',
    dataIndex: 'mm',
    key: 'mm',
  },
  {
    title: '图像帧数',
    dataIndex: 'fps',
    key: 'fps',
  },
  {
    title: '疑似结节数',
    dataIndex: 'num',
    key: 'num',
  },
  {
    title: '状态',
    dataIndex: 'state',
    key: 'state',
  },
]

const StudyList = () => {
  const history = useHistory()
  return (
    <div className="study-list-container">
      <Table
        dataSource={dataSource}
        columns={columns}
        onRow={record => {
          return {
            onClick: event => {
              history.push(`/viewer/${record.id}`)
            },
          }
        }}
      />
    </div>
  )
}

export default StudyList
