import React from 'react'
import './Header.scss'
import { Button } from 'antd'

const Header = () => {
  return (
    <div className="header-box">
      <div className="user-content">姓名：CHEN FANG 患者编号：90223232 性别：F 年龄：80 检查日期：2021-05-06</div>
      <div className="export">
        <Button type="primary">导出报告</Button>
      </div>
    </div>
  )
}

export default Header
