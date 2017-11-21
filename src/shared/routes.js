import index from './pages/index.js'
import room from './pages/room.js'
import login from './pages/login.js'
import logout from './pages/logout.js'
import register from './pages/register.js'
import home from './pages/home.js'

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
  }
]

export default routes
