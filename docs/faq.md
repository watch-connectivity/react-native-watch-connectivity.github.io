---
id: faq
title: FAQ
sidebar_label: FAQ
---

## Can I use this library to build my watch app in React Native?

No. This library lets your React Native app communicate with a watch app written in Swift or Objective-C.

## Does it work on iPad, Android or the web?

You can import it on every platform, but it only does anything on iPhone. Elsewhere `isSupported()` returns `false`, sends reject with `session-not-supported`, and state queries resolve empty values. See [Platforms](./installation.md#platforms).

## Why does useApplicationContext not show the context I sent?

`useApplicationContext` returns the context the watch sent. To read the context this phone sent, call [`getApplicationContext()`](./application-context.md#getapplicationcontext). See [Application Context](./application-context.md).

## How do I tell an unreachable watch from other errors?

Check the error's `code`. Every error is a [`WatchError`](./errors.md):

```ts
import {sendMessage} from 'react-native-watch-connectivity';

sendMessage({ping: true}, undefined, error => {
    if (error.code === 'not-reachable') {
        // the watch app is not open
    }
});
```

## Why does getIsComplicationEnabled return false at launch?

The complication getters read `false` and `0` until the WatchConnectivity session finishes activating, shortly after launch. Read them again after the first `paired` or `reachability` event. See [Complications](./complications.md#wait-for-the-session-to-activate).

## I am upgrading from 2.x. What do I need to change?

See [Migrating from 2.x to 3.0](./migrating-to-3.md).
