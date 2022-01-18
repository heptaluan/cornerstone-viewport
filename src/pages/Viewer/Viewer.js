import React, { useState, useEffect, useCallback } from 'react'
import './Viewer.scss'
import Header from '../../components/Header/Header'
import LeftSidePanel from '../../components/LeftSidePanel/LeftSidePanel'
import ViewerMain from '../../components/ViewerMain/ViewerMain'
import MiddleSidePanel from '../../components/MiddleSidePanel/MiddleSidePanel'
import cornerstone from 'cornerstone-core'
import cornerstoneTools from 'cornerstone-tools'
import NoduleInfo from '../../components/common/NoduleInfo/NoduleInfo'
import MarkNoduleTool from '../../components/common/MarkNoduleTool/MarkNoduleTool'
import MarkDialog from '../../components/common/MarkDialog/MarkDialog'
import { getMedicalList, getImageList, getPatientsList } from '../../api/api'
import { getURLParameters } from '../../util/index'
import { data } from './data'

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
    'wadouri:http://im.ananpan.com/omics/image/CHENSHUHUA/20211230/IMG00230.dcm',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I710',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I720',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I730',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I740',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I750',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I760',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I770',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I780',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I790',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I800',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I810',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I820',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I830',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I840',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I850',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I860',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I870',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I880',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I890',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I900',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I910',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I920',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I930',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I940',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I950',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I960',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I970',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I980',
    // 'wadouri:http://192.168.1.158:9000/medical.case.data/陈芳春/image/I990',
  ]

  const defaultNoduleList = [
    {
      id: 1,
      num: 111,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 1111111111111111111111。',
      info: '左肺下叶，前内基底段，类型： 磨玻璃，大小： 8.75 * 8.27mm，体积： 288mm³，标准直径： 8.2mm，恶性风险： 21%，浸润分型： AAH，IA概率： 22%，钙化情况： 非钙化结节，中心密度： -400HU，平均密度： -687.89HU，最大密度： -144HU，最小密度： -795HU',
      checked: true,
      active: true,
    },
    {
      id: 2,
      num: 112,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 2222222222',
      info: '左肺下叶，前内基底段，类型： 磨玻璃，大小： 8.75 * 8.27mm，体积： 288mm³，标准直径： 8.2mm，恶性风险： 21%，浸润分型： AAH，IA概率： 22%，钙化情况： 非钙化结节，中心密度： -400HU，平均密度： -687.89HU，最大密度： -144HU，最小密度： -795HU',
      checked: true,
      active: false,
    },
    {
      id: 3,
      num: 113,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 3333333',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 4,
      num: 114,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 4444444。',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 5,
      num: 115,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 5555555。',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 6,
      num: 116,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 6666666666',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 7,
      num: 117,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 7777777777777777',
      info: '左肺下叶，前内基底段，类型： 磨玻璃，大小： 8.75 * 8.27mm，体积： 288mm³，标准直径： 8.2mm，恶性风险： 21%，浸润分型： AAH，IA概率： 22%，钙化情况： 非钙化结节，中心密度： -400HU，平均密度： -687.89HU，最大密度： -144HU，最小密度： -795HU',
      checked: true,
      active: false,
    },
    {
      id: 8,
      num: 118,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 8888888888888888888',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 9,
      num: 119,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 99999999999999999999',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 10,
      num: 120,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 ～～～～～～～～～～～～～～',
      info: '左肺下叶，前内基底段，类型： 磨玻璃，大小： 8.75 * 8.27mm，体积： 288mm³，标准直径： 8.2mm，恶性风险： 21%，浸润分型： AAH，IA概率： 22%，钙化情况： 非钙化结节，中心密度： -400HU，平均密度： -687.89HU，最大密度： -144HU，最小密度： -795HU',
      checked: true,
      active: false,
    },
    {
      id: 11,
      num: 121,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 ！！！！！！！！！！！！。',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 12,
      num: 122,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '',
      checked: true,
      active: false,
    },

    {
      id: 13,
      num: 132,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 14,
      num: 142,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '左肺下叶，前内基底段，类型： 磨玻璃，大小： 8.75 * 8.27mm，体积： 288mm³，标准直径： 8.2mm，恶性风险： 21%，浸润分型： AAH，IA概率： 22%，钙化情况： 非钙化结节，中心密度： -400HU，平均密度： -687.89HU，最大密度： -144HU，最小密度： -795HU',
      checked: true,
      active: false,
    },
    {
      id: 15,
      num: 152,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 16,
      num: 162,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 17,
      num: 172,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '左肺下叶，前内基底段，类型： 磨玻璃，大小： 8.75 * 8.27mm，体积： 288mm³，标准直径： 8.2mm，恶性风险： 21%，浸润分型： AAH，IA概率： 22%，钙化情况： 非钙化结节，中心密度： -400HU，平均密度： -687.89HU，最大密度： -144HU，最小密度： -795HU',
      checked: true,
      active: false,
    },
    {
      id: 18,
      num: 182,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 19,
      num: 192,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '',
      checked: true,
      active: false,
    },
    {
      id: 20,
      num: 122,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
      text: '于右肺上叶影像可见一结节，大小约 @@@@@@@@@@@@@@',
      info: '左肺下叶，前内基底段，类型： 磨玻璃，大小： 8.75 * 8.27mm，体积： 288mm³，标准直径： 8.2mm，恶性风险： 21%，浸润分型： AAH，IA概率： 22%，钙化情况： 非钙化结节，中心密度： -400HU，平均密度： -687.89HU，最大密度： -144HU，最小密度： -795HU',
      checked: true,
      active: false,
    },
  ]

  // 初始化
  const [toolsConfig, setToolsConfig] = useState(defaultTools)
  const [imagesConfig, setImagesConfig] = useState([])
  const [sequenceListData, setLeftSidePanelData] = useState([])
  const [noduleList, setNoduleList] = useState([])
  const [patients, setPatients] = useState([])

  // 初始化序列和图片列表
  useEffect(() => {
    const fetchData = async () => {
      const result = await getMedicalList(
        getURLParameters(window.location.href).resource,
        getURLParameters(window.location.href).type
      )
      // console.log(result)
      if (result.data.code === 200 && result.data.result.length > 0) {
        setLeftSidePanelData(result.data.result)
        const instanceUid = result.data.result[0].instanceUid
        const res = await getImageList(instanceUid)
        setImageList(res)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 初始化表格数据
  useEffect(() => {
    formatNodeData(data)
    // setNoduleList(defaultNoduleList)
    // setNoduleInfo(defaultNoduleList[0].info)
    // setNoduleList([])
    setNoduleInfo('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 初始化病人信息
  useEffect(() => {
    const fetchData = async () => {
      const result = await getPatientsList(
        getURLParameters(window.location.href).resource,
        getURLParameters(window.location.href).type
      )
      // console.log(result)
      if (result.data.code === 200) {
        setPatients(result.data.result)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 多选
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(true)

  // 图片详情
  const [noduleInfo, setNoduleInfo] = useState(null)

  // 视图元素
  const [cornerstoneElement, setCornerstoneElement] = useState(null)

  // 弹出层
  const [showPopover, setShowPopover] = useState({
    index: 0,
    visible: false,
  })

  // ===========================================================

  // 添加结节标注
  const addNodeTool = cornerstoneElement => {
    const measurementData = {
      visible: true,
      active: true,
      color: undefined,
      invalidated: true,
      handles: {
        start: {
          x: 293,
          y: 229,
          highlight: true,
          active: true,
        },
        end: {
          x: 218,
          y: 181,
          highlight: true,
          active: true,
        },
      },
    }
    console.log(111)
    cornerstoneTools.clearToolState(cornerstoneElement, 'MarkNodule')
    cornerstoneTools.addToolState(cornerstoneElement, 'MarkNodule', measurementData)
    cornerstone.updateImage(cornerstoneElement)
  }

  // 设置图片列表
  const setImageList = res => {
    if (res.data.code === 200 && res.data.result.length > 0) {
      const imageList = []
      res.data.result.forEach(item => {
        imageList.push(`wadouri:${item.ossUrl}`)
      })
      // console.log(imageList)
      setImagesConfig(imageList)
    }
  }

  // 序列点击事件
  const handleSequenceListClick = async instanceUid => {
    const res = await getImageList(instanceUid)
    setImageList(res)
  }

  // ===========================================================

  // 单选
  const onCheckChange = (e, index) => {
    noduleList[index].checked = e.target.checked
    setNoduleList([...noduleList])
    if (noduleList.every(item => item.checked === true)) {
      setIndeterminate(false)
      setCheckAll(true)
    } else {
      setIndeterminate(true)
      setCheckAll(false)
    }
  }

  // 全选
  const onCheckAllChange = e => {
    setCheckAll(e.target.checked)
    if (e.target.checked) {
      noduleList.map(item => (item.checked = true))
      setNoduleList([...noduleList])
    } else {
      noduleList.map(item => (item.checked = false))
      setNoduleList([...noduleList])
    }
  }

  // 弹出层按钮事件
  const handleHideNodule = (e, id) => {
    noduleList.splice(
      noduleList.findIndex(item => item.id === id),
      1
    )
    setNoduleList([...noduleList])
    setShowPopover({
      visible: false,
      index: 0,
    })
  }

  // 列表点击事件
  const handleCheckedListClick = index => {
    if (noduleList[index]) {
      noduleList.map(item => (item.active = false))
      noduleList[index].active = true
      setNoduleInfo(noduleList[index].info)
      setNoduleList([...noduleList])
      setTimeout(() => {
        // const tableItemActive = document.querySelector('#tableIItemBox .item-active')
        const viewerItemActive = document.querySelector('#viewerItemBox .item-active')
        // tableItemActive && tableItemActive.scrollIntoView()
        viewerItemActive && viewerItemActive.scrollIntoView()
      }, 0)
    }

    // 设置当前视图选中项
    if (cornerstoneElement) {
      changeActiveImage(index, cornerstoneElement)
    }
  }

  // 列表右侧操作菜单
  const handleVisibleChange = (visible, index) => {
    if (visible) {
      setShowPopover({
        visible: visible,
        index: index,
      })
    } else {
      setShowPopover({
        visible: visible,
        index: 0,
      })
    }
  }

  // ===========================================================

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
      case 'MarkNodule':
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

  // 切换当前视图
  const changeActiveImage = (index, cornerstoneElement) => {
    cornerstone.loadImage(imagesConfig[index - 1]).then(image => {
      cornerstone.displayImage(cornerstoneElement, image)
      cornerstoneTools.addStackStateManager(cornerstoneElement, ['stack'])
      cornerstoneTools.addToolState(cornerstoneElement, 'stack', {
        currentImageIdIndex: Number(index - 1),
        imageIds: imagesConfig,
      })
    })
  }

  // 工具回调
  const [showMark, setShowMark] = useState(false)
  const showMarkDialog = (e, cornerstoneElement) => {
    const tool = cornerstoneTools.getToolState(cornerstoneElement, 'MarkNodule')
    let mark = document.getElementById('mark')
    if (tool && mark && mark.classList.contains('active')) {
      console.log(tool)
      setShowMark(true)
    }
  }

  // 工具操作函数
  const handleCloseCallback = () => {
    const tool = cornerstoneTools.getToolState(cornerstoneElement, 'MarkNodule')
    const toolData = tool.data.pop()
    cornerstoneTools.removeToolState(cornerstoneElement, 'MarkNodule', toolData)
    cornerstone.updateImage(cornerstoneElement)
    setShowMark(false)
  }

  const handleSubmitCallback = value => {
    const tool = cornerstoneTools.getToolState(cornerstoneElement, 'MarkNodule')

    if (tool) {
      const toolData = tool.data.pop()
      const measurementData = {
        visible: true,
        active: false,
        color: undefined,
        invalidated: true,
        handles: {
          start: {
            x: toolData.handles.start.x,
            y: toolData.handles.start.y,
            highlight: true,
            active: false,
          },
          end: {
            x: toolData.handles.end.x,
            y: toolData.handles.end.y,
            highlight: true,
            active: true,
          },
        },
      }
      cornerstoneTools.clearToolState(cornerstoneElement, 'MarkNodule')
      cornerstoneTools.addToolState(cornerstoneElement, 'MarkNodule', measurementData)
      cornerstone.updateImage(cornerstoneElement)
      setShowMark(false)
    }
  }

  // 监听视图变化事件
  const handleElementEnabledEvt = elementEnabledEvt => {
    const cornerstoneElement = elementEnabledEvt.detail.element
    setCornerstoneElement(cornerstoneElement)
    cornerstoneTools.addTool(MarkNoduleTool)

    cornerstoneElement.addEventListener('cornerstonenewimage', newImage => {
      cornerstoneTools.setToolActive('MarkNodule', { mouseButtonMask: 1 })
      setTimeout(() => {
        windowChange(cornerstoneElement, newImage.detail.image, 2)
        addNodeTool(cornerstoneElement)
        cornerstoneTools.setToolActive('Wwwc', { mouseButtonMask: 1 })
      }, 0)
      // const viewportOptions = {
      //   voi: {
      //     windowWidth: 1500,
      //     windowCenter: -400
      //   }
      // }
      // cornerstone.displayImage(cornerstoneElement, newImage.detail.image, viewportOptions)
    })

    cornerstoneElement.addEventListener('cornerstoneimageloaded', newImage => {
      // console.log(1)
    })

    cornerstoneElement.addEventListener('cornerstoneimagerendered', imageRenderedEvent => {
      const curImageId = imageRenderedEvent.detail.image.imageId
      const index = imagesConfig.findIndex(item => item === curImageId)
      handleCheckedListClick(index)

      // const viewportOptions = {
      //   scale: 1.0,
      //   voi: {
      //     windowWidth: 1500,
      //     windowCenter: -400
      //   },
      //   invert: false,
      //   pixelReplication: false
      // }
      // cornerstone.displayImage(cornerstoneElement, imageRenderedEvent.detail.image, viewportOptions)
    })

    cornerstoneElement.addEventListener('cornerstonetoolsmouseup', e => {
      if (localStorage.getItem('active') === 'true') {
        showMarkDialog(e, cornerstoneElement)
      }
    })
  }

  // 调整窗宽窗位
  const windowChange = (element, image, index) => {
    /*
     * index=1 ww:default, wl:default
     * index=2 ww:1500, wl:-450
     * index=3 ww:250, wl:30
     * index=4 ww:1000, wl:250
     * index=5 ww:300, wl:40
     */

    const viewportDefault = cornerstone.getDefaultViewportForImage(element, image)
    const viewport = cornerstone.getViewport(element)
    viewport.voiLUT = undefined

    if (index === 1) {
      viewport.voi.windowWidth = viewportDefault.voi.windowWidth
      viewport.voi.windowCenter = viewportDefault.voi.windowCenter
    } else if (index === 2) {
      viewport.voi.windowWidth = 1500
      viewport.voi.windowCenter = -400
    } else if (index === 3) {
      viewport.voi.windowWidth = 250
      viewport.voi.windowCenter = 30
    } else if (index === 4) {
      viewport.voi.windowWidth = 1000
      viewport.voi.windowCenter = 250
    } else if (index === 5) {
      viewport.voi.windowWidth = 300
      viewport.voi.windowCenter = 40
    }

    cornerstone.setViewport(element, viewport)
  }

  // ===========================================================

  // 导出图片
  const exportImages = () => {
    saveAs(cornerstoneElement, 'viewportImage.png')
  }

  const saveAs = (element, filename, mimetype = 'image/png') => {
    // Setting the default value for mimetype to image/png
    const canvas = element.querySelector('canvas')

    // If we are using IE, use canvas.msToBlob
    if (canvas.msToBlob) {
      const blob = canvas.msToBlob()

      return window.navigator.msSaveBlob(blob, filename)
    }

    // Thanks to Ken Fyrstenber
    // http://stackoverflow.com/questions/18480474/how-to-save-an-image-from-canvas
    const lnk = document.createElement('a')

    // The key here is to set the download attribute of the a tag
    lnk.download = filename

    // Convert canvas content to data-uri for link. When download
    // Attribute is set the content pointed to by link will be
    // Pushed as 'download' in HTML5 capable browsers
    lnk.href = canvas.toDataURL(mimetype, 1)

    // Create a 'fake' click-event to trigger the download
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')

      e.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)

      lnk.dispatchEvent(e)
    } else if (lnk.fireEvent) {
      lnk.fireEvent('onclick')
    }
  }

  const compare = p => {
    return function (m, n) {
      return m[p] - n[p]
    }
  }

  const formatNodeData = data => {
    console.log(data)
    const nodulesList = []
    let index = 0
    if (data.code === 10000) {
      const res = data.detectionResult.nodulesList
      for (let i = 0; i < res.length; i++) {
        for (let j = 0; j < res[i].rois.length; j++) {
          const rois = res[i].rois[j]
          nodulesList.push({
            id: index,
            num: rois.key,
            size: res[i].diameter,
            type: res[i].featureLabel.value,
            risk: (res[i].scrynMaligant * 100).toFixed(0) + '%',
            soak: '',
            text: '123',
            info: '',
            checked: true,
            active: false,
          })
          index++
        }
      }
      console.log(nodulesList)
      setNoduleList(nodulesList)
    } else {
      setNoduleList([])
      console.log(`数据加载失败`)
    }
  }

  return (
    <div className="viewer-box">
      <Header data={patients} exportImages={exportImages} />
      <div className="viewer-center-box">
        <LeftSidePanel data={sequenceListData} handleSequenceListClick={handleSequenceListClick} />
        <MiddleSidePanel
          handleVisibleChange={handleVisibleChange}
          handleCheckedListClick={handleCheckedListClick}
          handleHideNodule={handleHideNodule}
          onCheckChange={onCheckChange}
          onCheckAllChange={onCheckAllChange}
          showPopover={showPopover}
          indeterminate={indeterminate}
          checkAll={checkAll}
          noduleList={noduleList}
        />
        <ViewerMain
          handleToolbarClick={handleToolbarClick}
          handleElementEnabledEvt={handleElementEnabledEvt}
          toolsConfig={toolsConfig}
          imagesConfig={imagesConfig}
        />
      </div>
      <NoduleInfo noduleInfo={noduleInfo} />
      {showMark ? (
        <MarkDialog handleCloseCallback={handleCloseCallback} handleSubmitCallback={handleSubmitCallback} />
      ) : null}
    </div>
  )
}

export default Viewer
