import React from 'react'
import CornerstoneViewport from 'react-cornerstone-viewport'
import './ViewerMain.scss'
import useWindowSize from '../../hook/useWindowSize'
import Toolbar from '../../components/Toolbar/Toolbar'
import CustomOverlay from '../common/CustomOverlay/CustomOverlay'

const ViewerMain = props => {
  const size = useWindowSize()
  return (
    <div className="viewer-main-box">
      {
        props.imagesConfig.length <= 2 ? <div className="error-tips"><span>加载失败，请刷新后重新尝试！</span></div> : null
      }
      {props.imagesConfig.length === 0 ? null : (
        <Toolbar handleToolbarClick={props.handleToolbarClick} />
      )}
      <CornerstoneViewport
        viewportOverlayComponent={CustomOverlay}
        onElementEnabled={elementEnabledEvt =>
          props.handleElementEnabledEvt(elementEnabledEvt)
        }
        tools={props.toolsConfig}
        imageIds={props.imagesConfig}
        style={{ minWidth: '100%', height: `${size.height - 85}px`, flex: '1' }}
      />
    </div>
  )
}

export default ViewerMain
