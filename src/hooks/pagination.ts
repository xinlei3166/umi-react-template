import { useState } from 'react'
import type { Pagination } from '@/interface'

const defaultPagination: Pagination = {
  size: 'small',
  current: 1,
  defaultCurrent: 1,
  pageSize: 20,
  total: 0,
  showTotal: (total: number | string) => `共${total}条`,
  showLessItems: true,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: ['10', '20', '30', '40', '50']
}

export function usePagination(options?: Record<string, any>) {
  const pag = options || {}
  const [pagination, setPagination] = useState<Pagination>({
    ...defaultPagination,
    ...pag
  })

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>()

  return {
    pagination,
    setPagination,
    loading,
    setLoading,
    data,
    setData
  }
}
