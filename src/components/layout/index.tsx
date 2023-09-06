import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale/zh_CN'
import {
  connect,
  useDispatch,
  useSelector,
  Outlet,
  useLocation,
  useOutletContext,
  useSelectedRoutes,
  Helmet
} from '@umijs/max'
import { useMount } from 'ahooks'
import Nav from './Nav'
import Siderbar from './Siderbar'
import Breadcrumb from './Breadcrumb'
import Setting from './Setting'
import Logo from './Logo'
import TokenContextHolder from '@/components/token/TokenContextHolder'
import classNames from 'classnames'
import Icon from '@/components/icon'
import './index.less'

function BaseLayout() {
  // const props: any = useOutletContext()
  const selectedRoutes = useSelectedRoutes()
  const location = useLocation()
  const theme = useSelector((state: any) => state.theme)
  const dispatch = useDispatch()

  const configProvider = {
    locale: zhCN,
    theme: { token: theme.token }
  }

  // login layout
  if (location?.pathname === '/login') {
    return (
      <ConfigProvider {...configProvider}>
        <TokenContextHolder />
        <Outlet />
      </ConfigProvider>
    )
  }

  const route = selectedRoutes.at(-1)
  // @ts-ignore
  const routeTitle = route?.route?.title ? `${route?.route?.title} - ` : ''
  const title = `${routeTitle}umi-react-template`

  return (
    <ConfigProvider {...configProvider}>
      <TokenContextHolder />
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Layout id="layout" style={{ overflow: 'auto', height: '100vh' }}>
        <div
          className="layout-fixed-stuff"
          style={{
            width: theme.collapsed ? theme.collapsedWidth : theme.width
          }}
        />
        <Siderbar />
        <Layout>
          {theme.layout === 'mix' ? (
            <header
              className={classNames([
                'layout-header-mix',
                { dark: !theme.headerTheme }
              ])}
              style={{ height: theme.height, lineHeight: theme.height }}
            >
              <Logo />
              <Layout.Header
                className="layout-header"
                style={{ height: theme.height, lineHeight: theme.height }}
              >
                <Nav />
              </Layout.Header>
            </header>
          ) : (
            <Layout.Header
              className="layout-header"
              style={{ height: theme.height, lineHeight: theme.height }}
            >
              <Nav />
            </Layout.Header>
          )}
          <Layout.Content
            className={classNames([
              'layout-content-wrap',
              { 'layout-content-wrap-mix': theme.layout === 'mix' }
            ])}
            style={{
              marginTop: theme.layout === 'mix' ? theme.height : ''
            }}
          >
            {theme.showBreadcrumb ? (
              <div className="layout-breadcrumb">
                <Breadcrumb />
              </div>
            ) : null}
            <div className="layout-content">
              <Outlet />
            </div>
          </Layout.Content>
        </Layout>
      </Layout>
      <Setting />
    </ConfigProvider>
  )
}

export default connect((state: any) => ({
  theme: state.theme
}))(BaseLayout)
