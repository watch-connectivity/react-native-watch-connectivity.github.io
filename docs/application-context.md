---
id: application-context
title: Application Context
sidebar_label: Application Context
---

## getApplicationContext

Returns the latest application context, or `null` if none has been set.

```ts
import {getApplicationContext} from 'react-native-watch-connectivity';

const context = await getApplicationContext();

if (context) {
    console.log(context);
}
```

### TypeScript Support

```ts
import {getApplicationContext} from 'react-native-watch-connectivity';

type MyApplicationContext = {
    myKey: string
}

const context = await getApplicationContext<MyApplicationContext>();

if (context) {
    console.log(context.myKey);
}
```

## updateApplicationContext

```ts
import {updateApplicationContext} from 'react-native-watch-connectivity';

updateApplicationContext({key: "value"});
```
