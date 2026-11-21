---
id: messages
title: Messages
sidebar_label: Messages
---

Messages need the watch to be [reachable](./reachability.md#reachability).

## sendMessage

```ts no-check
sendMessage(message, replyCallback?, errorCallback?): void
```

Sends a dictionary to the watch. It does not return a promise.

- `replyCallback` receives the watch's reply.
- `errorCallback` receives a [`WatchError`](./errors.md). Without it, the library logs the error with `console.warn`.

```ts
import {sendMessage} from 'react-native-watch-connectivity';
import type {WatchError} from 'react-native-watch-connectivity';

const message = {
    key: 'value',
};

const replyHandler = (reply: Record<string, unknown>) => {
    console.log('Reply from watch', reply);
};

const errorHandler = (error: WatchError) => {
    console.warn(error.code, error.message);
};

sendMessage(message, replyHandler, errorHandler);
```

Common error codes are `not-reachable`, `message-reply-timed-out`, `payload-too-large` and, where WatchConnectivity is unavailable, `session-not-supported`.

### TypeScript support

The first type argument is the reply from the watch. The second is the message you send. Use `type` aliases, not interfaces: each type must be assignable to `Record<string, unknown>`.

```ts
import {sendMessage} from 'react-native-watch-connectivity';

type MessageToWatch = {
    text: string;
};

type MessageFromWatch = {
    reply: string;
};

sendMessage<MessageFromWatch, MessageToWatch>(
    {text: 'Hello watch!'},
    response => {
        console.log(response.reply);
    }
);
```

## sendMessageData

```ts no-check
sendMessageData(data: string, encoding?: number): Promise<string>
```

Encodes `data` as bytes and sends them to the watch. The watch receives them in `session(_:didReceiveMessageData:replyHandler:)`.

- `encoding` is an `NSStringEncoding` value. The default is `4`, UTF-8.
- The promise resolves with the watch's reply bytes as a string, one character for each byte. For an ASCII reply, that is the reply's text.
- The promise rejects with a [`WatchError`](./errors.md).

```ts
import {sendMessageData} from 'react-native-watch-connectivity';

const reply = await sendMessageData('Hello watch!');
console.log('Reply from watch', reply);
```

## Receiving messages

Listen to the [`message`](./api-events.md#message) event. Message data sent from the watch does not reach JavaScript.
