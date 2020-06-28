---
id: reachability
title: Reachability
sidebar_label: Reachability
---

## Reachability

Some functionality e.g. [interactive messaging](/docs/communication#interactive-messaging) is only available
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

You can determine whether or not the watch app is paired/installed by using the following methods:

```ts
import { getIsPaired, getIsWatchAppInstalled } from 'react-native-watch-connectivity'

const isPaired = await getIsPaired();

console.log(
  isPaired ? 
    "watch app is paired" :
    "no paired watch app"
)

const isWatchAppInstalled = await getIsWatchAppInstalled();

console.log(
  isWatchAppInstalled ? 
    "watch app is installed" :
    "watch app is not installed"
)
```
