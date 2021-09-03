import { createContext } from 'react'
import { useState } from 'react'
import type { SetState } from '@/interface'

export interface Theme {
  theme: 'dark' | 'light'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string
  collapsed: boolean
  collapsedWidth: string
  showSubMenuName: boolean
  showBreadcrumb: boolean
}

export const ThemeContext = createContext({})

export function useTheme(theme?: Theme): [Theme, SetState<Theme>] {
  const defaultTheme: Theme = {
    theme: 'dark',
    mode: 'inline',
    width: '208px',
    collapsed: false,
    collapsedWidth: '80px',
    showSubMenuName: true, // 控制左侧菜单折叠时，是否显示文字
    showBreadcrumb: true // 是否显示面包屑
  }
  const [state, setState] = useState<Theme>(theme || defaultTheme)

  return [state, setState]
}
