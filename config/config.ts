import { defineConfig } from '@umijs/max'
import UnoCSS from '@unocss/webpack'
import routes from './routes'

const vars = {
  API_URL: '/api',
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
  // proxy: {
  //   [vars.API_URL]: {
  //     target: 'http://api.xxx.com', // 你的后端服务器地址
  //     changeOrigin: true, // 修改请求头中的 Origin 为目标地址，解决跨域
  //     pathRewrite: { [`^${vars.API_URL}`]: '' } // 重写路径，去掉请求路径中的 '/api' 前缀
  //   }
  // }
})
