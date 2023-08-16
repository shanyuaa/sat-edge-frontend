import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import EdgeNode from '@/views/EdgeNode'
import AddEdgeNode from '@/views/AddEdgeNode'
import JobManagement from '@/views/JobManagement'
import NodeInfo from '@/views/NodeInfo'
import PodManagement from '@/views/PodManagement';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path:'/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/node',
      name: 'node',
      component: EdgeNode
    },
    {
      path: '/addnode',
      name: 'addnode',
      component: AddEdgeNode
    },
    {
      path: '/job',
      name: 'job',
      component: JobManagement
    },
    {
      path: '/pod',
      name: 'pod',
      component: PodManagement
    },
    {
      path: '/nodeinfo',
      name: 'nodeinfo',
      component: NodeInfo
    },
  ]
})
