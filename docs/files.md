---
id: files
title: Files
sidebar_label: Files
---

## startFileTransfer

Starts a file transfer to the watch. Returns a promise that resolves with the transfer ID.

```ts
import {startFileTransfer} from 'react-native-watch-connectivity';

const metadata = {};

const id = await startFileTransfer("file:///path/to/file", metadata);

console.log(`Started a new file transfer with id ${id}`);
```

## getFileTransfers

```ts
import {getFileTransfers} from 'react-native-watch-connectivity';

const fileTransfers = await getFileTransfers();

Object.entries(fileTransfers).map(([transferId, transferInfo]) => {
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
        error
    } = transferInfo;
})
```

## Monitoring File Transfers

Use the `file` event to monitor transfer progress:

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.addListener('file', event => {
    console.log(event.type); // 'started' | 'progress' | 'finished' | 'error'
    console.log(event.fractionCompleted);
});

// ...

unsubscribe();
```
