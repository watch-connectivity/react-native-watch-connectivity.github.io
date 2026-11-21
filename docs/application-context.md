---
id: application-context
title: Application Context
sidebar_label: Application Context
---

The phone and the watch each keep two application contexts:

- The **sent** context: the latest context this device sent. Each new one replaces the last.
- The **received** context: the latest context the other device sent.

The library never sends a received context back. Sending your own context does not change the context you received, and receiving one does not change the context you send.

| Function | Reads or writes |
| --- | --- |
| `updateApplicationContext(context)` | Writes the sent context |
| `getApplicationContext()` | Reads the sent context |
| `getReceivedApplicationContext()` | Reads the received context |
| [`useApplicationContext()`](./api-hooks.md#useapplicationcontext) | Reads the received context and keeps it up to date |
| [`application-context` event](./api-events.md#application-context) | Fires with each received context |

## updateApplicationContext

Sends `context` to the watch and replaces the last context this phone sent. It returns a `Promise<void>`.

The promise rejects with a [`WatchError`](./errors.md) when the system refuses the context. For example, a `null` value gives `payload-unsupported-types`. The [`application-context-error`](./api-events.md#application-context-error) event also fires.

```ts
import {isWatchError, updateApplicationContext} from 'react-native-watch-connectivity';

try {
    await updateApplicationContext({theme: 'dark'});
} catch (error) {
    if (isWatchError(error, 'payload-unsupported-types')) {
        console.warn('The context holds a value WatchConnectivity cannot send');
    }
}
```

Always await the promise or attach a `catch`. If you do neither, a failure becomes an unhandled promise rejection.

```ts
import {updateApplicationContext} from 'react-native-watch-connectivity';

updateApplicationContext({theme: 'dark'}).catch(error => {
    console.warn(error.code);
});
```

## getApplicationContext

Resolves the context this phone last sent, or `null` if it has not sent one.

```ts
import {getApplicationContext} from 'react-native-watch-connectivity';

const sent = await getApplicationContext();

if (sent) {
    console.log(sent);
}
```

## getReceivedApplicationContext

Resolves the context the watch last sent, or `null` if it has not sent one. This includes a context that arrived while the app was not running.

```ts
import {getReceivedApplicationContext} from 'react-native-watch-connectivity';

const received = await getReceivedApplicationContext();

if (received) {
    console.log(received);
}
```

## TypeScript support

Both getters and the hook take the context type as a type argument. Use a `type` alias, not an `interface`: the type must be assignable to `Record<string, unknown>`.

```ts
import {getReceivedApplicationContext} from 'react-native-watch-connectivity';

type WatchSettings = {
    units: 'metric' | 'imperial';
};

const settings = await getReceivedApplicationContext<WatchSettings>();

if (settings) {
    console.log(settings.units);
}
```

## Receiving context updates

Use the [`useApplicationContext`](./api-hooks.md#useapplicationcontext) hook in a component. Outside React, combine the getter with the event:

```ts
import {getReceivedApplicationContext, watchEvents} from 'react-native-watch-connectivity';

const initial = await getReceivedApplicationContext();
console.log('current context from the watch', initial);

const unsubscribe = watchEvents.on('application-context', context => {
    console.log('new context from the watch', context);
});
```
