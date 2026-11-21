---
id: migrating-to-3
title: Migrating from 2.x to 3.0
sidebar_label: Migrating to 3.0
---

3.0 makes application context reliable in both directions, gives every error a typed `WatchError`, and makes the package safe to import on iPads, the web and Android. This page lists each breaking change with the code to change.

```bash
npm install react-native-watch-connectivity@^3.0.0
cd ios && pod install
```

The pod needs iOS 15.1 or later, the minimum for current React Native releases. See [Installation](./installation.md#requirements).

## useApplicationContext returns the context the watch sent

In 2.x the hook started from the context this phone last sent. In 3.0 it returns the context the watch last sent, including one that arrived while the app was closed.

```tsx title="2.x"
function Settings() {
    // Started from the context this phone sent
    const mySettings = useApplicationContext();
    // ...
}
```

```tsx title="3.0"
import {useEffect, useState} from 'react';
import {getApplicationContext, useApplicationContext} from 'react-native-watch-connectivity';

function Settings() {
    // The context the watch sent
    const fromWatch = useApplicationContext();

    // The context this phone sent
    const [sent, setSent] = useState<Record<string, unknown> | null>(null);
    useEffect(() => {
        getApplicationContext().then(setSent);
    }, []);

    // ...
    return null;
}
```

If you used the hook to read your own context, keep that value in your own state, or call `getApplicationContext()`.

## A received context is no longer sent back

In 2.x the module called `updateApplicationContext` with every context it received from the watch. That sent the watch's context back to the watch and replaced the context the phone sends. 3.0 keeps the two apart.

If your watch app relied on this echo, for example to read its own context back from the phone, keep that state on the watch instead. The watch's `WCSession.applicationContext` holds the context it sent.

## Errors are WatchError objects with a string code

Promise rejections, the `sendMessage` error callback, error events and a failed file transfer's `error` now give a [`WatchError`](./errors.md). Its `code` is a stable string. In 2.x the code was a bare native code such as `'7007'`.

```ts title="2.x"
sendMessage(message, onReply, error => {
    if (error.code === '7007') {
        // not reachable
    }
});
```

```ts title="3.0"
import {sendMessage} from 'react-native-watch-connectivity';

sendMessage({ping: true}, reply => console.log(reply), error => {
    if (error.code === 'not-reachable') {
        // not reachable
    }
});
```

For a value of unknown type, such as a caught error, use `isWatchError`:

```ts title="3.0"
import {isWatchError, sendMessageData} from 'react-native-watch-connectivity';

try {
    await sendMessageData('ping');
} catch (error) {
    if (isWatchError(error, 'not-reachable')) {
        // try again later
    }
}
```

`error.nativeCode` and `error.domain` keep the original `NSError` values.

## ERROR_CODE_SESSION_UNREACHABLE is deprecated

It now equals `'not-reachable'`. In 2.x it was `'EWCERRORDOMAIN7007'`, which never matched an error's code.

```ts title="2.x"
if (error.code === ERROR_CODE_SESSION_UNREACHABLE) {
    // never true
}
```

```ts title="3.0"
import {sendMessage} from 'react-native-watch-connectivity';

sendMessage({ping: true}, undefined, error => {
    if (error.code === 'not-reachable') {
        // works
    }
});
```

## Error events have new payloads

| Event | 3.0 payload |
| --- | --- |
| `activation-error` | `{ error }` |
| `application-context-error` | `{ context, error }` |
| `user-info-error` | `{ userInfo, error }` |
| `file-received-error` | `{ fileInfo, error }` |

```ts title="2.x"
watchEvents.on('user-info-error', error => {
    console.warn(error);
});
```

```ts title="3.0"
import {watchEvents} from 'react-native-watch-connectivity';

watchEvents.on('user-info-error', ({userInfo, error}) => {
    console.warn(error.code, userInfo);
});
```

## The application-context-received-error event is removed

It reported failures of the echo described above, which 3.0 removes. Delete the listener.

```ts title="2.x"
watchEvents.on('application-context-received-error', error => {
    console.warn(error);
});
```

In 3.0 there is no replacement. TypeScript reports the event name as an error.

## session-became-inactive and session-did-deactivate take no arguments

The library also reactivates the session after a watch switch, so you do not need to.

```ts title="2.x"
watchEvents.on('session-did-deactivate', payload => {
    console.log('deactivated', payload);
});
```

```ts title="3.0"
import {watchEvents} from 'react-native-watch-connectivity';

watchEvents.on('session-did-deactivate', () => {
    console.log('deactivated');
});
```

## A failed file transfer's error is a WatchError

```ts title="2.x"
watchEvents.on('file', event => {
    if (event.type === 'error') {
        console.warn(event.error?.message);
    }
});
```

```ts title="3.0"
import {watchEvents} from 'react-native-watch-connectivity';

watchEvents.on('file', event => {
    if (event.error) {
        console.warn(event.error.code, event.error.message);
    }
});
```

## updateApplicationContext returns a promise

It rejects with a `WatchError` when the system refuses the context, for example `payload-unsupported-types` for a `null` value. The `application-context-error` event still fires.

If you neither await the promise nor attach a `catch`, a failure is now an unhandled promise rejection.

```ts title="2.x"
updateApplicationContext({token: null});
```

```ts title="3.0"
import {updateApplicationContext} from 'react-native-watch-connectivity';

try {
    await updateApplicationContext({token: 'abc'});
} catch (error) {
    console.warn(error);
}
```

## getApplicationContext resolves null when nothing was sent

In 2.x it resolved `{}`.

```ts title="2.x"
const context = await getApplicationContext();
if (Object.keys(context).length > 0) {
    // ...
}
```

```ts title="3.0"
import {getApplicationContext} from 'react-native-watch-connectivity';

const context = await getApplicationContext();
if (context) {
    // ...
}
```

## State events fire each time the session activates

`paired`, `installed` and `reachability` now fire each time the session activates, including at every launch and after a watch switch, even when the value has not changed. Make these handlers safe to run with an unchanged value.

```ts title="2.x"
watchEvents.on('paired', () => {
    showToast('Watch paired'); // assumed the value had changed
});
```

```ts title="3.0"
import {watchEvents} from 'react-native-watch-connectivity';

let wasPaired: boolean | null = null;

watchEvents.on('paired', paired => {
    if (wasPaired === false && paired) {
        console.log('Watch paired');
    }
    wasPaired = paired;
});
```

## Buffered events wait for their own listener

Events that arrive before JavaScript listens are delivered when JavaScript listens to that event. In 2.x they were all delivered to the first listener of any kind, so a `message` could be lost to an earlier `reachability` listener. Add a listener for each event you need. Nothing else changes.

## _getMissedUserInfo is no longer exported

It was internal. The first call to a `user-info` listener already includes user info that arrived before the listener.

```ts title="2.x"
const missed = await _getMissedUserInfo();
```

```ts title="3.0"
import {watchEvents} from 'react-native-watch-connectivity';

watchEvents.on('user-info', items => {
    // includes user info that arrived before this listener
    items.forEach(item => console.log(item));
});
```

## Android, the web and iPads export the full API as a no-op

On Android, 2.x exported only the four hooks, so other imports were `undefined`. On iPads, sends never settled. In 3.0 every platform exports the full API. Where WatchConnectivity is unavailable, `isSupported()` returns `false`, sends reject with `session-not-supported`, and state queries resolve `false`, `0`, `null` or `{}`.

```ts title="2.x"
import {Platform} from 'react-native';

if (Platform.OS === 'ios') {
    const {sendMessage} = require('react-native-watch-connectivity');
    sendMessage({ping: true});
}
```

```ts title="3.0"
import {isSupported, sendMessage} from 'react-native-watch-connectivity';

if (isSupported()) {
    sendMessage({ping: true});
}
```

See [Platforms](./installation.md#platforms) for the full list.

## New in 3.0

These additions need no changes to existing code:

- [`isSupported()`](./api-watch-state.md#issupported)
- [`getReceivedApplicationContext()`](./application-context.md#getreceivedapplicationcontext)
- [`getIsComplicationEnabled()` and `getRemainingComplicationUserInfoTransfers()`](./complications.md)
- [`WatchError`, `isWatchError`, `WATCH_ERROR_CODES` and `WatchErrorCode`](./errors.md)

The full list of changes is in the [3.0.0 release notes](https://github.com/watch-connectivity/react-native-watch-connectivity/releases/tag/3.0.0).
