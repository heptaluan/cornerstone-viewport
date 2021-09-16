import React, { useState } from 'react'
import './Viewer.scss'
import Header from '../../components/Header/Header'
import LeftSidePanel from '../../components/LeftSidePanel/LeftSidePanel'
import ViewerMain from '../../components/ViewerMain/ViewerMain'
import MiddleSidePanel from '../../components/MiddleSidePanel/MiddleSidePanel'

const Viewer = () => {
  const defaultTools = [
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

  const defaultImages = [
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
    'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I950',
    'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I960',
    'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I970',
    'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I980',
    'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I990',
  ]

  // 初始化
  const [toolsConfig, setToolsConfig] = useState(defaultTools)
  const [imagesConfig, setImagesConfig] = useState(defaultImages)

  // 转发当前选中项
  const [checkedIndex, setCheckedIndex] = useState(0)
  const getCheckedIndex = index => {
    setCheckedIndex(index)
  }

  // 转发当前选中帧
  const [inageIndex, setInageIndex] = useState(0)
  const getInageIndex = index => {
    setInageIndex(index)
  }

  return (
    <div className="viewer-box">
      <Header />
      <div className="viewer-center-box">
        <LeftSidePanel />
        <MiddleSidePanel getCheckedIndex={getCheckedIndex} inageIndex={inageIndex} />
        <ViewerMain toolsConfig={toolsConfig} imagesConfig={imagesConfig} getInageIndex={getInageIndex} checkedIndex={checkedIndex} />
      </div>
    </div>
  )
}

export default Viewer
