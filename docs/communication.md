---
id: communication
title: Communication
sidebar_label: Communication
---

WatchApp communication methods can be split into two categories:

- Interactive messaging
    - Messages
    - Message data
- Background transfers
    - User Info
    - Application Context

## Interactive Messaging

Interactive messaging requires both your app & watch extension to be [reachable](/docs/reachability).

These methods should be used when information is required immediately & both apps are running in the foreground.

### Key/Value Pairs

#### Companion App

```typescript
import { sendMessage } from "react-native-watch-connectivity";

sendMessage({text: "Hello watch!"}, reply => {
  console.log(reply); // {"text": "Hello React Native app!"}
}); 
```

#### Watch Extension

```swift
func session(
  _ session: WCSession,
  didReceiveMessage message: [String: Any],
  replyHandler: @escaping ([String: Any]) -> Void
) {
  print("watch received message", message);
  replyHandler(["text": "Hello React Native app!"])
}
```

### Raw Data

#### Companion App

```typescript
import { sendMessageData } from "react-native-watch-connectivity";

// Send raw data
sendMessageData("SGVsbG8gd2F0Y2g=", reply => {
  console.log(reply); // SGVsbG8gcmVhY3QgbmF0aXZlIGFwcCE=
})
```

#### Watch Extension

```swift
// Receive raw data
func session(
    _ session: WCSession,
    didReceiveMessageData messageData: Data,
    replyHandler: @escaping (Data) -> Void
  ) {
  print("watch received data", data);
  replyHandler("SGVsbG8gcmVhY3QgbmF0aXZlIGFwcCE=")
}
```

## Background Transfers

These methods should be used when information is not required immediately. The OS is responsible for determining when
the content is delivered. You do not need both apps to be reachable in order to use these methods.

### User Info

User info messages are queued & delivered in FIFO order. User info differs from [Application Context](/docs/communication#application-context) in that nothing
is overridden. You will need to handle each piece of user info in order.

#### Subscribe to user info from the Watch 

This library implements a queueing system in order to organise each piece of user info received from the watch. This ensures that all user info
sent from the watch is accessible to the companion React Native app - even if that user info arrives BEFORE a user info
listener is registered within react native. (This solves a problem whereby user info could arrive on the native side and
be emitted whilst your app is still starting up, for example)

A typical workflow looks like:

```typescript
import { 
  dequeueUserInfo, 
  getQueuedUserInfo, 
  subscribeToUserInfo 
} from "react-native-watch-connectivity"

function consumeUserInfo(userInfo) {
  // Do something with the user info
}

getQueuedUserInfo().then(queuedUserInfo => {
  // Consume user info sent by the watch prior to subscribing to new user info
  queuedUserInfo.forEach(({userInfo, timestamp, id}) => {
    consumeUserInfo(userInfo);
    dequeueUserInfo(id); // Mark user info as consumed
  })

  // Deal with any further user info sent by the watch app
  subscribeToUserInfo(({userInfo, id}) => {
    consumeUserInfo(userInfo);
    dequeueUserInfo(id); // Mark user info as consumed
  })
})
```

To simplify this workflow, you can use `consumeUserInfo` which will dequeue user info automatically.

```typescript
import { consumeUserInfo } from 'react-native-watch-connectivity';
 
const unsubscribe = consumeUserInfo(
  async function(userInfo) {
      await doSomethingWithTheUserInfo(userInfo)
      // Will be dequeued automatically, and you'll never see it again
  }
)
```

#### Transfer user info the watch

To send user info to the watch you can use `transferUserInfo`:

```ts
import { transferUserInfo } from 'react-native-watch-connectivity' 

transferUserInfo({key: 'value'})
```

To send high priority user info, for example data that should be displayed within a Complication, on the watch face, as 
soon as possible you can use `transferCurrentComplicationUserInfo`

```ts
import { transferCurrentComplicationUserInfo } from 'react-native-watch-connectivity' 

transferCurrentComplicationUserInfo({key: 'value'})
```

### Application Context

Application context should be used when only the *latest* information is required. Once the Watch App or Companion App
is launched the data will be received.

Application context differs from [User info](/docs/communication#user-info) in that the newest Application Context
delivery overwrites the last, whereas each User Info message forms a queue.

#### Send application context to the watch

```typescript
import { updateApplicationContext } from 'react-native-watch-connectivity' 

updateApplicationContext({key: "value"}) 
```

#### Get the latest application context

```typescript
import { getApplicationContext } from 'react-native-watch-connectivity'

const applicationContext = await getApplicationContext() 
```

#### Subscribe to application context

```typescript
import { subscribeToApplicationContext } from "react-native-watch-connectivity";

const unsubscribe = subscribeToApplicationContext(context => {
  console.log('context', context)
})
```
