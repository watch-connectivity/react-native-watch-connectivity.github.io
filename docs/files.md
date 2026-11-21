---
id: files
title: Files
sidebar_label: Files
---

## startFileTransfer

```ts no-check
startFileTransfer(uri: string, metadata?: Record<string, unknown>): Promise<string>
```

Starts a file transfer to the watch. The promise resolves with the transfer id. It rejects with a [`WatchError`](./errors.md), for example `session-not-supported` where WatchConnectivity is unavailable.

```ts
import {startFileTransfer} from 'react-native-watch-connectivity';

const metadata = {kind: 'photo'};

const id = await startFileTransfer('file:///path/to/file', metadata);

console.log(`Started a new file transfer with id ${id}`);
```

## getFileTransfers

Resolves the transfers this session started, keyed by transfer id.

```ts
import {getFileTransfers} from 'react-native-watch-connectivity';

const fileTransfers = await getFileTransfers();

Object.values(fileTransfers).forEach(transfer => {
    const {
        bytesTotal,
        bytesTransferred,
        estimatedTimeRemaining,
        fractionCompleted,
        throughput,
        uri,
        metadata,
        id,
        startTime,
        endTime,
        error, // a WatchError, or null
    } = transfer;
});
```

### The FileTransfer type

```ts no-check
interface FileTransfer {
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
    uri: string;
}
```

`FileTransfer` is exported as a type.

## Monitoring file transfers

Use the [`file`](./api-events.md#file) event to follow a transfer's progress:

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('file', event => {
    console.log(event.type); // 'started' | 'progress' | 'finished' | 'error'
    console.log(event.fractionCompleted);
});

// ...

unsubscribe();
```

## Receiving files

Listen to the [`file-received`](./api-events.md#file-received) event. The library copies each file into the app's `Documents/FilesReceived` folder and gives you its `file://` URL. If the copy fails, [`file-received-error`](./api-events.md#file-received-error) fires.
