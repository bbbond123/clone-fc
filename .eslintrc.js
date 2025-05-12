module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: ['vue', '@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-recommended', // 支持 Vue 3
    'plugin:@typescript-eslint/recommended', // 支持 TypeScript
    'standard',
    'plugin:prettier/recommended', // 集成 Prettier
  ],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/order': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/no-v-html': 'off',
    'vue/require-default-prop': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/valid-template-root': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/first-attribute-linebreak': 'off',
    'vue/attributes-order': 'off',
    'vue/html-indent': 'off',
    'vue/html-closing-bracket-newline': 'off',
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser', // 使用 vue-eslint-parser 解析 .vue 文件
    },
  ],
}
