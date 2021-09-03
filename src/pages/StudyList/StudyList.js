import React from 'react'
import './StudyList.scss'
import { Link } from 'react-router-dom'

const StudyList = () => {
  return (
    <div className="study-list">
      <Link to="/studyList">StudyList</Link>
      <br />
      <Link to="/viewer/1.3.6.1.4.1.14519.5.2.1.7009.2403.871108593056125491804754960339">Viewer</Link>
    </div>
  )
}

export default StudyList
