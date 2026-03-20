---
id: messages
title: Messages
sidebar_label: Messages
---

## sendMessage

```typescript
import {sendMessage} from 'react-native-watch-connectivity';

const message = {
    "key": "value"
}

// Optional reply handler
const replyHandler = response => {
    console.log("Response from watch received", response);
}

// Optional error handler
const errorHandler = error => {
    console.error(error)
}

sendMessage(message, replyHandler, errorHandler);
```

### TypeScript Support

```typescript
import {sendMessage} from 'react-native-watch-connectivity';

type MessageToWatch = {
    text: string
}

type MessageFromWatch = {
    reply: string
}

sendMessage<MessageFromWatch, MessageToWatch>(
    {text: "Hello watch!"},
    response => {
        console.log(response.reply);
    }
)
```

## sendMessageData

Send raw data to the watch. Returns a promise that resolves with the base64-decoded response.

```typescript
import {sendMessageData} from 'react-native-watch-connectivity';

const response = await sendMessageData("SGVsbG8gd2F0Y2g=");
console.log('Received response', response);
```
