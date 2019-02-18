import Vue from 'vue'
import Router from 'vue-router'
import TreeChart from '@/components/TreeChart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'TreeChart',
      component: TreeChart
    }
  ]
})
