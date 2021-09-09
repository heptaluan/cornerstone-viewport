import React, { useState } from 'react'
import './RightSidePanel.scss'
import IconFont from '../common/IconFont/index'
import { Popover, Checkbox } from 'antd'

const RightSidePanel = () => {
  const noduleList = [
    {
      id: 1,
      num: 111,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 2,
      num: 112,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 3,
      num: 113,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 4,
      num: 114,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 5,
      num: 115,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 6,
      num: 116,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 7,
      num: 117,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 8,
      num: 118,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 9,
      num: 119,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 10,
      num: 120,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 11,
      num: 121,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
    {
      id: 12,
      num: 122,
      size: '12.35/6.49',
      type: '肺内实性',
      risk: '17%',
      soak: 'AAH',
    },
  ]

  // 多选
  const [checkedList, setCheckedList] = useState(Array(12).fill(true))
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(true)

  const onChange = (e, index) => {
    const newArr = checkedList.slice(0)
    newArr[index] = e.target.checked
    setCheckedList(newArr)
    if (newArr.every(item => item === true)) {
      setIndeterminate(false)
      setCheckAll(true)
    } else {
      setIndeterminate(true)
      setCheckAll(false)
    }
  }

  const onCheckAllChange = e => {
    setCheckAll(e.target.checked)
    if (e.target.checked) {
      setCheckedList(Array(12).fill(true))
    } else {
      setCheckedList(Array(12).fill(false))
    }
  }

  // 弹出层
  const [showPopover, setShowPopover] = useState({
    index: 0,
    visible: false,
  })

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

  // 弹出层按钮事件
  const handleHideNodule = () => {
    setShowPopover({
      visible: false,
      index: 0,
    })
  }

  return (
    <div className="right-side-panel-box">
      <div className="nodule-list-box">
        <div className="title">结点列表（5）</div>
        <div className="table-title">
          <div className="icon">
            <IconFont style={{ fontSize: '16px' }} type="icon-leimupinleifenleileibie" />
          </div>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            <div className="num">中心帧</div>
          </Checkbox>
          <div className="size">大小</div>
          <div className="type">类型</div>
          <div className="risk">风险</div>
          <div className="soak">浸润</div>
          <div className="more">
            <IconFont style={{ fontSize: '16px' }} type="icon-leimupinleifenleileibie" />
          </div>
        </div>
        <div className="table-content">
          {noduleList.map((item, index) => (
            <div key={item.id} className="table-item">
              <div className="icon">{item.id}</div>
              <Checkbox onChange={e => onChange(e, index)} checked={checkedList[index]}>
                <div className="num">{item.num}</div>
              </Checkbox>
              <div className="size">{item.size}</div>
              <div className="type">{item.type}</div>
              <div className="risk">{item.risk}</div>
              <div className="soak">{item.soak}</div>
              <div className="more">
                <Popover
                  placement="left"
                  visible={showPopover.index === index && showPopover.visible}
                  onVisibleChange={e => handleVisibleChange(e, index)}
                  content={
                    <div className="btn-group">
                      <div onClick={handleHideNodule} className="button">
                        隐藏结点
                      </div>
                      <div onClick={handleHideNodule} className="button">
                        标注
                      </div>
                    </div>
                  }
                  trigger="click"
                >
                  <IconFont style={{ fontSize: '16px' }} type="icon-shenglvehao" />
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="image-info-box">
        <div className="title">患者报告</div>
        <div className="info-box">
          <div className="report-box">
            <div className="title">影像所见</div>
            <div className="report-content">{/* <div className="viewer-item">于右肺上叶前段影像(MG21-23)可见一部分实性结节,大小约16.83mm大3.41mm,CT值约-52HU,体积1532mm3</div> */}</div>
          </div>
          <div className="suggest-box">
            <div className="title">影像建议</div>
            <div className="suggest-content">
              <div className="content-wrap">
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSidePanel
