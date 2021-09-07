import { useState, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import type { Dispatch } from 'umi'
import { Link, Helmet, connect } from 'umi'
import type { ThemeState } from '@/models/theme'
import type { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc'
import withBreadcrumbs from 'react-router-breadcrumbs-hoc'
import { useMount } from 'react-use'
import Nav from './Nav'
import Breadcrumb from './Breadcrumb'
import Setting from './Setting'
import type { RouteProps } from '@/interface'
import classNames from 'classnames'
import logo from '@/assets/logo.svg'
import Icon from '@/components/icon'
import './index.less'

interface MenuItem {
  breadcrumb: string
  name: string
  icon: string
  path: string
  hidden: string
  routes: MenuItem[]
}

// const areEqual = (
//   prevProps: PropsWithChildren<RouteProps>,
//   nextProps: PropsWithChildren<RouteProps>
// ) => {
//   return prevProps.location?.pathname === nextProps.location?.pathname
// }

function BaseLayout({
  children,
  location,
  routes,
  theme,
  dispatch
}: PropsWithChildren<RouteProps & { theme: ThemeState; dispatch: Dispatch }>) {
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  const [openKeys, setOpenKeys] = useState<any[]>([])

  const onOpenChange = (keys: any[]) => {
    setOpenKeys(keys)
  }

  const onClick = ({ key, keyPath }: Record<string, any>) => {
    setOpenKeys(keyPath.slice(1))
    setSelectedKeys([key])
  }

  const menuRoutes = useMemo(
    () => routes?.[0].routes?.filter(r => !r.hidden && r.path) as MenuItem[],
    [routes]
  )

  const findMenuRoute = () =>
    menuRoutes.find(m => {
      const pattern = new RegExp(`^${m.path}`)
      return pattern.test(location?.pathname as string)
    })

  const findItemRoute = (menuRoute: MenuItem) =>
    menuRoute.routes.find(r => r.path === (location?.pathname as string))

  // todo 此处暂时硬编码，子路由的path必须包含父路由的path, /parent -> /parent/child
  const changeRoute = () => {
    const menuRoute = findMenuRoute()
    setOpenKeys([menuRoute?.name])
    if (menuRoute && !theme.collapsed) {
      const itemRoute = findItemRoute(menuRoute)
      setSelectedKeys([itemRoute?.name])
    }
  }

  const setTheme = (payload: Record<string, any>) => {
    dispatch({ type: 'theme/changeTheme', payload })
  }

  const onCollapse = () => {
    const collapsed = !theme.collapsed
    setTheme({ collapsed })
    if (collapsed) {
      setOpenKeys([])
    } else {
      changeRoute()
    }
  }

  useMount(() => {
    changeRoute()
  })

  // login layout
  if (location?.pathname === '/login') {
    return <>{children}</>
  }

  // menu
  const menuItems = (menus: MenuItem[]) =>
    menus.map(menu => (
      <Menu.Item key={menu.name}>
        <Link className="menu-item-link" to={menu.path}>
          <Icon type={menu.icon} className="icon"></Icon>
          <span className="menu-item-title">{menu.breadcrumb}</span>
        </Link>
      </Menu.Item>
    ))

  const subMenus = (menus: MenuItem[]) =>
    menus.map(menu => (
      <Menu.SubMenu
        key={menu.name}
        title={<span className="menu-item-title">{menu.breadcrumb}</span>}
        icon={<Icon type={menu.icon} className="icon"></Icon>}
      >
        {menuItems(menu?.routes?.filter(r => !r.hidden && r.path))}
      </Menu.SubMenu>
    ))

  const _BaseLayout = withBreadcrumbs(
    routes?.[0].routes?.filter(r => r.path) as any,
    {
      disableDefaults: true
    }
  )(({ breadcrumbs }: any) => {
    const route = breadcrumbs.find(
      (breadcrumb: BreadcrumbsRoute) =>
        breadcrumb.match.url === location?.pathname
    )
    const title = route?.breadcrumb?.props.children
      ? `${route.breadcrumb?.props?.children} - react-umi-dva-windicss`
      : 'react-umi-dva-windicss'

    return (
      <>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Layout id="layout" style={{ overflow: 'auto', height: '100vh' }}>
          <div
            className="layout-fixed-stuff"
            style={{
              width: theme.collapsed ? theme.collapsedWidth : theme.width
            }}
          ></div>
          <Layout.Sider
            collapsible
            collapsed={theme.collapsed}
            trigger={null}
            theme={theme.theme}
            width={theme.width}
            collapsedWidth={theme.collapsedWidth}
            className={classNames('layout-sider', {
              'show-name': theme.showSubMenuName
            })}
          >
            <div className="logo">
              <Link to="/" className="logo-link">
                <img className="logo-img" src={logo} alt="logo" />
                {!theme.collapsed ? (
                  <h1 className="logo-text">React Demo</h1>
                ) : null}
              </Link>
            </div>
            <div className="layout-menu-wrap">
              <Menu
                selectedKeys={selectedKeys}
                openKeys={openKeys}
                className="sider-menu"
                theme={theme.theme}
                mode={theme.mode}
                onOpenChange={onOpenChange}
                onClick={onClick}
              >
                {subMenus(menuRoutes)}
              </Menu>
            </div>
          </Layout.Sider>
          <Layout>
            <Layout.Header className="layout-header">
              {theme.collapsed ? (
                <MenuUnfoldOutlined className="trigger" onClick={onCollapse} />
              ) : (
                <MenuFoldOutlined className="trigger" onClick={onCollapse} />
              )}
              <Nav />
            </Layout.Header>
            <Layout.Content className="layout-content-wrap">
              {theme.showBreadcrumb ? (
                <div className="layout-breadcrumb">
                  <Breadcrumb location={location} breadcrumbs={breadcrumbs} />
                </div>
              ) : null}
              <div className="layout-content">{children}</div>
            </Layout.Content>
          </Layout>
        </Layout>
        <Setting theme={theme} setTheme={setTheme} />
      </>
    )
  })

  return <_BaseLayout />
}

export default connect((state: any) => ({
  theme: state.theme
}))(BaseLayout)
