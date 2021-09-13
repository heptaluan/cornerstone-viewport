import React, { useState } from 'react'
import CornerstoneViewport from 'react-cornerstone-viewport'
import './ViewerMain.scss'
import useWindowSize from '../../hook/useWindowSize'
import Toolbar from '../../components/Toolbar/Toolbar'

const ViewerMain = () => {
  const size = useWindowSize()
  const [state, setstate] = useState({
    tools: [
      // Mouse
      {
        name: 'Wwwc',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
      // {
      //   name: 'RectangleRoi',
      //   mode: 'active',
      //   modeOptions: { mouseButtonMask: 1 },
      // },
      {
        name: 'Zoom',
        mode: 'active',
        modeOptions: { mouseButtonMask: 2 },
      },
      {
        name: 'Pan',
        mode: 'active',
        modeOptions: { mouseButtonMask: 4 },
      },
      { name: 'StackScrollMouseWheel', mode: 'active' },
      { name: 'PanMultiTouch', mode: 'active' },
      { name: 'ZoomTouchPinch', mode: 'active' },
      { name: 'StackScrollMultiTouch', mode: 'active' },
    ],
    imageIds: ['wadouri:http://192.168.1.158:9000/medical.case.data/dicom/000001'],
  })

  const handleToolbarClick = (type, checked) => {
    console.log(type)
    console.log(checked)
  }

  return (
    <div className="viewer-main-box">
      <Toolbar handleToolbarClick={handleToolbarClick} />
      <CornerstoneViewport tools={state.tools} imageIds={state.imageIds} style={{ minWidth: '100%', height: `${size.height - 85}px`, flex: '1' }} />
    </div>
  )
}

export default ViewerMain
