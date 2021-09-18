import type { Model } from 'dva'
import type { AnyAction } from 'redux'

export interface ThemeModelState {
  theme: 'dark' | 'light'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string | number
  collapsed: boolean
  collapsedWidth: string
  showSubMenuName: boolean
  showBreadcrumb: boolean
}

const initialState: ThemeModelState = {
  theme: 'dark',
  mode: 'inline',
  width: '208px',
  collapsed: false,
  collapsedWidth: '80px',
  showSubMenuName: true, // 控制左侧菜单折叠时，是否显示文字
  showBreadcrumb: true // 是否显示面包屑
}

const theme: Model = {
  namespace: 'theme',
  state: initialState,
  reducers: {
    changeTheme(state: ThemeModelState, { payload }: AnyAction) {
      return { ...state, ...payload }
    }
  }
}

export default theme
