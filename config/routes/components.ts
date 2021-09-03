// 存放左侧菜单相关的路由，icon不能为空
export default [
  {
    icon: 'iconreloadtime',
    breadcrumb: '常用组件',
    name: 'components',
    path: '/components',
    routes: [
      {
        exact: true,
        icon: 'iconreloadtime',
        breadcrumb: 'hello',
        name: 'components_hello',
        path: '/components/hello',
        component: '@/pages/components/hello'
      },
      {
        exact: true,
        icon: 'iconuser',
        breadcrumb: 'bus',
        name: 'components_bus',
        path: '/components/bus',
        component: '@/pages/components/bus'
      }
    ]
  },
  {
    icon: 'iconappstore',
    breadcrumb: '其他组件',
    name: 'others',
    path: '/others',
    routes: [
      {
        exact: true,
        icon: 'iconsetting',
        breadcrumb: 'react',
        name: 'others_react',
        path: '/others/react',
        component: '@/pages/others/react'
      }
    ]
  }
]
