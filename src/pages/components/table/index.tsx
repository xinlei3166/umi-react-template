import { useEffect } from 'react'
import { Card, Table, Button } from 'antd'
import { usePagination } from '@/hooks/pagination'
import { getData } from '@/api'
import { getTableColumns } from './columns'
import './index.less'

export default function TablePage() {
  const columns = getTableColumns([
    {
      key: 'operation',
      render: () => (
        <>
          <span className="btn" onClick={onEdit}>
            编辑
          </span>
          <span className="btn" onClick={onPreview}>
            预览
          </span>
        </>
      )
    }
  ])

  const { pagination, setPagination, loading, setLoading, data, setData } =
    usePagination()

  useEffect(() => {
    init()
  }, [pagination.current, pagination.pageSize])

  async function init() {
    setLoading(true)
    const res = await getData({
      pageNum: pagination.current,
      pageSize: pagination.pageSize
    })
    setLoading(false)
    if (res.code !== 0) return
    setData(res.data)
    setPagination(state => ({ ...state, total: res.total }))
  }

  async function onSearch() {
    if (pagination.current === 1) {
      await init()
      return
    }
    setPagination(state => ({ ...state, current: 1 }))
  }

  function onEdit() {
    window.open('https://baidu.com')
  }

  function onPreview() {
    window.open('https://baidu.com')
  }

  return (
    <Card>
      <Button onClick={onSearch}>点击</Button>
      <Table
        rowKey="id"
        loading={loading}
        pagination={pagination}
        columns={columns}
        dataSource={data}
      ></Table>
    </Card>
  )
}
