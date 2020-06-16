---
id: user-info
title: User Info
sidebar_label: User Info
---

## transferUserInfo

```ts
import { transferUserInfo } from "react-native-watch-connectivity"

const userInfo = {key: "value"}; // Any number of key/value pairs

transferUserInfo(userInfo); 
```

## transferCurrentComplicationUserInfo

Same as transferUserInfo but receives priority. Generally used to update information with complications presented on the watch face.

```ts
import { transferCurrentComplicationUserInfo } from "react-native-watch-connectivity"

const userInfo = {key: "value"}; // Any number of key/value pairs

transferCurrentComplicationUserInfo(userInfo);
```

## consumeUserInfo

Handle all user info received from the Watch. You will also receive all user info sent from the Watch prior to the subscription being created. User info will be dequeued automatically.

```ts
const stop = consumeUserInfo(async (userInfo, date) => {
    console.log('Received user info', userInfo);
    await doSomeThingWithUserInfo(userInfo);
})

// ...

stop();
```

### Typescript Support

```ts
// Type out expected user info to be received from the Watch
type UserInfoPayload {
	myNumber: number;
    myText: string;
}

consumeUserInfo<UserInfoPayload>(async (userInfo, date) => {
    console.log(userInfo.myText);
})
```

## getQueuedUserInfo

Returns all unprocessed user info received by the Watch, including all user info messages received prior to a user info subscription being registered.

```ts
import { getQueuedUserInfo } from "react-native-watch-connectivity"

const queue = await getQueuedUserInfo();

queue.forEach(({userInfo, timestamp, id}) => {
  console.log(userInfo);
})
```

### TypeScript support

It's possible to type the user info expected by the companion app.

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
   console.log(`User info received @ ${timestamp}:`, JSON.stringify(userInfo, null, 2));
})
```

### TypeScript Support

```ts
import { 
  subscribeToUserInfo
} from "react-native-watch-connectivity"


// Type out expected user info to be received from the Watch
type UserInfoPayload {
	myNumber: number;
    myText: string;
}

subscribeToUserInfo<UserInfoPayload>(({userInfo, timestamp, id}) => {
  console.log(userInfo.myText)
})
```