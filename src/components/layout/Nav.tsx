import { memo } from 'react'
import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import {
  BellOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined
} from '@ant-design/icons'
import { connect, useSelector } from '@umijs/max'
import avatar from '@/assets/avatar.png'
import './Nav.less'

const items: MenuProps['items'] = [
  {
    key: 'person',
    label: (
      <>
        <UserOutlined className="menu-item-icon" />
        个人中心
      </>
    )
  },
  {
    key: 'setting',
    label: (
      <>
        <SettingOutlined className="menu-item-icon" />
        个人设置
      </>
    )
  },
  {
    key: 'logout',
    label: (
      <>
        <LoginOutlined className="menu-item-icon" />
        退出登录
      </>
    )
  }
]

function Nav() {
  const theme = useSelector((state: any) => state.theme)

  return (
    <div className="layout-nav">
      <BellOutlined className="layout-header-icon" />
      <Dropdown overlayClassName="layout-nav-dropdown" menu={{ items }}>
        <span
          className="dropdown-link"
          style={{ height: theme.height, lineHeight: theme.height }}
        >
          <span className="dropdown-img-wrap">
            <img className="dropdown-img" src={avatar} />
          </span>
          <span className="dropdown-text">君惜</span>
        </span>
      </Dropdown>
    </div>
  )
}

export default memo(
  connect((state: any) => ({
    theme: state.theme
  }))(Nav)
)
