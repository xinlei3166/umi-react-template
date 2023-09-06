// 存放左侧菜单相关的路由，icon不能为空
export default [
  {
    icon: 'iconreloadtime',
    title: '常用组件',
    name: 'components',
    path: '/components',
    routes: [
      {
        exact: true,
        icon: 'iconreloadtime',
        title: 'router',
        name: 'components_router',
        path: '/components/router',
        component: '@/pages/components/router'
      },
      {
        exact: true,
        icon: 'iconunorderedlist',
        title: 'store',
        name: 'components_store',
        path: '/components/store',
        component: '@/pages/components/store'
      },
      {
        exact: true,
        icon: 'iconappstoreadd',
        title: 'provide',
        name: 'components_provide',
        path: '/components/provide',
        component: '@/pages/components/provide'
      },
      {
        exact: true,
        icon: 'iconuser',
        title: 'bus',
        name: 'components_bus',
        path: '/components/bus',
        component: '@/pages/components/bus'
      },
      {
        exact: true,
        icon: 'iconappstore',
        title: 'table',
        name: 'components_table',
        path: '/components/table',
        component: '@/pages/components/table'
      },
      {
        exact: true,
        icon: 'iconappstore',
        title: 'fixed-table',
        name: 'components_fixedtable',
        path: '/components/fixed-table',
        component: '@/pages/components/table/fixed'
      },
      {
        exact: true,
        icon: 'iconsetting',
        title: 'sortable',
        name: 'components_sortable',
        path: '/components/sortable',
        component: '@/pages/components/sortable'
      }
    ]
  },
  {
    icon: 'iconappstore',
    title: '其他组件',
    name: 'others',
    path: '/others',
    routes: [
      {
        exact: true,
        icon: 'iconsearch',
        title: 'search',
        name: 'search',
        path: '/others/search',
        component: '@/components/search/demo'
      },
      {
        exact: true,
        icon: 'iconsetting',
        title: 'react',
        name: 'others_react',
        path: '/others/react',
        component: '@/pages/others/react'
      }
    ]
  }
]
