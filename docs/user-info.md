---
id: user-info
title: User Info
sidebar_label: User Info
---

User info transfers are queued and delivered in order, even when the watch app is not running.

## transferUserInfo

```ts
import {transferUserInfo} from 'react-native-watch-connectivity';

const userInfo = {key: 'value'}; // Any number of key/value pairs

transferUserInfo(userInfo);
```

`transferUserInfo` returns nothing. If the system cannot deliver the transfer, the [`user-info-error`](./api-events.md#user-info-error) event fires with `{ userInfo, error }`. Where WatchConnectivity is unavailable, it does nothing.

## transferCurrentComplicationUserInfo

Sends user info for the watch app's complication. The system wakes the watch app to receive it, while the daily allowance lasts. See [Complications](./complications.md) for the allowance and the related getters.

```ts
import {transferCurrentComplicationUserInfo} from 'react-native-watch-connectivity';

transferCurrentComplicationUserInfo({streak: 12});
```

## Receiving user info

Listen to the [`user-info`](./api-events.md#user-info) event. The callback receives an array. Its first call includes user info that arrived before you added the listener.

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('user-info', items => {
    items.forEach(item => console.log(item));
});
```

### TypeScript support

Use a `type` alias, not an interface: the type must be assignable to `Record<string, unknown>`.

```ts
import {transferUserInfo, watchEvents} from 'react-native-watch-connectivity';

type Workout = {
    id: string;
    durationSeconds: number;
};

transferUserInfo<Workout>({id: 'w1', durationSeconds: 1200});

const unsubscribe = watchEvents.on<Workout>('user-info', workouts => {
    workouts.forEach(workout => console.log(workout.durationSeconds));
});
```
