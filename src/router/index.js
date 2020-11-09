import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import NoticeAdmin from '../views/NoticeAdmin.vue'
import FeedBackAdmin from '../views/FeedBackAdmin.vue'
import FengcaiAdmin from '../views/FengcaiAdmin.vue'
import UserAdmin from '../views/UserAdmin.vue'
import ClassAdmin from '../views/ClassAdmin.vue'
import Tongji from '../views/Tongji.vue'
import Navbar from '../components/Navbar.vue'
import Datil from '../views/Datil.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      head:Navbar,
      main:Home
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    components: {
      head:Navbar,
      main:Admin
    }
  },
  {
    path: '/noticeadmin',
    name: 'NoticeAdmin',
    components: {
      head:Navbar,
      main:NoticeAdmin
    }
  },
  {
    path: '/feedbackadmin',
    name: 'FeedBackAdmin',
    components: {
      head:Navbar,
      main:FeedBackAdmin
    }
  },
  {
    path: '/classadmin',
    name: 'ClassAdmin',
    components: {
      head:Navbar,
      main:ClassAdmin
    }
  },
  {
    path: '/fengcaiadmin',
    name: 'FengcaiAdmin',
    components: {
      head:Navbar,
      main:FengcaiAdmin
    }
  },
  {
    path: '/useradmin',
    name: 'UserAdmin',
    components: {
      head:Navbar,
      main:UserAdmin
    }
  },
  {
    path: '/tongji',
    name: 'Tongji',
    components: {
      head:Navbar,
      main:Tongji
    }
  },
  {
    path: '/datil',
    name: 'Datil',
    components: {
      head:Navbar,
      main:Datil
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
