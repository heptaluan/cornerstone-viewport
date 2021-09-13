import React, { useState } from 'react'
import './Toolbar.scss'
import IconFont from '../common/IconFont/index'
import { Tooltip } from 'antd'

const toolbarList = [
  {
    id: 1,
    text: '自动播放',
    icon: <IconFont style={{ fontSize: '24px' }} type="icon-asmkticon0229" />,
    type: 'auto',
    checked: false,
  },
  {
    id: 2,
    text: '垂直翻转',
    icon: <IconFont style={{ fontSize: '20px' }} type="icon-fanzhuan1" />,
    type: 'vertical',
    checked: false,
  },
  {
    id: 3,
    text: '水平翻转',
    icon: <IconFont style={{ fontSize: '20px' }} type="icon-fanzhuan" />,
    type: 'horizontal',
    checked: false,
  },
  {
    id: 4,
    text: '放大',
    icon: <IconFont style={{ fontSize: '26px' }} type="icon-fangda" />,
    type: 'scale',
    checked: false,
  },
  {
    id: 5,
    text: '聚焦',
    icon: <IconFont style={{ fontSize: '24px' }} type="icon-jujiao" />,
    type: 'focus',
    checked: false,
  },
  {
    id: 6,
    type: 'hr',
  },
  {
    id: 7,
    text: '圆形',
    icon: <IconFont style={{ fontSize: '24px' }} type="icon-juxing" />,
    type: 'circle',
    checked: false,
  },
  {
    id: 8,
    text: '矩形',
    icon: <IconFont style={{ fontSize: '24px' }} type="icon-asmkticon0229" />,
    type: 'rect',
    checked: false,
  },
  {
    id: 9,
    text: '角度选择',
    icon: <IconFont style={{ fontSize: '18px' }} type="icon-jiaoduceliang" />,
    type: 'angle',
    checked: false,
  },
  {
    id: 10,
    text: '尺子',
    icon: <IconFont style={{ fontSize: '22px' }} type="icon-02-chizi" />,
    type: 'ruler',
    checked: false,
  },
  {
    id: 11,
    text: '清除',
    icon: <IconFont style={{ fontSize: '18px' }} type="icon-qingchuhuancun" />,
    type: 'clear',
    checked: false,
  },
  {
    id: 12,
    text: '标记',
    icon: <IconFont style={{ fontSize: '20px' }} type="icon-shizi-" />,
    type: 'mark',
    checked: false,
  },
]

const Toolbar = props => {
  const [state, setstate] = useState(toolbarList)

  const handleToolbarClick = (e, index, type) => {
    if (type === 'auto' || type === 'vertical' || type === 'horizontal') {
      state[index].checked = !state[index].checked
      setstate([...state])
    } else {
      state[index].checked = !state[index].checked
      state.map(item => {
        if (item.type !== type && item.type !== 'auto' && item.type !== 'vertical' && item.type !== 'horizontal') item.checked = false
      })
      setstate([...state])
    }

    // 父组件传值
    props.handleToolbarClick(type, state[index].checked)
  }

  return (
    <ul className="tool-bar-box">
      {toolbarList.map((item, index) => {
        return item.type === 'hr' ? (
          <li key={item.id} className="hr">
            <div></div>
          </li>
        ) : (
          <li key={item.id} className={item.checked ? 'active' : ''} onClick={e => handleToolbarClick(e, index, item.type)}>
            <Tooltip title={item.text}>{item.icon}</Tooltip>
          </li>
        )
      })}
    </ul>
  )
}

export default Toolbar
