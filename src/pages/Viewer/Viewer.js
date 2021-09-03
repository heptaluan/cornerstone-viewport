import React, { useState } from 'react'
import './Viewer.scss'
import { Link } from 'react-router-dom'
import CornerstoneViewport from 'react-cornerstone-viewport'

const Viewer = () => {
  const [state, setstate] = useState({
    tools: [
      // Mouse
      {
        name: 'Wwwc',
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
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.7.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.8.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.9.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.10.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.11.dcm',
      'dicomweb://s3.amazonaws.com/lury/PTCTStudy/1.3.6.1.4.1.25403.52237031786.3872.20100510032220.12.dcm',
    ],
  })

  return (
    <div className="viewer">
      <Link to="/studyList">StudyList</Link>
      <br />
      <Link to="/viewer/1.3.6.1.4.1.14519.5.2.1.7009.2403.871108593056125491804754960339">Viewer</Link>

      <div>
        <CornerstoneViewport tools={state.tools} imageIds={state.imageIds} style={{ minWidth: '100%', height: '512px', flex: '1' }} />
      </div>
    </div>
  )
}

export default Viewer
