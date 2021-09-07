import React from 'react'
import './Toolbar.scss'
import { Link } from 'react-router-dom'

const Toolbar = () => {
  return <div className="tool-bar-box">
    <ul>
      <li>
        <Link to="/">返回列表</Link>
      </li>
    </ul>
  </div>
}

export default Toolbar
