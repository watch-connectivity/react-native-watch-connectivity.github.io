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
    // Total number of bytes that will be transferred.
    bytesTotal: number;

    // Number of bytes transferred.
    bytesTransferred: number;
    
    // When did the file finish transferring?
    endTime: Date | null;
    
    // Possible file transfer error.
    error: Error | null;
    
    // Estimated num. seconds remaining for file to transfer.
    estimatedTimeRemaining: number | null;
    
    // bytesTransferred / bytesTotal e.g. 0.5
    fractionCompleted: number;
    
    // Every file transfer is assigned a unique identifier
    id: string;
    
    // User assigned metadata when transferring the file.
    metadata: Record<string, unknown>;
    
    // When did the transfer begin?
    startTime: Date;
    
    // The rate at which the file is transferring.
    throughput: number | null;
    
    // Indicates why this event was sent.
    type: 'error' | 'finished' | 'progress' | 'started';
    
    // The URI of the file being transferred from the React Native app. 
    uri: string;
}
```

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

watchEvents.addListener('file', event => {
    // ...
    console.log(event.type);
    // ...
})
```

## `application-context`

Application context events are emitted when the watch updates the application context. If using TypesScript you can define your own Application Context type for intellisense support.

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

User info events are emitted when the watch sends a user info message. If using TypesScript you can define your own User Info type for intellisense support.

### Usage

```typescript
import {watchEvents} from 'react-native-watch-connectivity'

interface CustomUserInfo {
  x: number;
  y: number;
}

const unsubscribe = watchEvents.addListener<CustomUserInfo>(
  "user-info", 
  event => {
    console.log(event.x, event.y);
  }
)

// ...

unsubscribe();
```

## `reachability`

Updates when reachability changes. If reachable, then you can use [interactive messaging](/react-native-watch-connectivity/docs/communication#interactive-messaging) to communicate with the watch.

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

Message events are received when the watch sends an interactive message. The callback includes a function that can be used to reply to the message

### Usage

```ts
import {watchEvents} from 'react-native-watch-connectivity'

interface MessageFromWatch {
    text: string;
}

const unsubscribe = watchEvents.addListener<MessageFromWatch>(
    "message", 
    (message: MessageFromWatch, reply) => {
        console.log(message.text);
        reply({text: 'thanks watch!'})
    }
)

unsubscribe();
```

## `installed`

Fires when the companion Apple Watch is installed/uninstalled.

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

Fires when pairing status changes. E.g. if watch is unpaired from the phone.

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
