import React from 'react'
import './LeftSidePanel.scss'

const LeftSidePanel = () => {
  const data = [
    {
      id: 1,
      sequence: '9021194',
      fps: 10
    },
    {
      id: 2,
      sequence: '9021194',
      fps: 120
    },
    {
      id: 3,
      sequence: '9021194',
      fps: 150
    },
    {
      id: 4,
      sequence: '9021194',
      fps: 5
    },
    {
      id: 5,
      sequence: '9021194',
      fps: 222
    },
  ]
  return (
    <div className="left-side-panel-box">
      <div className="list-box-wrap">
        <div className="list-box">
          {data.map((item, index) => (
            <div key={item.id} className="list-item">
              <div className="num">序列：{item.sequence}</div>
              <div className="fps">{item.fps} 帧</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftSidePanel
