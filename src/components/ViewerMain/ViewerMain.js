import React, { useState, useEffect } from 'react'
import CornerstoneViewport from 'react-cornerstone-viewport'
import './ViewerMain.scss'
import useWindowSize from '../../hook/useWindowSize'
import Toolbar from '../../components/Toolbar/Toolbar'
import cornerstone from 'cornerstone-core'
import cornerstoneTools from 'cornerstone-tools'
import CustomOverlay from '../common/CustomOverlay/CustomOverlay'
import NoduleInfo from '../common/NoduleInfo/NoduleInfo'

const toolsConfig = [
  {
    name: 'Wwwc',
    mode: 'active',
    modeOptions: { mouseButtonMask: 1 },
  },
  { name: 'StackScrollMouseWheel', mode: 'active' },
  {
    name: 'RectangleRoi',
    modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'Eraser',
    modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'Magnify',
    modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'EllipticalRoi',
    modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'Angle',
    modeOptions: { mouseButtonMask: 1 },
  },
  {
    name: 'Length',
    modeOptions: { mouseButtonMask: 1 },
  },
]

const imagesConfig = [
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I710',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I720',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I730',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I740',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I750',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I760',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I770',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I780',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I790',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I800',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I810',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I820',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I830',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I840',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I850',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I860',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I870',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I880',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I890',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I900',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I910',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I920',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I930',
  'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I940',
  // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I950',
  // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I960',
  // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I970',
  // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I980',
  // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I990',
]

const ViewerMain = props => {
  const size = useWindowSize()

  const [cornerstoneElement, setCornerstoneElement] = useState(null)

  const [tools, setTools] = useState(toolsConfig)
  const [imageIds, setImageIds] = useState(imagesConfig)

  // 监听列表的点击
  useEffect(() => {
    const changeActiveImage = index => {
      cornerstone.loadImage(imageIds[index]).then(image => {
        cornerstone.displayImage(cornerstoneElement, image)
      })
    }
    if (cornerstoneElement) {
      changeActiveImage(props.index)
    }
  }, [cornerstoneElement, imageIds, props.index])

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
      const index = imageIds.findIndex(item => item === curImageId)
      console.log(index)
    })
  }

  return (
    <div className="viewer-main-box">
      <Toolbar handleToolbarClick={handleToolbarClick} />
      <CornerstoneViewport
        viewportOverlayComponent={CustomOverlay}
        onElementEnabled={elementEnabledEvt => handleElementEnabledEvt(elementEnabledEvt)}
        tools={tools}
        imageIds={imageIds}
        style={{ minWidth: '100%', height: `${size.height - 85}px`, flex: '1' }}
      />
    </div>
  )
}

export default ViewerMain
