import Vue from 'vue'
import Router from 'vue-router'

import MenuBar from '../components/MenuBar'
import PageTest from '../components/pages/PageTest'
import RecordList from '../components/RecordList'


Vue.use(Router)

export default new Router(
  {
    path: '/MenuBar',
    component: MenuBar
  }, {
    path: '/RecordList',
    component: RecordList
  }, {
    path: '/test',
    component: PageTest
  } // (缩写) 相当于 routes: routes
)


