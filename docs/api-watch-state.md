---
id: api-watch-state
title: Watch State
sidebar_label: Watch State
---

## getIsPaired

Is this iPhone paired with an apple watch?

```ts
import {getIsPaired} from 'react-native-watch-connectivity';

const paired = await getIsPaired();

console.log(paired); // true | false
```

## getIsWatchAppInstalled

Is the watch app, companion to the react native, installed?

```ts
import {getIsWatchAppInstalled} from 'react-native-watch-connectivity';

const installed = await getIsWatchAppInstalled();
console.log(installed); // true | false
```
