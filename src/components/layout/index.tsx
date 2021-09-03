import { useState, useMemo } from 'react'
import type { PropsWithChildren } from 'react'
import { Layout, Menu } from 'antd'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import { Link, Helmet } from 'umi'
import { useMount } from 'react-use'
import { useTheme, ThemeContext } from '@/hooks/theme'
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

export default function BaseLayout({
  children,
  location,
  routes
}: PropsWithChildren<RouteProps>) {
  const [theme, setTheme] = useTheme()
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  const [openKeys, setOpenKeys] = useState<any[]>([])

  const onOpenChange = (keys: any[]) => {
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)
    setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
  }

  const onCollapsed = () => {
    setTheme(state => ({ ...state, collapsed: !theme.collapsed }))
    // if (theme.collapsed) {
    //   menuState.openKeys = []
    // } else {
    //   changeRoute(router.currentRoute.value)
    // }
  }

  const menuRoutes = useMemo(
    () => routes?.[0].routes?.filter(r => !r.hidden && r.path) as MenuItem[],
    [routes]
  )

  // todo 此处暂时硬编码，子路由的path必须包含父路由的path, /parent -> /parent/child
  const changeRoute = () => {
    const menuRoute = menuRoutes.find(m => {
      const pattern = new RegExp(`^${m.path}`)
      return pattern.test(location?.pathname as string)
    })
    setOpenKeys([menuRoute?.name])
    if (menuRoute && !theme.collapsed) {
      const itemRoute = menuRoute.routes.find(
        r => r.path === (location?.pathname as string)
      )
      setSelectedKeys([itemRoute?.name])
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Helmet>
        <title>react-umi-dva-windicss</title>
      </Helmet>
      <Layout id="layout" style={{ overflow: 'auto', height: '100vh' }}>
        <div
          className="layout-fixed-stuff"
          style={{
            width: theme.collapsed ? theme.collapsedWidth : theme.width
          }}
        ></div>
        <Layout.Sider
          collapsed={theme.collapsed}
          className={classNames('layout-sider', {
            'show-name': theme.showSubMenuName
          })}
          theme={theme.theme}
          trigger={null}
          collapsible
          width={theme.width}
          collapsedWidth={theme.collapsedWidth}
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
              onClick={({ key }) => setSelectedKeys([key])}
            >
              {subMenus(menuRoutes)}
            </Menu>
          </div>
        </Layout.Sider>
        <Layout>
          <Layout.Header className="layout-header">
            {theme.collapsed ? (
              <MenuUnfoldOutlined className="trigger" onClick={onCollapsed} />
            ) : (
              <MenuFoldOutlined className="trigger" onClick={onCollapsed} />
            )}
            <Nav />
          </Layout.Header>
          <Layout.Content className="layout-content-wrap">
            {theme.showBreadcrumb ? (
              <div className="layout-breadcrumb">
                <Breadcrumb location={location} routes={routes} />
              </div>
            ) : null}
            <div className="layout-content">{children}</div>
          </Layout.Content>
        </Layout>
      </Layout>
      <Setting theme={theme} setTheme={setTheme} />
    </ThemeContext.Provider>
  )
}
