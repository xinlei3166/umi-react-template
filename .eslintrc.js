module.exports = {
  extends: [
    require.resolve('@umijs/fabric/dist/eslint'),
    'plugin:prettier/recommended'
  ],
  plugins: [],
  globals: {},
  rules: {
    // js
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-alert': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 2, // 禁止使用tabs
    'no-useless-escape': 0,
    'no-var': 2, // 使用let和const代替var
    'no-mixed-spaces-and-tabs': 2, // 不允许混用tab和空格
    'no-useless-return': 0,
    'arrow-parens': 0,
    'prefer-const': 2, // 优先使用const
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'consistent-return': 0,
    'prefer-template': 0,
    'no-restricted-syntax': 0,
    eqeqeq: 2, // 必须使用全等
    camelcase: 0, // 禁用驼峰命名检测
    // ts
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 1,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-unused-expressions': 0
  }
}
