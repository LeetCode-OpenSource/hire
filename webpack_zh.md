# 用 Webpack 实现 predictable long term cache

## 什么是 predictable long term cache

> https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31

## 题目代码模版

[webpack-zh](./webpack-zh)



## 预期结果

默认情况下运行 `yarn build` 需要产生 6 个文件:

- `common~main.[hash].js`
- `main.[hash].js`
- `module1~main.[hash].js`
- `module2~main.[hash].js`
- `runtime~main.[hash].js`
- `vendors~main.[hash].js`



### 示例输出:

```bash
 common~main.ad17d93b.js  201 bytes       0  [emitted]  common~main
        main.34668304.js  170 bytes       1  [emitted]  main
module1~main.f7321cac.js  212 bytes       2  [emitted]  module1~main
module2~main.aa4eece8.js  214 bytes       3  [emitted]  module2~main
runtime~main.ac72a21f.js   1.42 KiB       4  [emitted]  runtime~main
vendors~main.b14d99a1.js   69.4 KiB       5  [emitted]  vendors~main
```



在修改 `common`/ `module-1`/ `module-2`文件夹下的文件时，其它 `chunk` 的 `hash` 没有变化。

比如，在修改 `common/index.js` 的文件内容后，输出下面的文件 `output`：

```diff
import { sample as lodashSample } from 'lodash'

export function sample(arr) {

--  console.log('common!!!')

++  console.log('common!')

  return lodashSample(arr)

}
```



```bash
 common~main.24689b5d.js  199 bytes       0  [emitted]  common~main
        main.34668304.js  170 bytes       1  [emitted]  main
module1~main.f7321cac.js  212 bytes       2  [emitted]  module1~main
module2~main.aa4eece8.js  214 bytes       3  [emitted]  module2~main
runtime~main.ac72a21f.js   1.42 KiB       4  [emitted]  runtime~main
vendors~main.b14d99a1.js   69.4 KiB       5  [emitted]  vendors~main
```

其中，只有 `common~main` 这个 `chunk` 的 `hash` 发生了变化。