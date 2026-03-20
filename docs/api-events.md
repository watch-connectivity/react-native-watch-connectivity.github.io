---
id: api-events
title: Events
sidebar_label: Events
---

## `file`

File events are emitted when a transfer is `started`, `finished`, makes `progress` or else encounters an `error`.

### Event Definition

```ts
interface FileTransferEvent {
    bytesTotal: number;
    bytesTransferred: number;
    endTime: Date | null;
    error: Error | null;
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
import {watchEvents} from 'react-native-watch-connectivity'

watchEvents.addListener('file', event => {
    console.log(event.type);
})
```

## `application-context`

Emitted when the watch updates the application context.

### Usage

```typescript
import {watchEvents} from 'react-native-watch-connectivity'

interface CustomApplicationContext {
  x: number;
  y: number;
}

const unsubscribe = watchEvents.addListener<CustomApplicationContext>(
  "application-context",
  event => {
    console.log(event.x, event.y);
  }
)

// ...

unsubscribe();
```

## `user-info`

Emitted when the watch sends user info. The callback receives an array of user info items, including any received before the React Native app initialised.

### Usage

```typescript
import {watchEvents} from 'react-native-watch-connectivity'

interface CustomUserInfo {
  x: number;
  y: number;
}

const unsubscribe = watchEvents.addListener<CustomUserInfo>(
  "user-info",
  items => {
    items.forEach(item => {
      console.log(item.x, item.y);
    });
  }
)

// ...

unsubscribe();
```

## `reachability`

Updates when reachability changes. If reachable, you can use [interactive messaging](/docs/communication#interactive-messaging) to communicate with the watch.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "reachability",
  (reachable: boolean) => {
    console.log(reachable ? 'is reachable' : 'not reachable')
  }
)

unsubscribe();
```

## `message`

Received when the watch sends an interactive message. The callback includes a function that can be used to reply to the message.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

interface MessageFromWatch {
    text: string;
}

const unsubscribe = watchEvents.addListener<MessageFromWatch>(
    "message",
    (message, reply) => {
        console.log(message.text);
        if (reply) {
            reply({text: 'thanks watch!'});
        }
    }
)

unsubscribe();
```

## `installed`

Fires when the companion Apple Watch app is installed or uninstalled.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "installed",
  (installed: boolean) => {
    console.log(installed ? 'watch app is installed' : 'watch app not installed')
  }
)

unsubscribe();
```

## `paired`

Fires when pairing status changes, e.g. if the watch is unpaired from the phone.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "paired",
  (paired: boolean) => {
    console.log(paired ? 'phone is paired with a watch' : 'phone is NOT paired with a watch')
  }
)

unsubscribe();
```

## `file-received`

Emitted when file(s) are received from the watch. The callback receives an array of received file payloads.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "file-received",
  files => {
    files.forEach(file => {
      console.log('Received file:', file);
    });
  }
)

unsubscribe();
```

## `activation-error`

Emitted when the WCSession fails to activate.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "activation-error",
  error => {
    console.error('Session activation failed:', error);
  }
)

unsubscribe();
```

## `application-context-error`

Emitted when sending application context fails.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "application-context-error",
  error => {
    console.error('Failed to send application context:', error);
  }
)

unsubscribe();
```

## `application-context-received-error`

Emitted when receiving application context fails.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "application-context-received-error",
  error => {
    console.error('Failed to receive application context:', error);
  }
)

unsubscribe();
```

## `user-info-error`

Emitted when sending user info fails.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "user-info-error",
  error => {
    console.error('Failed to send user info:', error);
  }
)

unsubscribe();
```

## `file-received-error`

Emitted when receiving file(s) from the watch fails.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "file-received-error",
  error => {
    console.error('Failed to receive file:', error);
  }
)

unsubscribe();
```

## `session-became-inactive`

Emitted when the WCSession becomes inactive. This can happen when the user switches to a different Apple Watch.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "session-became-inactive",
  payload => {
    console.log('Session became inactive');
  }
)

unsubscribe();
```

## `session-did-deactivate`

Emitted when the WCSession is deactivated. You should reactivate the session after handling this event.

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

const unsubscribe = watchEvents.addListener(
  "session-did-deactivate",
  payload => {
    console.log('Session deactivated');
  }
)

unsubscribe();
```
