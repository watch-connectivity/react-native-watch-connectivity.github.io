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

## getReachability

```ts
import {getReachability} from 'react-native-watch-connectivity';

const reachable = await getReachability();
console.log('reachable?', reachable);
```

## Events

See the [Events API documentation](/react-native-watch-connectivity/docs/api-events) for details on subscribing to the above.
