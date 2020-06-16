---
id: api-reachability
title: Reachability
sidebar_label: Reachability
---

## subscribeToReachability

```ts
import {subscribeToReachability} from 'react-native-watch-connectivity';

const unsubscribe = subscribeToReachability(reachable => {
    console.log('reachable?', reachable);
})

// ...

unsubscribe();
```

## getReachability

```ts
import {getReachability} from 'react-native-watch-connectivity';

const reachable = await getReachability();
console.log('reachable?', reachable);
```
