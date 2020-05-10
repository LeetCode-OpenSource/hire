# TypeScript 题

## 问题定义

假设有一个叫 `EffectModule` 的类

```ts
class EffectModule {}
```

这个对象上的方法**只可能**有两种类型签名:

```ts
interface Action<T> {
  payload?: T
  type: string
}

asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>

syncMethod<T, U>(action: Action<T>): Action<U>
```

这个对象上还可能有一些任意的**非函数属性**：

```ts
interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}
```



现在有一个叫 `connect` 的函数，它接受 EffectModule 实例，将它变成另一个对象，这个对象上只有**EffectModule 的同名方法**，但是方法的类型签名被改变了:

```ts
asyncMethod<T, U>(input: Promise<T>): Promise<Action<U>>  变成了
asyncMethod<T, U>(input: T): Action<U> 
```

```ts
syncMethod<T, U>(action: Action<T>): Action<U>  变成了
syncMethod<T, U>(action: T): Action<U>
```



例子:

EffectModule 定义如下:

```ts
interface Action<T> {
  payload?: T;
  type: string;
}

class EffectModule {
  count = 1;
  message = "hello!";

  delay(input: Promise<number>) {
    return input.then(i => ({
      payload: `hello ${i}!`,
      type: 'delay'
    }));
  }

  setMessage(action: Action<Date>) {
    return {
      payload: action.payload!.getMilliseconds(),
      type: "set-message"
    };
  }
}
```

connect 之后:

```ts
type Connected = {
  delay(input: number): Action<string>
  setMessage(action: Date): Action<number>
}
const effectModule = new EffectModule()
const connected: Connected = connect(effectModule)
```

## 要求

在 [题目链接](https://codesandbox.io/s/4tmtp) 里面的 `index.ts` 文件中，有一个 `type Connect = (module: EffectModule) => any`，将 `any` 替换成题目的解答，让编译能够顺利通过，并且 `index.ts` 中 `connected` 的类型与:

```typescript
type Connected = {
  delay(input: number): Action<string>;
  setMessage(action: Date): Action<number>;
}
```

 **完全匹配**。
