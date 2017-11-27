import index from './pages/index'
import room from './pages/room'
import login from './pages/login'
import logout from './pages/logout'
import register from './pages/register'
import home from './pages/home'
import addroom from './pages/addroom'

const routes = [
  {
    path: '/',
    component: index,
    exact: true
  },
  {
    path: '/room/:id',
    component: room
  },
  {
    path: '/login',
    component: login
  },
  {
    path: '/logout',
    component: logout
  },
  {
    path: '/register',
    component: register
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/addroom',
    component: addroom
  }
]

export default routes
