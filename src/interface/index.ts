import type { IRouteComponentProps } from 'umi'
import type { Dispatch, SetStateAction } from 'react'

export type Request = Record<string, any>

export type ResponseData = null | any[] | {}

export interface Response {
  code: number | string
  data: ResponseData
  [key: string]: any
}

// Pagination
export interface Pagination {
  size: string
  current: number
  defaultCurrent: number
  pageSize: number
  total: number
  showTotal: (total: number | string) => string
  showLessItems: boolean
  showQuickJumper: boolean
  showSizeChanger: boolean
  pageSizeOptions: string[]
}

export interface Visible {
  visible: boolean
  title?: string
  id?: number
  mode?: 'new' | 'edit' | string
  data?: any[] | Record<any, any>
}

// tab list
export interface TabList {
  key: string // component name
  permission?: string
  name?: string // cn name
  tab?: string
  slots?: Object
}

export type RouteProps = Partial<IRouteComponentProps>

export type SetState<S> = Dispatch<SetStateAction<S>>
