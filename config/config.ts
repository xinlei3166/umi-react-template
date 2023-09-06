import { defineConfig } from '@umijs/max'
import UnoCSS from '@unocss/webpack'
import routes from './routes'

const vars = {
  API_URL: '',
  APP_TITLE: 'Umi React App'
}

export default defineConfig({
  title: undefined,
  favicons: ['/favicon.ico'],
  helmet: true,
  mfsu: {
    esbuild: true,
    exclude: ['react-router', 'react-router-dom']
  },
  hash: true,
  antd: {},
  request: {},
  model: {},
  initialState: {},
  dva: {
    extraModels: []
  },
  // legacy: {},
  routes,
  fastRefresh: true,
  // targets: {},
  // @ts-ignore
  chainWebpack(memo, { env, webpack }) {
    memo.plugin('@unocss/webpack').use(UnoCSS)
    memo.optimization.set('realContentHash', true)
  },
  plugins: ['@umijs/plugins/dist/unocss'],
  unocss: {
    watch: ['src/**/*.tsx']
  },
  define: {
    ...vars
  }
})
