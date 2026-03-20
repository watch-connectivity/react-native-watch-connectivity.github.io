---
id: guides-events
title: Events
sidebar_label: Events
---

## Methods

### addListener

Listen to an event. Returns a function that when called, cancels the listener. Aliased to `watchEvents.on`

```ts
import {watchEvents} from "react-native-watch-connectivity";

const unsubscribe = watchEvents.addListener('message', (messageFromWatch, reply) => {
  console.log(messageFromWatch);
  reply({text: 'Thanks watch!'})
})

// ... later

unsubscribe();
```

### once

Same as `addListener` except will unsubscribe automatically after the first event.

```ts
import {watchEvents} from "react-native-watch-connectivity";

const cancel = watchEvents.once('message', (messageFromWatch, reply) => {
  console.log(messageFromWatch);
  reply({text: 'Thanks watch!'})
})

// ...

cancel(); // If needed. Will cancel automatically after first event.
```

Note: `once` can also be used with a `Promise`

```ts
import {watchEvents} from "react-native-watch-connectivity";

const [message, reply] = await watchEvents.once('message');
```

## Events

See the [Events API documentation](/docs/api-events) for information on each individual event.

- `application-context`
- `application-context-error`
- `application-context-received-error`
- `activation-error`
- `file`
- `file-received`
- `file-received-error`
- `installed`
- `message`
- `paired`
- `reachability`
- `session-became-inactive`
- `session-did-deactivate`
- `user-info`
- `user-info-error`
