import { Card } from 'antd'
import { history } from 'umi'

export default function RouterPage() {
  const onRedirect = () => {
    history.push('/')
  }

  return (
    <Card className="h-full">
      <div className="title">Router</div>
      <div className="title cursor-pointer" onClick={onRedirect}>
        点击跳转到首页
      </div>
    </Card>
  )
}
