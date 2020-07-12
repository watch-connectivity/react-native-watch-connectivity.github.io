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

Interactive messaging requires both your app & watch extension to be [reachable](/react-native-watch-connectivity/docs/reachability).

These methods should be used when information is required immediately & both apps are running in the foreground.

### Send Messages

```typescript
import { sendMessage } from "react-native-watch-connectivity";

sendMessage({text: "Hello watch!"}, reply => {
    console.log(reply); // {"text": "Hello React Native app!"}
}); 
```

### Send Message Data

```typescript
import { sendMessageData } from "react-native-watch-connectivity";

// Send raw data
sendMessageData("SGVsbG8gd2F0Y2g=", reply => {
    console.log(reply); // SGVsbG8gcmVhY3QgbmF0aXZlIGFwcCE=
})
```

### Receive/Reply to Messages 

You can also receive & reply to messages from the watch.

```typescript
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('message', (message, reply) => {
    console.log('received message from watch', message);
    reply({text: "Thanks watch!"});
})
```

Or for message data

```typescript
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('message-data', (data, reply) => {
    console.log('received message data from watch', data);
})
```

## Background Transfers

These methods should be used when information is not required immediately. The OS is responsible for determining when
the content is delivered. You do not need both apps to be reachable in order to use these methods.

### User Info

User info differs from [Application Context](/react-native-watch-connectivity/docs/communication#application-context) in that nothing is overridden. You will need to handle each piece of user info in order.

This library will cache any user info received before a user info event handler is registered. This solves an issue whereby user info could be missed whilst React Native is initialising. 

#### Receive user info 

```typescript jsx
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('user-info', userInfo => {
    // Emits an array of user info which will include any user info received before the React Native app initialises.
    userInfo.map(userInfo => {
       console.log('received user info', userInfo);
    })
});
```

#### Transfer user info to the watch

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

Application context differs from [User info](/react-native-watch-connectivity/docs/communication#user-info) in that the newest Application Context
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

#### Application context events

```typescript
import { watchEvents } from "react-native-watch-connectivity";

const unsubscribe = watchEvents.addListener('application-context', context => {
    console.log('context', context)
})
```
