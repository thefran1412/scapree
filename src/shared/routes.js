import index from './pages/index.js'
import room from './pages/room.js'
import login from './pages/login.js'
import register from './pages/register.js'

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
    path: '/register',
    component: register
  }
]

export default routes
