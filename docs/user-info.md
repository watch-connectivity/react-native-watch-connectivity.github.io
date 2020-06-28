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

## getMissedUserInfo

Returns all user info messages received prior to a user info subscription being registered e.g. user info sent by the watch whilst the react native app was closed or starting up

```ts
import { getMissedUserInfo } from "react-native-watch-connectivity"

const queue = await getMissedUserInfo();

queue.forEach((userInfo, {timestamp, id}) => {
  console.log(userInfo);
})
```

### TypeScript support

It's possible to type the user info expected by the companion app.

```typescript
import { getMissedUserInfo } from "react-native-watch-connectivity"

type MyUserInfo = {key: string}

const queue = await getMissedUserInfo<MyUserInfo>();

queue.forEach(userInfo => {
  console.log(userInfo.key);
})
```
