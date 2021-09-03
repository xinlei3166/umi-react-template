import others from './others'
import components from './components'

export const routes = [...components, ...others]

// 这里只能有一个首页组件，添加其他组件在routes配置
export default [
  {
    exact: false,
    hidden: true,
    path: '/',
    component: '../components/layout',
    routes
  }
]
