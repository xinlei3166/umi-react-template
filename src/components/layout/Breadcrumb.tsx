import { memo } from 'react'
import type { PropsWithChildren } from 'react'
import { Breadcrumb } from 'antd'
import { Link, history } from 'umi'
import type { BreadcrumbsRoute } from 'react-router-breadcrumbs-hoc'
import type { RouteProps } from '@/interface'

function cleanupBreadcrumbs(breadcrumbs: any[]) {
  breadcrumbs[breadcrumbs.length - 1].unlink = true
  if (breadcrumbs.length > 1) {
    return breadcrumbs.slice(1)
  }
  return breadcrumbs
}

function BaseBreadcrumb({
  location,
  breadcrumbs
}: PropsWithChildren<RouteProps & { breadcrumbs: any[] }>) {
  const paths = breadcrumbs.map(
    (breadcrumb: BreadcrumbsRoute) => breadcrumb.match.path
  )
  if (!paths.includes(location?.pathname)) {
    history.push('/404')
  }

  return (
    <Breadcrumb>
      {cleanupBreadcrumbs(breadcrumbs).map(breadcrumb => (
        <Breadcrumb.Item key={breadcrumb.key}>
          {breadcrumb.unlink ? (
            breadcrumb.breadcrumb
          ) : (
            <Link to={breadcrumb.match.url}>{breadcrumb.breadcrumb}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
}

export default memo(BaseBreadcrumb)
