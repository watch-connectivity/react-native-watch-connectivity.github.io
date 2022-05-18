---
id: reachability
title: Watch States
sidebar_label: Watch States
---

## Reachability

Some functionality e.g. [interactive messaging](/react-native-watch-connectivity/docs/communication#interactive-messaging) is only available
when the watch app is reachable. You can monitor as follows:

### get

```typescript
import { getReachability } from 'react-native-watch-connectivity'

const reachable = await getReachability()

console.log(reachable ? "Watch app is reachable" : "Watch app is not reachable")
``` 

### subscribe

```typescript
import { subscribeToReachability } from 'react-native-watch-connectivity'

const unsubscribe = subscribeToReachability(reachable => {
  console.log(reachable ? "Watch app is reachable" : "Watch app is not reachable")
})
```

## Pairing

You can determine whether or not the device is paired to an Apple Watch by doing the following:

```ts
import { getIsPaired, watchEvents } from 'react-native-watch-connectivity'

const isPaired = await getIsPaired();

console.log(
  isPaired ? 
    "phone is paired with a watch" :
    "phone is NOT paired with a watch"
)

watchEvents.on('paired', isPaired => {
console.log(
  isPaired ? 
    "phone is paired with a watch" :
    "phone is NOT paired with a watch"
)
});
```

## Installed

You can determine whether or not the companion watch app is installed by using the following methods

```ts
import { getIsInstalled, getIsWatchAppInstalled } from 'react-native-watch-connectivity'

const isPaired = await getIsPaired();

console.log(
  isPaired 
    ? "phone is paired with a watch" 
    : "phone is NOT paired with a watch"
)

const isWatchAppInstalled = await getIsWatchAppInstalled();

console.log(
  isWatchAppInstalled 
    ? "watch app is installed" 
    : "watch app is not installed"
)
```
