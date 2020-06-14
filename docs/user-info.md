---
id: user-info
title: User Info
sidebar_label: User Info
---

TODO: Describe the queueing system

Typical workflow:

```ts
import { 
  dequeueUserInfo, 
  getQueuedUserInfo, 
  subscribeToUserInfo 
} from "react-native-watch-connectivity"

function processUserInfo(id, userInfo) {
  consumeUserInfo(userInfo);
  dequeueUserInfo(id); // Mark user info as consumed
}

getQueuedUserInfo().then(queuedUserInfo => {
  // Consume user info sent by the watch whilst the app has been closed
  queuedUserInfo.forEach(({userInfo, id}) => {
    processUserInfo(id, userInfo);
  })

  // Deal with any user info sent whilst the app is open
  subscribeToUserInfo(({userInfo, id}) => {
    processUserInfo(id, userInfo);
  })
})
```

## transferUserInfo

```ts
import { transferUserInfo } from "react-native-watch-connectivity"

transferUserInfo({key: "value"})
```

## transferCurrentComplicationUserInfo

Same as transferUserInfo but receives priority. Generally used to update information with complications presented on the watch face.

```ts
import { transferCurrentComplicationUserInfo } from "react-native-watch-connectivity"

transferCurrentComplicationUserInfo({key: "value"})
```

## getQueuedUserInfo

Returns all unprocessed user info received by the Watch, including all user info messages received whilst the companion app is closed. 

```ts
import { getQueuedUserInfo } from "react-native-watch-connectivity"

const queue = await getQueuedUserInfo();

queue.forEach(({userInfo, timestamp, id}) => {
  console.log(userInfo);
})
```

### TypeScript support

It's possible to type the user info expected by companion app.

```typescript
import { getQueuedUserInfo } from "react-native-watch-connectivity"

type MyUserInfo = {key: string}

const queue = await getQueuedUserInfo<MyUserInfo>();

queue.forEach(({userInfo}) => {
  console.log(userInfo.key);
})
```

## clearUserInfoQueue

```ts
import { clearUserInfoQueue } from "react-native-watch-connectivity"

await clearUserInfoQueue();
```

## dequeueUserInfo

```ts
import { getQueuedUserInfo, dequeueUserInfo } from "react-native-watch-connectivity"

const queue = await getQueuedUserInfo();

queue.forEach(({userInfo, timestamp, id}) => {
  consumeUserInfo(userInfo);
  dequeueUserInfo(id); 
})
```

## subscribeToUserInfo

```ts
import { 
  subscribeToUserInfo
} from "react-native-watch-connectivity"

subscribeToUserInfo(({userInfo, timestamp, id}) => {
  // ...
})
```
