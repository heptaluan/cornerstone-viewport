import React from 'react'
import './Viewer.scss'
import Toolbar from '../../components/Toolbar/Toolbar'
import LeftSidePanel from '../../components/LeftSidePanel/LeftSidePanel'
import ViewerMain from '../../components/ViewerMain/ViewerMain'
import RightSidePanel from '../../components/RightSidePanel/RightSidePanel'

const Viewer = () => {
  return (
    <div className="viewer-box">
      <Toolbar />
      <div className="viewer-center-box">
        <LeftSidePanel />
        <ViewerMain />
        <RightSidePanel />
      </div>
    </div>
  )
}

export default Viewer
