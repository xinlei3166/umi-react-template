import { defineConfig } from 'umi'
// @ts-ignore
import AntdDayjsWebpackPlugin from 'antd-dayjs-webpack-plugin'
import WindiCSSWebpackPlugin from 'windicss-webpack-plugin'
import routes from './routes'

const vars = {
  API_URL: ''
}

export default defineConfig({
  title: false,
  // webpack5 不支持 windicss
  // mfsu: {},
  // webpack5: {},
  dynamicImport: {},
  esbuild: {},
  hash: true,
  antd: {},
  dva: {
    hmr: true,
    skipModelValidate: false
  },
  nodeModulesTransform: {
    type: 'none'
  },
  routes,
  fastRefresh: {},
  targets: {
    ie: 11
  },
  chainWebpack(memo, { env, webpack }) {
    memo.plugin('antd-dayjs-webpack-plugin').use(AntdDayjsWebpackPlugin)
    memo.plugin('windicss-webpack-plugin').use(WindiCSSWebpackPlugin)
  },
  define: {
    ...vars
  }
})
