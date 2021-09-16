import React, { useState, useEffect } from 'react'
import './MiddleSidePanel.scss'
import IconFont from '../common/IconFont/index'
import { Popover, Checkbox } from 'antd'
import NoduleInfo from '../common/NoduleInfo/NoduleInfo'
import { Button } from 'antd'

const MiddleSidePanel = props => {
  const noduleList = [
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

  // 多选
  const [checkedList, setCheckedList] = useState(noduleList)
  const [indeterminate, setIndeterminate] = useState(false)
  const [checkAll, setCheckAll] = useState(true)

  // 图片详情
  const [noduleInfo, setNoduleInfo] = useState(null)

  // 监听视图切换
  useEffect(() => {
    const info = checkedList[props.inageIndex] ? checkedList[props.inageIndex].info : ''
    setNoduleInfo(info)
    handleCheckedListClick(props.inageIndex)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.inageIndex])

  const onChange = (e, index) => {
    checkedList[index].checked = e.target.checked
    setCheckedList([...checkedList])
    if (checkedList.every(item => item.checked === true)) {
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
      checkedList.map(item => (item.checked = true))
      setCheckedList([...checkedList])
    } else {
      checkedList.map(item => (item.checked = false))
      setCheckedList([...checkedList])
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
  const handleHideNodule = (e, id) => {
    checkedList.splice(
      checkedList.findIndex(item => item.id === id),
      1
    )
    setCheckedList([...checkedList])
    setShowPopover({
      visible: false,
      index: 0,
    })
  }

  // 列表点击事件
  const handleCheckedListClick = index => {
    if (checkedList[index]) {
      checkedList.map(item => (item.active = false))
      checkedList[index].active = true
      setCheckedList([...checkedList])
      setTimeout(() => {
        const tableItemActive = document.querySelector('#tableIItemBox .item-active')
        const viewerItemActive = document.querySelector('#viewerItemBox .item-active')
        tableItemActive && tableItemActive.scrollIntoView()
        viewerItemActive && viewerItemActive.scrollIntoView()
      }, 0)
      // 将当前项传递给预览组件
      props.getCheckedIndex(index)
    }
  }

  return (
    <div className="middle-side-panel-box">
      <div className="nodule-list-box">
        <div className="title">结点列表（{checkedList.length}）</div>
        <div className="table-box">
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
          <div id="tableIItemBox" className="table-content">
            {checkedList.map((item, index) => (
              <div key={item.id} className={`table-item ${item.active ? 'item-active' : ''}`} onClick={e => handleCheckedListClick(index)}>
                <div className="icon">{item.id}</div>
                <Checkbox onChange={e => onChange(e, index)} checked={item.checked}>
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
                        <div onClick={e => handleHideNodule(e, item.id)} className="button">
                          隐藏结点
                        </div>
                        <div onClick={e => handleHideNodule(e, item.id)} className="button">
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
      </div>
      <div className="image-info-box">
        <div className="title">患者报告</div>
        <div className="info-box">
          <div className="report-box">
            <div className="title">影像所见</div>
            <div id="viewerItemBox" className="report-content">
              {checkedList.map((item, index) => {
                return item.checked ? (
                  <div key={item.id} className={`viewer-item ${item.active ? 'item-active' : ''}`} onClick={e => handleCheckedListClick(index)}>
                    {item.text}
                  </div>
                ) : null
              })}
            </div>
          </div>
          <div className="suggest-box">
            <div className="title">影像建议</div>
            <div className="suggest-content">
              <div className="suggest-content-wrap">
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
                <div className="suggest-item">于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。</div>
              </div>
              <div className="save">
                <Button type="primary" size="small">
                  保存
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NoduleInfo noduleInfo={noduleInfo} />
    </div>
  )
}

export default MiddleSidePanel
