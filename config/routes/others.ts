export default [
  {
    exact: true,
    hidden: true,
    title: '首页',
    name: 'home',
    path: '/',
    component: '@/pages/home'
  },
  {
    exact: true,
    hidden: true,
    title: '登录',
    name: 'login',
    path: '/login',
    component: '@/pages/login'
  },
  {
    exact: true,
    hidden: true,
    title: '404',
    name: '404',
    path: '/404',
    component: '@/pages/404'
  }
]
