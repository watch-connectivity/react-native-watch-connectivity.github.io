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

## subscribeToMessages

```typescript
const unsubscribe = subscribeToMessages((message, reply) => {
    console.log("Received message from watch", message);
    reply({text: "Got your message, thanks!"})
});

unsubscribe(); // Terminate subscription
```

### TypeScript Support

```typescript
type MessageFromWatch = {
    "text": string
}

const unsubscribe = subscribeToMessages<MessageFromWatch>((message, reply) => {
    console.log("Received message from watch", message.text); 
    reply({text: "Got your message, thanks!"});
});

unsubscribe(); // Terminate subscription
```
