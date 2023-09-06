import type { Model } from 'dva'
import type { AnyAction } from 'redux'
import type { GlobalToken } from 'antd/es/theme'

export interface ThemeModelState {
  theme: 'dark' | 'light'
  layout: 'side' | 'mix'
  mode: 'vertical' | 'inline' | 'horizontal'
  width: string
  height: string
  collapsed: boolean
  collapsedWidth: string
  headerTheme: boolean
  showBreadcrumb: boolean
  token: Partial<GlobalToken>
  algorithm: string
}

const initialState: ThemeModelState = {
  theme: 'light', // light, dark
  layout: 'mix', // side, mix
  mode: 'inline',
  width: '240px',
  height: '64px',
  collapsed: false,
  collapsedWidth: '80px',
  headerTheme: false,
  showBreadcrumb: true, // 是否显示面包屑
  token: {
    colorPrimary: '#0077fa',
    colorInfo: '#0077fa'
  },
  algorithm: 'defaultAlgorithm'
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
