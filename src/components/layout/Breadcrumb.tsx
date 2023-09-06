import { memo } from 'react'
import { Breadcrumb } from 'antd'
import { Link, useNavigate, useLocation, useSelectedRoutes } from '@umijs/max'

function cleanupBreadcrumbs(breadcrumbs: any[]) {
  breadcrumbs[breadcrumbs.length - 1].unlink = true
  if (breadcrumbs.length > 1) {
    return breadcrumbs.slice(1)
  }
  return breadcrumbs
}

function BaseBreadcrumb() {
  const routes = useSelectedRoutes()
  const breadcrumbs = cleanupBreadcrumbs(
    routes.map(r => ({
      pathname: r.pathname,
      pathnameBase: r.pathnameBase,
      route: r.route
    }))
  )
  // const paths = breadcrumbs.map(
  //   (breadcrumb: BreadcrumbsRoute) => breadcrumb.match.path
  // )
  // const navigate = useNavigate()
  // const location = useLocation()
  // if (!paths.includes(location?.pathname)) {
  //   navigate('/404')
  // }
  const items = breadcrumbs.map(breadcrumb => {
    const title = breadcrumb.unlink ? (
      breadcrumb.route.title
    ) : (
      <Link to={breadcrumb.pathname}>{breadcrumb.route.title}</Link>
    )
    return { title }
  })

  return <Breadcrumb items={items} />
}

export default memo(BaseBreadcrumb)
