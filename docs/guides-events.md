---
id: guides-events
title: Events
sidebar_label: Events
---

## Methods

### addListener

Listens to an event. It returns a function that removes the listener. `watchEvents.on` is an alias.

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.addListener('message', (messageFromWatch, reply) => {
    console.log(messageFromWatch);
    if (reply) {
        reply({text: 'Thanks watch!'});
    }
});

// ... later

unsubscribe();
```

### once

The same as `addListener`, except that it removes the listener after the first event.

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const cancel = watchEvents.once('message', (messageFromWatch, reply) => {
    console.log(messageFromWatch);
    if (reply) {
        reply({text: 'Thanks watch!'});
    }
});

// ...

cancel(); // Only if you no longer want the first event.
```

Without a callback, `once` returns a promise. For `message`, it resolves with `[message, reply]`. For every other event, it resolves with the event's payload.

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const [message, reply] = await watchEvents.once('message');

const reachable = await watchEvents.once('reachability');
```

Where WatchConnectivity is unavailable, events never fire, so this promise never settles.

## Events that arrive before you listen

The native module keeps each event until JavaScript listens to that event, then delivers it. So a message that arrives while React Native starts is not lost. An event waits for a listener of its own name: adding a `reachability` listener does not deliver a buffered `message`.

## Events

See the [Events API documentation](./api-events.md) for each event's payload.

- `activation-error`
- `application-context`
- `application-context-error`
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
