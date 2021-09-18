import { useEffect } from 'react'
import { Card, Table } from 'antd'
import { useMount } from 'react-use'
import type { Pagination } from '@/interface'
import { usePagination } from '@/hooks/pagination'
import { getData } from '@/api'

export default function TablePage() {
  const { pagination, setPagination, loading, setLoading, data, setData } =
    usePagination()

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '爱好',
      dataIndex: 'hobby',
      key: 'hobby'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 150,
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
  ]
  console.log('222222')
  useMount(init)

  async function init() {
    console.log(3333)
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

  async function onSearch(search: Object) {
    console.log(search)
    pagination.current = 1
    await init()
  }

  async function onTableChange(pag: Pagination) {
    pagination.current = pag.current
    pagination.pageSize = pag.pageSize
    await init()
  }

  function onEdit() {
    window.open('https://baidu.com')
  }

  function onPreview() {
    window.open('https://baidu.com')
  }

  return (
    <Card>
      <Table
        rowKey="id"
        loading={loading}
        pagination={false}
        columns={columns}
        dataSource={data}
      ></Table>
    </Card>
  )
}
