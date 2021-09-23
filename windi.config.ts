import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    exclude: ['node_modules', '.git', 'dist', 'mock', '.umi']
  },
  attributify: {
    prefix: 'w:'
  },
  darkMode: 'class',
  shortcuts: {},
  theme: {
    extend: {
      lineHeight: {
        antd: 1.5715,
        unset: 'unset',
        inherit: 'inherit'
      },
      colors: {
        pink: {
          deep: '#ff1493'
        }
      }
    }
  }
})
