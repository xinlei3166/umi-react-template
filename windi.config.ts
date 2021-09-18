import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    exclude: ['node_modules', '.git', 'dist', 'mock', '.umi']
  },
  attributify: {
    prefix: 'w:'
  },
  darkMode: 'class',
  shortcuts: {
    btn: 'rounded border border-gray-300 text-gray-600 px-4 py-2 m-2 inline-block hover:shadow'
  },
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
