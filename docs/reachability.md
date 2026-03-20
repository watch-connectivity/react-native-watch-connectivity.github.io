---
id: reachability
title: Watch State
sidebar_label: Watch State
---

There are three properties that can be used to determine the current state of the watch.

## Reachability

A watch is reachable when both the React Native app and the Watch app are running in the foreground. Reachability is required for [interactive messaging](/docs/communication#interactive-messaging).

```ts
import {getReachability, useReachability} from 'react-native-watch-connectivity';

// Imperative
const reachable = await getReachability();

// Hook
function MyComponent() {
    const reachable = useReachability();
    // ...
}
```

## Pairing

Check whether the phone is paired with an Apple Watch.

```ts
import {getIsPaired, usePaired} from 'react-native-watch-connectivity';

// Imperative
const paired = await getIsPaired();

// Hook
function MyComponent() {
    const paired = usePaired();
    // ...
}
```

## Installation

Check whether the companion watch app is installed.

```ts
import {getIsWatchAppInstalled, useInstalled} from 'react-native-watch-connectivity';

// Imperative
const installed = await getIsWatchAppInstalled();

// Hook
function MyComponent() {
    const installed = useInstalled();
    // ...
}
```

## Events

Subscribe to changes in watch state:

```ts
import {watchEvents} from 'react-native-watch-connectivity';

watchEvents.addListener('reachability', reachable => {
    console.log('Reachability changed:', reachable);
});

watchEvents.addListener('paired', paired => {
    console.log('Pairing changed:', paired);
});

watchEvents.addListener('installed', installed => {
    console.log('Installation changed:', installed);
});
```
