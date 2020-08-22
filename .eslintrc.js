module.exports = {
  root: true,
  globals: {
    wx: true,
    storage: true,
    moment: true,
    $cdn: true,
    qrcode: true,
    html2canvas: true,
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  // extends: [, 'eslint:recommended', 'eslint-config-prettier'],
  //it is base on https://github.com/vuejs/eslint-config-vue
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 2,
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/html-indent': 0,
    'vue/html-closing-bracket-newline': 0,
    'vue/max-attributes-per-line': 0,
    'vue/singleline-html-element-content-newline': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-unused-vars': 2, // 禁止出现未使用过的变量
    'no-useless-escape': 2, // 禁用不必要的转义字符
    'no-control-regex': 2, // 禁止在正则表达式中使用控制字符
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};
