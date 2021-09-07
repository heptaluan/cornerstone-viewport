import React from 'react'
import './LeftSidePanel.scss'

const LeftSidePanel = () => {
  const data = [
    {
      id: 1,
      cover: 'https://scryn.dianei-ai.com/img/bc09bb59d9b7619bb244.jpg',
      sequence: '9021194',
    },
    {
      id: 2,
      cover: 'https://scryn.dianei-ai.com/img/bc09bb59d9b7619bb244.jpg',
      sequence: '9021194',
    },
    {
      id: 3,
      cover: 'https://scryn.dianei-ai.com/img/bc09bb59d9b7619bb244.jpg',
      sequence: '9021194',
    },
  ]
  return (
    <div className="left-side-panel-box">
      {data.map((item, index) => (
        <div key={item.id} className="list-item">
          <div className="list-cover">
            <img alt="lcover" src={item.cover} />
          </div>
          <div className="list-content">序列：{item.sequence}</div>
        </div>
      ))}
    </div>
  )
}

export default LeftSidePanel
