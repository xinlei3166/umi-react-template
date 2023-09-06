import { useState, useMemo } from 'react'
import { Layout, Menu } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons'
import {
  connect,
  useDispatch,
  useSelector,
  useAppData,
  useNavigate,
  useLocation
} from '@umijs/max'
import { useMount } from 'ahooks'
import classNames from 'classnames'
import Icon from '@/components/icon'
import Logo from './Logo'
import './Siderbar.less'

type MenuItem = {
  title: string
  name: string
  icon: string
  path: string
  hidden: string
  link: boolean
  routes: MenuItem[]
} & ItemType

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

function Siderbar() {
  const routes: any = useAppData().clientRoutes
  const location = useLocation()
  const navigate = useNavigate()
  const theme = useSelector((state: any) => state.theme)
  const dispatch = useDispatch()
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  const [openKeys, setOpenKeys] = useState<any[]>([])

  const onOpenChange = (keys: any[]) => {
    setOpenKeys(keys)
  }

  const onClick = ({ item, key, keyPath }: Record<string, any>) => {
    setOpenKeys(keyPath.slice(1))
    setSelectedKeys([key])
    navigate(key)
  }

  const menuRoutes = useMemo(
    () =>
      routes?.[0].routes?.filter((r: any) => !r.hidden && r.path) as MenuItem[],
    [routes]
  )

  const findMenuRoute = () =>
    menuRoutes.find(m => {
      const pattern = new RegExp(`^${m.path}`)
      return pattern.test(location?.pathname as string)
    })

  const findItemRoute = (menuRoute: any) =>
    menuRoute.routes.find(
      (r: Record<string, any>) => r.path === (location?.pathname as string)
    )

  // todo 此处暂时硬编码，子路由的path必须包含父路由的path, /parent -> /parent/child
  const changeRoute = () => {
    const menuRoute: any = findMenuRoute()
    setOpenKeys([menuRoute?.path])
    if (menuRoute && !theme.collapsed) {
      const itemRoute = findItemRoute(menuRoute)
      setSelectedKeys([itemRoute?.path])
    }
  }

  const setTheme = (payload: Record<string, any>) => {
    dispatch?.({ type: 'theme/changeTheme', payload })
  }

  const onCollapse = (collapsed: boolean) => {
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

  const items: MenuItem[] = [
    ...menuRoutes.map(menu => {
      const childRoutes = menu?.routes?.filter(r => !r.hidden && r.path) || []
      const children = childRoutes.map(c =>
        getItem(
          <span className="ant-menu-title-content">
            <span className="menu-item-title">{c.title}</span>
          </span>,
          c.path
          // <Icon type={c.icon} className="menu-item-icon" />
        )
      )
      return getItem(
        <span className="ant-menu-title-content">
          <span className="menu-item-title">{menu.title}</span>
        </span>,
        menu.path,
        <Icon type={menu.icon} className="menu-item-icon" />,
        children
      )
    })
  ]

  return (
    <Layout.Sider
      collapsible
      collapsed={theme.collapsed}
      trigger={
        theme.collapsed ? (
          <MenuUnfoldOutlined className="trigger" />
        ) : (
          <MenuFoldOutlined className="trigger" />
        )
      }
      onCollapse={onCollapse}
      theme={theme.theme}
      width={theme.width}
      collapsedWidth={theme.collapsedWidth}
      className={classNames([
        'layout-sider',
        {
          'layout-sider-mix': theme.layout === 'mix'
        }
      ])}
      style={{
        paddingTop: theme.layout === 'mix' ? `calc(${theme.height} + 4px)` : ''
      }}
    >
      {theme.layout !== 'mix' && <Logo />}
      <div className="layout-menu-wrap">
        <Menu
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          className="sider-menu"
          theme={theme.theme}
          mode={theme.mode}
          onOpenChange={onOpenChange}
          onClick={onClick}
          items={items}
        />
      </div>
    </Layout.Sider>
  )
}

export default connect((state: any) => ({
  theme: state.theme
}))(Siderbar)
