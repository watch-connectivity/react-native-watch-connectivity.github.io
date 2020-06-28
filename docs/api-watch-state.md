---
id: api-watch-state
title: Watch State
sidebar_label: Watch State
---

## getWatchState

```ts
import {getWatchState} from 'react-native-watch-connectivity';

const watchState = await getWatchState();

console.log(watchState); // NotActivated | Inactive | Activated
```

## subscribeToWatchState

```ts
import {subscribeToWatchState} from 'react-native-watch-connectivity';

const unsubscribe = subscribeToWatchState(state => {
    console.log(state); // NotActivated | Inactive | Activated
})

unsubscribe();
```

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
