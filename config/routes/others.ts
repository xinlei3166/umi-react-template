export default [
  {
    exact: true,
    hidden: true,
    breadcrumb: '首页',
    name: 'home',
    path: '/',
    component: '@/pages/home'
  },
  {
    exact: true,
    hidden: true,
    breadcrumb: '登录',
    name: 'login',
    path: '/login',
    component: '@/pages/login'
  },
  {
    exact: true,
    hidden: true,
    breadcrumb: '404',
    name: '404',
    path: '/404',
    component: '@/pages/404'
  }
]
