import React, { useState, useEffect } from 'react'
import CornerstoneViewport from 'react-cornerstone-viewport'
import './ViewerMain.scss'
import useWindowSize from '../../hook/useWindowSize'
import Toolbar from '../../components/Toolbar/Toolbar'
import cornerstone from 'cornerstone-core'
import cornerstoneTools from 'cornerstone-tools'
import CustomOverlay from '../common/CustomOverlay/CustomOverlay'

const ViewerMain = props => {
  const size = useWindowSize()

  const [cornerstoneElement, setCornerstoneElement] = useState(null)

  // 监听列表的点击
  useEffect(() => {
    const changeActiveImage = index => {
      cornerstone.loadImage(props.imagesConfig[index]).then(image => {
        cornerstone.displayImage(cornerstoneElement, image)
      })
    }
    if (cornerstoneElement) {
      changeActiveImage(props.checkedIndex)
    }
  }, [cornerstoneElement, props.checkedIndex, props.imagesConfig])

  // 切换当前工具栏选中项
  const changeToolActive = (checked, type) => {
    if (checked) {
      cornerstoneTools.setToolActive(type, { mouseButtonMask: 1 })
    } else {
      cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
    }
  }

  const handleToolbarClick = (type, checked) => {
    let viewport = cornerstone.getViewport(cornerstoneElement)
    switch (type) {
      case 'Magnify':
      case 'RectangleRoi':
      case 'Eraser':
      case 'EllipticalRoi':
      case 'Angle':
      case 'Length':
        changeToolActive(checked, type)
        break
      case 'hflip':
        viewport.hflip = !viewport.hflip
        cornerstone.setViewport(cornerstoneElement, viewport)
        break
      case 'vflip':
        viewport.vflip = !viewport.vflip
        cornerstone.setViewport(cornerstoneElement, viewport)
        break
      case 'playClip':
        if (checked) {
          cornerstoneTools.playClip(cornerstoneElement, 10)
        } else {
          cornerstoneTools.stopClip(cornerstoneElement)
        }
        break

      default:
        break
    }
  }

  const handleElementEnabledEvt = elementEnabledEvt => {
    const cornerstoneElement = elementEnabledEvt.detail.element
    setCornerstoneElement(cornerstoneElement)

    cornerstoneElement.addEventListener('cornerstoneimagerendered', imageRenderedEvent => {
      const curImageId = imageRenderedEvent.detail.image.imageId
      const index = props.imagesConfig.findIndex(item => item === curImageId)
      props.getInageIndex(index)
    })
  }

  return (
    <div className="viewer-main-box">
      <Toolbar handleToolbarClick={handleToolbarClick} />
      <CornerstoneViewport
        viewportOverlayComponent={CustomOverlay}
        onElementEnabled={elementEnabledEvt => handleElementEnabledEvt(elementEnabledEvt)}
        tools={props.toolsConfig}
        imageIds={props.imagesConfig}
        style={{ minWidth: '100%', height: `${size.height - 85}px`, flex: '1' }}
      />
    </div>
  )
}

export default ViewerMain
