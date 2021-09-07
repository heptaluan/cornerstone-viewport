import React from 'react'
import './RightSidePanel.scss'

const RightSidePanel = () => {
  return (
    <div className="right-side-panel-box">
      <div className="list-table-box">
        <div className="title">结点列表（5）</div>
        <div className="list-table">
          <div className="list-table-title">
            <div className="icon">ICON</div>
            <div className="num">中心帧</div>
            <div className="size">大小</div>
            <div className="type">类型</div>
            <div className="risk">风险</div>
            <div className="soak">浸润</div>
            <div className="more">ICON</div>
          </div>
          <div className="list-table-content">
            <div className="icon">1</div>
            <div className="num">28</div>
            <div className="size">5.85/5.35</div>
            <div className="type">肺内实性</div>
            <div className="risk">17%</div>
            <div className="soak">！</div>
            <div className="more">...</div>
          </div>
        </div>
      </div>
      <div className="list-viewer-box">
        <div className="title">影像所见</div>
        <div className="list-viewer">
          <div className="viewer-item">于右肺上叶前段影像(MG21-23)可见一部分实性结节,大小约16.83mm大3.41mm,CT值约-52HU,体积1532mm3</div>
          <div className="viewer-item">于右肺上叶前段影像(MG21-23)可见一部分实性结节,大小约16.83mm大3.41mm,CT值约-52HU,体积1532mm3</div>
          <div className="viewer-item">于右肺上叶前段影像(MG21-23)可见一部分实性结节,大小约16.83mm大3.41mm,CT值约-52HU,体积1532mm3</div>
        </div>
      </div>
      <div className="list-suggest-box">
        <div className="title">影像建议</div>
        <div className="list-suggest">
          于右肺上叶前段影像(IMG19)可见一胸膜实性结节,大小约413mm*3.43m CT值约452HU,体积50mm3。
        </div>
      </div>
    </div>
  )
}

export default RightSidePanel
