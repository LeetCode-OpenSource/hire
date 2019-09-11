# 运用你的编程能力解决现实问题

## 问题描述
假设我们在业务中有一个需求是将浏览器中的错误上报到日志中心。
在上报前，我们需要在前端先将错误的各种信息序列化为日志中心可以处理的 `JSON` 形式。

## 输入
输入是一个 `Error` 对象，但是在不同的浏览器下它有着细微的区别。

在 `Chrome` 中，我们捕获到的错误的 `stack` 属性是以下格式:

```js
const fixtureStack = `TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
  at foo http://192.168.31.8:8000/b.js:4:15
  at calc http://192.168.31.8:8000/a.js:4:3
  at <anonymous>:1:11
  at http://192.168.31.8:8000/a.js:22:3
`
```

在 `Firefox` 中，我们捕获到的错误的 `stack` 属性是以下格式:

```js
const fixtureFirefoxStack = `
  bar@http://192.168.31.8:8000/c.js:2:9
  foo@http://192.168.31.8:8000/b.js:4:15
  calc@http://192.168.31.8:8000/a.js:4:3
  <anonymous>:1:11
  http://192.168.31.8:8000/a.js:22:3
`
```

如果 `stack` 中某一行不带文件路径，则忽略掉这行信息

## 输出
日志中心接受这样格式的数据:

```ts
interface ErrorMessage {
  message: string
  stack: Array<{
    line: number
    column: number
    filename: string
  }>
}
```

如果输入:
```ts
TypeError: Error raised
  at bar http://192.168.31.8:8000/c.js:2:9
```

则输出:

```ts
{
  message: 'Error raised',
  stack: [
    {
      line: 2,
      column: 9,
      filename: 'http://192.168.31.8:8000/c.js'
    }
  ]
}
```

## 要求
请使用 `TypeScript` 完成 [index.ts](./foundations-zh/src/index.ts) 中的函数.
可以引入部分工具类第三方库，比如 `Lodash`.

## 评判标准

- 完成所描述功能. `50 分`
- 完整的单元测试，覆盖 `输入` 中举例的 `Chrome` 和 `Firefox` 的两个 `Fixture`. `30 分`
- 配置 `lint` 与 `format`. `10 分`
- 配置 `precommit` 与 `commitlint`. `10 分`
- 配置 `CI`, 并且在 `CI` 上运行 `单元测试与 Lint`. `30 分`
