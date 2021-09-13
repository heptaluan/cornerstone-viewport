import React from 'react'
import './Viewer.scss'
import Header from '../../components/Header/Header'
import LeftSidePanel from '../../components/LeftSidePanel/LeftSidePanel'
import ViewerMain from '../../components/ViewerMain/ViewerMain'
import MiddleSidePanel from '../../components/MiddleSidePanel/MiddleSidePanel'

const Viewer = () => {
  return (
    <div className="viewer-box">
      <Header />
      <div className="viewer-center-box">
        <LeftSidePanel />
        <MiddleSidePanel />
        <ViewerMain />
      </div>
    </div>
  )
}

export default Viewer
