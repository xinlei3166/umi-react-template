import { connect, useSelector, Link } from '@umijs/max'
import logo from '@/assets/logo.svg'
import './Logo.less'

function Logo() {
  const title = APP_TITLE
  const theme = useSelector((state: any) => state.theme)
  const width = theme.collapsed ? theme.collapsedWidth : theme.width
  const height = theme.height
  const mix = theme.layout === 'mix'

  return (
    <div className="layout-logo" style={{ minWidth: width, height: height }}>
      <Link to="/" className="logo-link">
        <img className="logo-img" src={logo} alt="logo" />
        {!theme.collapsed || mix ? (
          <h1 className="logo-text">{title}</h1>
        ) : null}
      </Link>
    </div>
  )
}

export default connect((state: any) => ({
  theme: state.theme
}))(Logo)
