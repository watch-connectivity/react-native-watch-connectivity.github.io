---
id: complications
title: Complications
sidebar_label: Complications
---

A complication shows your watch app's data on the watch face. To update it from the phone, send the data with `transferCurrentComplicationUserInfo`. The watch receives it in `session(_:didReceiveUserInfo:)`, like ordinary user info.

The system wakes the watch app for a limited number of these transfers each day. Once the allowance is used up, further transfers still arrive, but as ordinary user info, without waking the watch app.

| Function | Returns |
| --- | --- |
| `transferCurrentComplicationUserInfo(info)` | Nothing. Sends `info` for the complication. |
| `getIsComplicationEnabled()` | `Promise<boolean>`: whether the complication is on the active watch face. |
| `getRemainingComplicationUserInfoTransfers()` | `Promise<number>`: how many more transfers the system will deliver at once today. Always `0` when the complication is not enabled. |

## Wait for the session to activate

Both getters read `false` and `0` until the WatchConnectivity session finishes activating. This happens shortly after launch. If you read them at launch, read them again after the first `paired` or `reachability` event. Both events fire each time the session activates.

```ts
import {
    getIsComplicationEnabled,
    getRemainingComplicationUserInfoTransfers,
    watchEvents,
} from 'react-native-watch-connectivity';

async function readComplicationState() {
    const [enabled, remaining] = await Promise.all([
        getIsComplicationEnabled(),
        getRemainingComplicationUserInfoTransfers(),
    ]);
    console.log({enabled, remaining});
}

const unsubscribe = watchEvents.on('paired', () => {
    readComplicationState();
});
```

## transferCurrentComplicationUserInfo

```ts
import {transferCurrentComplicationUserInfo} from 'react-native-watch-connectivity';

transferCurrentComplicationUserInfo({streak: 12, updatedAt: Date.now()});
```

It returns nothing. Where WatchConnectivity is unavailable, it does nothing.

## Spend the allowance carefully

Send a complication transfer only when the complication would show something new, and only when it is on the watch face:

```ts
import {
    getIsComplicationEnabled,
    getRemainingComplicationUserInfoTransfers,
    transferCurrentComplicationUserInfo,
    transferUserInfo,
} from 'react-native-watch-connectivity';

async function sendStreak(streak: number) {
    const [enabled, remaining] = await Promise.all([
        getIsComplicationEnabled(),
        getRemainingComplicationUserInfoTransfers(),
    ]);

    if (enabled && remaining > 0) {
        transferCurrentComplicationUserInfo({streak});
    } else {
        transferUserInfo({streak});
    }
}
```

WatchConnectivity accepts only property list values, so it does not deliver a dictionary that holds `null`. Leave out keys that have no value instead of setting them to `null`. This applies to every transfer and to application context.

## getIsComplicationEnabled

```ts
import {getIsComplicationEnabled} from 'react-native-watch-connectivity';

const enabled = await getIsComplicationEnabled(); // true | false
```

## getRemainingComplicationUserInfoTransfers

```ts
import {getRemainingComplicationUserInfoTransfers} from 'react-native-watch-connectivity';

const remaining = await getRemainingComplicationUserInfoTransfers(); // 0 or more
```
