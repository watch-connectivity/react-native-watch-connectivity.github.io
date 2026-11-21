---
id: communication
title: Communication
sidebar_label: Communication
---

There are two ways to communicate with the watch app:

- Interactive messaging
    - Messages
    - Message data
- Background transfers
    - User info
    - Complication user info
    - Application context
    - Files (see the [Files guide](./guides-files.md))

## Interactive messaging

Interactive messaging needs the watch to be [reachable](./reachability.md#reachability). Use it when the other side needs the information now.

### Send messages

```ts
import {sendMessage} from 'react-native-watch-connectivity';

sendMessage({text: 'Hello watch!'}, reply => {
    console.log(reply); // {text: 'Hello React Native app!'}
});
```

`sendMessage` does not return a promise. Pass a third argument to handle errors. It receives a [`WatchError`](./errors.md):

```ts
import {sendMessage} from 'react-native-watch-connectivity';

sendMessage(
    {text: 'Hello watch!'},
    reply => console.log(reply),
    error => {
        if (error.code === 'not-reachable') {
            // The watch app is not in the foreground. Try a background transfer instead.
        }
    }
);
```

Without an error callback, the library logs the error with `console.warn`.

### Send message data

`sendMessageData` sends a string as bytes, encoded as UTF-8 by default. It resolves with the watch's reply bytes as a string, one character for each byte. For an ASCII reply, that is the reply's text.

```ts
import {sendMessageData} from 'react-native-watch-connectivity';

const reply = await sendMessageData('Hello watch!');
console.log(reply); // 'Hello React Native app!'
```

### Receive and reply to messages

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('message', (message, reply) => {
    console.log('received message from watch', message);
    if (reply) {
        reply({text: 'Thanks watch!'});
    }
});
```

`reply` is `null` when the watch did not ask for a reply.

The library does not pass message data from the watch (`sendMessageData` on the watch) to JavaScript. Send a dictionary with `sendMessage` from the watch instead.

## Background transfers

Use background transfers when the information is not needed at once. The system decides when to deliver it. The watch does not need to be reachable.

### User info

Each user info transfer is queued and delivered in order. Nothing is replaced. Compare this with [application context](#application-context), where each context replaces the last.

The library keeps user info that arrives before you add a `user-info` listener, for example while React Native starts. The first call to your listener includes it.

#### Receive user info

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('user-info', items => {
    // An array. The first call includes user info that arrived before the listener.
    items.forEach(item => {
        console.log('received user info', item);
    });
});
```

#### Send user info to the watch

```ts
import {transferUserInfo} from 'react-native-watch-connectivity';

transferUserInfo({key: 'value'});
```

`transferUserInfo` returns nothing. If a transfer fails, the [`user-info-error`](./api-events.md#user-info-error) event fires.

### Complication user info

To update a complication on the watch face, send the data with `transferCurrentComplicationUserInfo`. The system wakes the watch app to receive it, but only a limited number of times each day. See [Complications](./complications.md).

```ts
import {transferCurrentComplicationUserInfo} from 'react-native-watch-connectivity';

transferCurrentComplicationUserInfo({streak: 12});
```

### Application context

Use application context when only the latest state matters, such as settings or a sign-in token. Each new context replaces the last. The other device receives the latest one when its app next runs.

The phone keeps the context it sent and the context the watch sent apart. See [Application Context](./application-context.md) for the full API.

#### Send application context to the watch

`updateApplicationContext` returns a promise that rejects with a `WatchError` if the system refuses the context.

```ts
import {updateApplicationContext} from 'react-native-watch-connectivity';

await updateApplicationContext({key: 'value'});
```

#### Read the context the watch sent

```ts
import {getReceivedApplicationContext} from 'react-native-watch-connectivity';

const contextFromWatch = await getReceivedApplicationContext();
```

#### Read the context this phone sent

```ts
import {getApplicationContext} from 'react-native-watch-connectivity';

const contextSentToWatch = await getApplicationContext();
```

#### Listen for context from the watch

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('application-context', context => {
    console.log('context from the watch', context);
});
```

In a component, use [`useApplicationContext`](./api-hooks.md#useapplicationcontext).

## Handling errors

Every error the library gives you is a [`WatchError`](./errors.md) with a stable string `code`. This includes promise rejections, the `sendMessage` error callback, error events and a failed file transfer's `error`.

```ts
import {isWatchError, sendMessageData} from 'react-native-watch-connectivity';

try {
    await sendMessageData('ping');
} catch (error) {
    if (isWatchError(error, 'not-reachable')) {
        // try again when the watch app is open
    }
}
```
