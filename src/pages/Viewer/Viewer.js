import React, { useState } from 'react'
import './Viewer.scss'
import Header from '../../components/Header/Header'
import LeftSidePanel from '../../components/LeftSidePanel/LeftSidePanel'
import ViewerMain from '../../components/ViewerMain/ViewerMain'
import MiddleSidePanel from '../../components/MiddleSidePanel/MiddleSidePanel'

const Viewer = () => {
  // 转发当前选中项
  const [index, setIndex] = useState(0)
  const getIndex = index => {
    setIndex(index)
  }

  return (
    <div className="viewer-box">
      <Header />
      <div className="viewer-center-box">
        <LeftSidePanel />
        <MiddleSidePanel getIndex={getIndex} />
        <ViewerMain index={index} />
      </div>
    </div>
  )
}

export default Viewer
