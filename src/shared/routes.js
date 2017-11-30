import index from './pages/index'
import login from './pages/login'
import logout from './pages/logout'
import register from './pages/register'
import home from './pages/home'
import room from './pages/room'
import addroom from './pages/addroom'
import editroom from './pages/editroom'
import companie from './pages/companie'
import editcompanie from './pages/editcompanie'

const routes = [
  {
    path: '/',
    component: index,
    exact: true
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
    path: '/room/add',
    component: addroom
  },
  {
    path: '/room/edit/:id',
    component: editroom
  },
  {
    path: '/room/:id',
    component: room,
    exact: true
  },
  {
    path: '/companie/edit/:id',
    component: editcompanie
  },
  {
    path: '/companie/:id',
    component: companie,
    exact: true
  }
]

export default routes
