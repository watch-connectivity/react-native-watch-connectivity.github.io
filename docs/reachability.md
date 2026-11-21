---
id: reachability
title: Watch State
sidebar_label: Watch State
---

Four values describe whether, and how, you can reach the watch.

## Support

`isSupported()` is a synchronous check. It is `false` where WatchConnectivity is unavailable: iPads, Android and the web. There, the state getters below resolve `false` and the hooks return `false`. See [Platforms](./installation.md#platforms).

```ts
import {isSupported} from 'react-native-watch-connectivity';

if (isSupported()) {
    // show watch features
}
```

## Reachability

From the phone, the watch is reachable when the watch app is running on the paired watch and the watch is in range. This means the watch app is in the foreground, or running in the background with high priority, for example during a workout. Reachability is required for [interactive messaging](./communication.md#interactive-messaging).

```tsx
import {getReachability, useReachability} from 'react-native-watch-connectivity';

// Imperative
const reachable = await getReachability();

// Hook
function MyComponent() {
    const reachable = useReachability();
    // ...
    return null;
}
```

## Pairing

Check whether the phone is paired with an Apple Watch.

```tsx
import {getIsPaired, usePaired} from 'react-native-watch-connectivity';

// Imperative
const paired = await getIsPaired();

// Hook
function MyComponent() {
    const paired = usePaired();
    // ...
    return null;
}
```

## Installation

Check whether the companion watch app is installed.

```tsx
import {getIsWatchAppInstalled, useInstalled} from 'react-native-watch-connectivity';

// Imperative
const installed = await getIsWatchAppInstalled();

// Hook
function MyComponent() {
    const installed = useInstalled();
    // ...
    return null;
}
```

## Events

Subscribe to changes in watch state:

```ts
import {watchEvents} from 'react-native-watch-connectivity';

watchEvents.on('reachability', reachable => {
    console.log('Reachability:', reachable);
});

watchEvents.on('paired', paired => {
    console.log('Paired:', paired);
});

watchEvents.on('installed', installed => {
    console.log('Installed:', installed);
});
```

These events fire when the value changes. They also fire each time the session activates, even when the value has not changed. That includes every launch, and the moment after the user switches to another paired watch, when they describe the new watch. Write handlers that are safe to run with an unchanged value.

## Reading state at launch

The getters read `false` until the session finishes activating, shortly after launch. The hooks start at `false` and update when the session activates, so they need no extra work. If you call a getter at launch, also listen for the event, or read the value again after it fires.
