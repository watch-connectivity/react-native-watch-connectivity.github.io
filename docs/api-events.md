---
id: api-events
title: Events
sidebar_label: Events
---

Subscribe with `watchEvents.on(event, callback)`, or its alias `watchEvents.addListener`. Both return an unsubscribe function. See the [Events guide](./guides-events.md) for `once`.

| Event | Callback receives |
| --- | --- |
| [`message`](#message) | `(message, reply)`. `reply` is `null` when the watch expects no reply. |
| [`application-context`](#application-context) | The context the watch sent |
| [`user-info`](#user-info) | An array of user info dictionaries |
| [`file`](#file) | A `FileTransferEvent` |
| [`file-received`](#file-received) | An array of received files |
| [`reachability`](#reachability), [`paired`](#paired), [`installed`](#installed) | A `boolean` |
| [`session-became-inactive`](#session-became-inactive), [`session-did-deactivate`](#session-did-deactivate) | Nothing |
| [`activation-error`](#activation-error) | `{ error }` |
| [`application-context-error`](#application-context-error) | `{ context, error }` |
| [`user-info-error`](#user-info-error) | `{ userInfo, error }` |
| [`file-received-error`](#file-received-error) | `{ fileInfo, error }` |

Every `error` is a [`WatchError`](./errors.md).

## Events that arrive before you listen

The native module keeps each event until JavaScript listens to that event, then delivers it. An event waits for a listener of its own name: a `reachability` listener does not receive a buffered `message`. The module keeps up to 1,000 waiting events and drops the oldest after that.

## `file`

Fires when a transfer you started is `started`, makes `progress`, is `finished` or fails with an `error`.

### Event definition

```ts no-check
interface FileTransferEvent {
    bytesTotal: number;
    bytesTransferred: number;
    endTime: Date | null;
    error: WatchError | null;
    estimatedTimeRemaining: number | null;
    fractionCompleted: number;
    id: string;
    metadata: Record<string, unknown>;
    startTime: Date;
    throughput: number | null;
    type: 'error' | 'finished' | 'progress' | 'started';
    uri: string;
}
```

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('file', event => {
    console.log(event.type, event.fractionCompleted);
    if (event.error) {
        console.warn(event.error.code);
    }
});
```

## `application-context`

Fires when the watch sends a new application context. The callback receives that context. The library does not send it back to the watch.

To read the latest context the watch sent, including one that arrived before you listened, call [`getReceivedApplicationContext()`](./application-context.md#getreceivedapplicationcontext) or use [`useApplicationContext`](./api-hooks.md#useapplicationcontext).

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

type CustomApplicationContext = {
    x: number;
    y: number;
};

const unsubscribe = watchEvents.on<CustomApplicationContext>(
    'application-context',
    context => {
        console.log(context.x, context.y);
    }
);

// ...

unsubscribe();
```

Use a `type` alias, not an interface, for the type argument: it must be assignable to `Record<string, unknown>`.

## `user-info`

Fires when the watch sends user info. The callback receives an array. The first call includes user info that arrived before you added the listener.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

type CustomUserInfo = {
    x: number;
    y: number;
};

const unsubscribe = watchEvents.on<CustomUserInfo>('user-info', items => {
    items.forEach(item => {
        console.log(item.x, item.y);
    });
});

// ...

unsubscribe();
```

## `reachability`

Fires when reachability changes, and each time the session activates. If the watch is reachable, you can use [interactive messaging](./communication.md#interactive-messaging).

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('reachability', reachable => {
    console.log(reachable ? 'is reachable' : 'not reachable');
});

unsubscribe();
```

## `message`

Fires when the watch sends an interactive message. The second argument replies to it. It is `null` when the watch did not ask for a reply.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

type MessageFromWatch = {
    text: string;
};

const unsubscribe = watchEvents.on<MessageFromWatch>('message', (message, reply) => {
    console.log(message.text);
    if (reply) {
        reply({text: 'thanks watch!'});
    }
});

unsubscribe();
```

## `installed`

Fires when the companion watch app is installed or removed, and each time the session activates.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('installed', installed => {
    console.log(installed ? 'watch app is installed' : 'watch app not installed');
});

unsubscribe();
```

## `paired`

Fires when the pairing status changes, for example when the watch is unpaired, and each time the session activates.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('paired', paired => {
    console.log(paired ? 'phone is paired with a watch' : 'phone is not paired with a watch');
});

unsubscribe();
```

## `file-received`

Fires when files arrive from the watch. The callback receives an array. The first call includes files that arrived before you added the listener.

The library copies each file into the app's `Documents/FilesReceived` folder. Each item has:

| Field | Type | |
| --- | --- | --- |
| `id` | `string` | |
| `url` | `string` | The `file://` URL of the copy |
| `metadata` | `unknown` | The metadata the watch sent, or `null` |
| `timestamp` | `number` | When it arrived, in milliseconds |

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('file-received', files => {
    files.forEach(file => {
        console.log('Received file:', file.url);
    });
});

unsubscribe();
```

## `activation-error`

Fires when the WatchConnectivity session fails to activate. The payload is `{ error }`.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('activation-error', ({error}) => {
    console.error('Session activation failed:', error.code);
});

unsubscribe();
```

## `application-context-error`

Fires when the system refuses a context passed to `updateApplicationContext`. The payload is `{ context, error }`. The promise from `updateApplicationContext` rejects with the same error.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('application-context-error', ({context, error}) => {
    console.error('Failed to send application context:', context, error.code);
});

unsubscribe();
```

## `user-info-error`

Fires when a user info transfer fails. The payload is `{ userInfo, error }`.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('user-info-error', ({userInfo, error}) => {
    console.error('Failed to send user info:', userInfo, error.code);
});

unsubscribe();
```

## `file-received-error`

Fires when the library cannot save a file received from the watch. The payload is `{ fileInfo, error }`. `fileInfo` has the same fields as a `file-received` item.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('file-received-error', ({fileInfo, error}) => {
    console.error('Failed to save file:', fileInfo.url, error.code);
});

unsubscribe();
```

## `session-became-inactive`

Fires when the session becomes inactive, for example when the user starts switching to another Apple Watch. The listener takes no arguments.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('session-became-inactive', () => {
    console.log('Session became inactive');
});

unsubscribe();
```

## `session-did-deactivate`

Fires when the session deactivates after a watch switch. The listener takes no arguments. The library then reactivates the session for the newly selected watch, and `paired`, `installed` and `reachability` fire with its state. You do not need to do anything.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('session-did-deactivate', () => {
    console.log('Session deactivated');
});

unsubscribe();
```
