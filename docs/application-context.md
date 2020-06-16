---
id: application-context
title: Application Context
sidebar_label: Application Context
---

## getApplicationContext

```ts
import {getApplicationContext} from 'react-native-watch-connectivity';

const context = await getApplicationContext();

console.log(context);
```

### TypeScript Support

```ts
import {getApplicationContext} from 'react-native-watch-connectivity';

type MyApplicationContext = {
    myKey: string
}

const context = await getApplicationContext<MyApplicationContext>();

console.log(context.myKey);
```

## updateApplicationContext

```ts
import {updateApplicationContext} from 'react-native-watch-connectivity';

await updateApplicationContext({key: "value"});
```

### TypeScript Support

```ts
import {updateApplicationContext} from 'react-native-watch-connectivity';

type MyApplicationContext = {
    myKey: string
}

await updateApplicationContext<MyApplicationContext>({key: "value"}); // Type error
```

## subscribeToApplicationContext

```ts
import {subscribeToApplicationContext} from 'react-native-watch-connectivity';

const unsubscribe = subscribeToApplicationContext(context => {
    console.log(context);
})

// ...

unsubscribe();
```

### TypeScript Support

```ts
import {subscribeToApplicationContext} from 'react-native-watch-connectivity';

type MyApplicationContext = {
    myKey: string
}

const unsubscribe = subscribeToApplicationContext<MyApplicationContext>(context => {
    console.log(context.myKey);
})

// ...

unsubscribe();
```