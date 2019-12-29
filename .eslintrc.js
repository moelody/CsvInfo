// .eslintrc.js
// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: { es6: true },
  extends: ['plugin:prettier/recommended'], // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  globals: {
    $: true,
    OS: true,
    yp: true,
    XML: true,
    app: true,
    cout: true,
    alert: true,
    prompt: true,
    confirm: true,
    writeLn: true,
    system: true,
    Color: true,
    ScriptUI: true,
    Root: true,
    File: true,
    Group: true,
    Panel: true,
    Folder: true,
    Window: true,
    BuildUI: true,
    XMPMeta: true,
    XMPConst: true,
    CompItem: true,
    refreshKarassub: true,
    clearOutput: true,
    DropDownList: true,
    memoryGlobal: true,
  },
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        jsxSingleQuote: true,
        trailingComma: 'none',
        printWidth: 2000,
        proseWrap: 'preserve',
        jsxBracketSameLine: true,
        bracketSpacing: true,
        arrowParens: 'avoid'
      }
    ],
    'arrow-parens': 0, // 要求箭头函数的参数使用圆括号
    'generator-star-spacing': 'off', // 强制 generator 函数中 * 号周围使用一致的空格
    'space-before-function-paren': ['error', 'never'], //强制在 function的左括号之前使用一致的空格
    'no-return-assign': 0, // 禁止在 return 语句中使用赋值语句
    'no-extend-native': 'off', // 禁止扩展原生类型
    'no-unused-expressions': 'off', // 禁止出现未使用过的表达式
    'no-caller': 'off', // 禁用 arguments.caller 或 arguments.callee
    'no-mixed-operators': 'off', // 禁止混合使用不同的操作符
    'no-template-curly-in-string': 'off', // 禁止在常规字符串中出现模板字面量占位符语法
    'new-cap': 'off', // 要求构造函数首字母大写
    'no-multi-str': 'off', // 禁止使用多行字符串
    'no-useless-escape': 'off', // 禁用不必要的转义字符
    'no-unexpected-multiline': 'off', // 禁止出现令人困惑的多行表达式
    'no-control-regex': 'off',
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-global-assign': ['error', { exceptions: ['JSON'] }],
    'no-eval': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', // allow debugger during development

    semi: ['error', 'never'], // 不添加，分号
    quotes: ['error', 'single', { avoidEscape: true }] // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
  }
}
