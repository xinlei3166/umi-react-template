import { useState, memo } from 'react'
import type { PropsWithChildren } from 'react'
import type { ThemeState } from '@/models/theme'
import { Drawer, Select, Switch } from 'antd'
import { SettingOutlined, CloseOutlined } from '@ant-design/icons'
import './Setting.less'

interface Props {
  theme: ThemeState
  setTheme: Function
}

function Setting(props: PropsWithChildren<Props>) {
  const { theme, setTheme } = props
  const [visible, setVisible] = useState(false)

  function onChange(t: Partial<ThemeState>) {
    setTheme(t)
  }

  return (
    <Drawer
      visible={visible}
      className="setting-drawer"
      placement="right"
      width="280px"
      closable={false}
      handler={
        <div
          className="setting-drawer-btn-wrap"
          onClick={() => setVisible(!visible)}
        >
          {visible ? (
            <CloseOutlined className="setting-drawer-btn" />
          ) : (
            <SettingOutlined className="setting-drawer-btn" />
          )}
        </div>
      }
    >
      <div className="setting-drawer-content">
        <h3 className="drawer-title">系统布局配置</h3>
        <div className="drawer-item">
          <span>侧边栏主题颜色</span>
          <Select
            value={theme.theme}
            className="select"
            onChange={value => onChange({ theme: value })}
          >
            <Select.Option key="dark" value="dark">
              暗黑
            </Select.Option>
            <Select.Option key="light" value="light">
              明亮
            </Select.Option>
          </Select>
        </div>
        <div className="drawer-item">
          <span>侧边栏菜单类型</span>
          <Select
            value={theme.mode}
            className="select"
            onChange={value => onChange({ mode: value })}
          >
            <Select.Option key="vertical" value="vertical">
              垂直
            </Select.Option>
            <Select.Option key="inline" value="inline">
              内嵌
            </Select.Option>
          </Select>
        </div>
        <div className="drawer-item">
          <span>侧边栏折叠</span>
          <Switch
            checked={theme.collapsed}
            onChange={checked => onChange({ collapsed: checked })}
          />
        </div>
        <div className="drawer-item">
          <span>折叠展示菜单名称</span>
          <Switch
            checked={theme.showSubMenuName}
            onChange={checked => onChange({ showSubMenuName: checked })}
          />
        </div>
        <div className="drawer-item">
          <span>显示面包屑</span>
          <Switch
            checked={theme.showBreadcrumb}
            onChange={checked => onChange({ showBreadcrumb: checked })}
          />
        </div>
      </div>
    </Drawer>
  )
}

export default memo(Setting)
