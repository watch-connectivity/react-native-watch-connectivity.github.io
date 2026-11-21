---
id: errors
title: Errors
sidebar_label: Errors
---

Every error the library gives you is a `WatchError`. This includes:

- promise rejections from `sendMessageData`, `startFileTransfer` and `updateApplicationContext`
- the error callback of `sendMessage`
- the `error` field of `activation-error`, `application-context-error`, `user-info-error` and `file-received-error` events
- the `error` field of a failed file transfer

## WatchError

`WatchError` extends `Error` and adds:

| Property | Type | |
| --- | --- | --- |
| `code` | `WatchErrorCode` | A stable string, such as `'not-reachable'` |
| `nativeCode` | `number \| null` | The `NSError` code, such as `7007`, when the error came from iOS |
| `domain` | `string \| null` | The `NSError` domain, such as `'WCErrorDomain'`, when the error came from iOS |
| `name` | `string` | Always `'WatchError'` |
| `message` | `string` | The system's description of the error |

## isWatchError

```ts no-check
isWatchError(value: unknown, code?: WatchErrorCode): value is WatchError
```

Returns `true` when `value` is a `WatchError`. Pass a `code` to also check the code.

```ts
import {isWatchError, updateApplicationContext} from 'react-native-watch-connectivity';

try {
    await updateApplicationContext({token: 'abc'});
} catch (error) {
    if (isWatchError(error, 'session-not-supported')) {
        // no watch on this device
    } else if (isWatchError(error)) {
        console.warn(error.code, error.nativeCode);
    } else {
        throw error;
    }
}
```

In a `sendMessage` error callback the argument is already a `WatchError`, so compare `error.code` directly:

```ts
import {sendMessage} from 'react-native-watch-connectivity';

sendMessage({ping: true}, undefined, error => {
    if (error.code === 'not-reachable') {
        // the watch app is not open
    }
});
```

## Error codes

`WatchErrorCode` is a union of string literals. Each of Apple's `WCErrorCode` values has one. `WATCH_ERROR_CODES` lists them at runtime.

| `code` | `WCErrorCode` | Native code |
| --- | --- | --- |
| `generic-error` | `genericError` | 7001 |
| `session-not-supported` | `sessionNotSupported` | 7002 |
| `session-missing-delegate` | `sessionMissingDelegate` | 7003 |
| `session-not-activated` | `sessionNotActivated` | 7004 |
| `device-not-paired` | `deviceNotPaired` | 7005 |
| `watch-app-not-installed` | `watchAppNotInstalled` | 7006 |
| `not-reachable` | `notReachable` | 7007 |
| `invalid-parameter` | `invalidParameter` | 7008 |
| `payload-too-large` | `payloadTooLarge` | 7009 |
| `payload-unsupported-types` | `payloadUnsupportedTypes` | 7010 |
| `message-reply-failed` | `messageReplyFailed` | 7011 |
| `message-reply-timed-out` | `messageReplyTimedOut` | 7012 |
| `file-access-denied` | `fileAccessDenied` | 7013 |
| `delivery-failed` | `deliveryFailed` | 7014 |
| `insufficient-space` | `insufficientSpace` | 7015 |
| `session-inactive` | `sessionInactive` | 7016 |
| `transfer-timed-out` | `transferTimedOut` | 7017 |
| `companion-app-not-installed` | `companionAppNotInstalled` | 7018 |
| `watch-only-app` | `watchOnlyApp` | 7019 |
| `unknown` | | Any other error, for example one from outside `WCErrorDomain` |

On iPads, Android and the web, every send fails with `session-not-supported`.

## ERROR_CODE_SESSION_UNREACHABLE (deprecated)

`ERROR_CODE_SESSION_UNREACHABLE` equals `'not-reachable'`. It is kept so that 2.x code still compiles. Compare `error.code` with `'not-reachable'` instead.

```ts
import {ERROR_CODE_SESSION_UNREACHABLE} from 'react-native-watch-connectivity';

console.log(ERROR_CODE_SESSION_UNREACHABLE); // 'not-reachable'
```

In 2.x, an error's `code` was the bare native code, such as `'7007'`, so it never equalled this constant.
