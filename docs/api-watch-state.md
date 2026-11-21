---
id: api-watch-state
title: Watch State
sidebar_label: Watch State
---

## isSupported

```ts no-check
isSupported(): boolean
```

A synchronous check. It is `false` where WatchConnectivity is unavailable: iPads, Android and the web. See [Platforms](./installation.md#platforms) for what the rest of the API does there.

```ts
import {isSupported} from 'react-native-watch-connectivity';

console.log(isSupported()); // true on iPhone
```

## getIsPaired

Is this iPhone paired with an Apple Watch?

```ts
import {getIsPaired} from 'react-native-watch-connectivity';

const paired = await getIsPaired();

console.log(paired); // true | false
```

## getIsWatchAppInstalled

Is the companion watch app installed on the paired watch?

```ts
import {getIsWatchAppInstalled} from 'react-native-watch-connectivity';

const installed = await getIsWatchAppInstalled();
console.log(installed); // true | false
```

## getReachability

Can the phone send an interactive message to the watch app now? See [Reachability](./reachability.md#reachability).

```ts
import {getReachability} from 'react-native-watch-connectivity';

const reachable = await getReachability();
console.log('reachable?', reachable);
```

## Complication state

`getIsComplicationEnabled()` and `getRemainingComplicationUserInfoTransfers()` are on the [Complications](./complications.md) page.

## Before the session activates

All the getters on this page, except `isSupported`, read `false` until the WatchConnectivity session finishes activating, shortly after launch. The `paired`, `installed` and `reachability` events fire each time the session activates, so read the value again then, or use the [hooks](./api-hooks.md).

## Events

See the [Events API documentation](./api-events.md) to subscribe to changes in these values.
