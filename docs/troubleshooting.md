---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
---

Communication between the iOS simulator and the Apple Watch simulator is unreliable. Use real devices where you can.

## Messages are not being received on the simulator

Communication between the iOS simulator and the Apple Watch simulator can be very slow. Responses can take up to 2 minutes. Real devices are much faster.

## Watch remains unreachable on the simulator

Reinstall both apps until it works, or use real devices.

## Watch app does not receive user info or application context in the simulator

Since iOS 13 and watchOS 6, a simulator bug can stop the watch app's `WCSessionDelegate` from receiving `didReceiveUserInfo`. There is no fix. Use real devices.

## An unhandled promise rejection from updateApplicationContext

Since 3.0, `updateApplicationContext` returns a promise that rejects when the system refuses the context. Await it inside `try`/`catch`, or attach a `catch`. A common cause is a `null` value, which gives `payload-unsupported-types`. Leave out keys that have no value. See [Application Context](./application-context.md#updateapplicationcontext).

## The context the watch sent is overwritten

Before 3.0, the library sent every context it received back to the watch. That replaced the context the phone sends. Upgrade to 3.0, which keeps the two apart.

## Error codes such as `'7007'` or `'EWCERRORDOMAIN7007'`

These are 2.x error codes. Since 3.0, `error.code` is a string such as `'not-reachable'`. The native code is on `error.nativeCode`. See [Errors](./errors.md).

## Sends never finish on iPad

Before 3.0, sends never settled on devices without WatchConnectivity. Since 3.0 they reject with `session-not-supported`. Check `isSupported()` before you show watch features.

## Paired, installed or reachability events fire with an unchanged value

This is expected. Since 3.0 these events fire each time the session activates, including at every launch and after a watch switch. See [Watch State](./reachability.md#events).
