---
id: installation
title: Installation
sidebar_label: Installation
---

## Requirements

- React Native 0.76 or later.
- iOS 15.1 or later. The pod uses React Native's own minimum iOS version, which is 15.1 for current releases, including React Native 0.84.
- A watch app written in Swift or Objective-C that uses `WCSession`.

## Install

```bash
npm install react-native-watch-connectivity
# or
yarn add react-native-watch-connectivity
```

## Link

```bash
cd ios && pod install
```

## Expo

This library has been used in Expo apps with the Bare Workflow and EAS Build. It needs no configuration beyond the install and `pod install` steps above.

## Platforms

WatchConnectivity exists only on iPhone. On every other platform the package exports the same API as a no-op, so you can import it without platform checks.

| Platform | `isSupported()` | Behaviour |
| --- | --- | --- |
| iPhone | `true` | The full API. |
| iPad | `false` | Sends reject with `session-not-supported`. State queries resolve empty values. |
| Android | `false` | The same as iPad. The Android module builds but does nothing. |
| Web, Node and other platforms | `false` | The same as iPad. The package loads a JavaScript-only implementation that does not import `react-native`. |

Check `isSupported()` before you show watch features:

```tsx
import {isSupported} from 'react-native-watch-connectivity';

function WatchSettings() {
    if (!isSupported()) {
        return null;
    }
    // ... show the watch settings
    return null;
}
```

Where `isSupported()` is `false`:

- `sendMessage` calls its error callback with a `session-not-supported` error.
- `sendMessageData`, `startFileTransfer` and `updateApplicationContext` reject with a `session-not-supported` error.
- `transferUserInfo` and `transferCurrentComplicationUserInfo` do nothing.
- `getIsPaired`, `getIsWatchAppInstalled`, `getReachability` and `getIsComplicationEnabled` resolve `false`. `getRemainingComplicationUserInfoTransfers` resolves `0`. `getApplicationContext` and `getReceivedApplicationContext` resolve `null`. `getFileTransfers` resolves `{}`.
- `usePaired`, `useInstalled` and `useReachability` return `false`. `useApplicationContext` returns `null`.
- Events never fire. `watchEvents.once(event)` without a callback returns a promise that never settles.

Upgrading from 2.x? Read [Migrating from 2.x to 3.0](./migrating-to-3.md).
