---
id: messages
title: Messages
sidebar_label: Messages
---

TODO: Describe how messages work
- Messages are only sent when the **watch is reachable**
- Use user info/application context to queue

## sendMessage

```typescript
import { sendMessage } from "react-native-watch-connectivity";

sendMessage({ text: "hi!" })
```

### Handle replies

#### React Native App

```ts
import { 
  sendMessage, 
  ERROR_CODE_SESSION_UNREACHABLE 
} from "react-native-watch-connectivity";

const replyHandler = reply => console.log(reply.text);

const errorHandler = (err) => {
   if (err.code !== ERROR_CODE_SESSION_UNREACHABLE) {
     console.error(err);
   } 
}

const message = { text: "hello" };

sendMessage(message, replyHandler, errorHandler);
```

#### Watch Extension

```swift
func session(
    _ session: WCSession, 
    didReceiveMessage message: [String: Any], 
    replyHandler: @escaping ([String: Any]) -> Void
) {
    let text = message["text"] as? String
    if (text == "hello") {
        replyHandler(["text": "why, hello there"])
    }
}
```

### TypeScript Support

You can type the reply messages as follows:

```ts
import { sendMessage } from "react-native-watch-connectivity";

type WatchResponse = {text: string}

sendMessage<WatchResponse>({
  text: "Hi there watch!"
}, reply => {
  console.log(reply.aRandomProperty); // this will now show an error
})
```

## subscribeToMessages

```ts
import { subscribeToMessages } from "react-native-watch-connectivity";

subscribeToMessages((message, reply) => {
  console.log(message);
  reply({text: 'Thanks for the message'});
})
```

### TypeScript support

```ts
import { subscribeToMessages } from "react-native-watch-connectivity";

subscribeToMessages<{text: string}>((message) => {
  console.log(message.text);
})
```
