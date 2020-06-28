---
id: messages
title: Messages
sidebar_label: Messages
---

## sendMessage

```typescript
import {sendMessage} from 'react-native-watch-connectivity';

// Message can have any number of key-value pairs 
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

type Response = {
    "text": string
}

const message = {"text": "Hello watch!"}

sendMessage<Response>(
    message, 
    response => {
        console.log(response.text); // Intellisense available
    }
)
```

## sendMessageData

```typescript
import {sendMessageData} from 'react-native-watch-connectivity';
import { Buffer } from 'buffer';

sendMessageData(
    Buffer.from('abc', 'utf-8').toString('base64'),
    encodedResponse => {
        let response = Buffer.from(encodedResponse, 'base64').toString('utf8');
        console.log('Received response', response)
    }
);
```
