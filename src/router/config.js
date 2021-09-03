import IndexComponent from '../components/index'
import Viewer from '../pages/Viewer/Viewer'
import StudyList from '../pages/StudyList/StudyList'

const routes = [
  {
    path: '/',
    component: IndexComponent,
    routes: [
      {
        path: '/studyList',
        component: StudyList,
        routes: [],
      },
      {
        path: '/viewer/:studyInstanceUids',
        component: Viewer,
        routes: [],
      },
    ],
  },
]

export default routes
