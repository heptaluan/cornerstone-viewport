import React, { useState } from 'react'
import CornerstoneViewport from 'react-cornerstone-viewport'
import './ViewerMain.scss'
import useWindowSize from '../../hook/useWindowSize'

const ViewerMain = () => {
  const size = useWindowSize()
  const [state, setstate] = useState({
    tools: [
      // Mouse
      // {
      //   name: 'Wwwc',
      //   mode: 'active',
      //   modeOptions: { mouseButtonMask: 1 },
      // },
      {
        name: 'RectangleRoi',
        mode: 'active',
        modeOptions: { mouseButtonMask: 1 },
      },
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
    imageIds: [
      'wadouri:http://192.168.1.158:9000/medical.case.data/dicom/000001',
    ],
  })

  return (
    <div className="viewer-main-box">
      <CornerstoneViewport tools={state.tools} imageIds={state.imageIds} style={{ minWidth: '100%', height: `${size.height - 80}px`, flex: '1' }} />
    </div>
  )
}

export default ViewerMain
