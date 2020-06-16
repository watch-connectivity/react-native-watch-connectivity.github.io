---
id: files
title: Files
sidebar_label: Files
---


## startFileTransfer

```ts
import {startFileTransfer} from 'react-native-watch-connectivity';

const metadata = {};

const {id} = await startFileTransfer("file:///path/to/file", metadata);

console.log(`Started a new file transfer with id ${id}`);
```

## getFileTransfers

```ts
import {getFileTransfers} from 'react-native-watch-connectivity';

const fileTransfers = await getFileTransfers();

Object.entries(fileTransfers).map(([transferId, transferInfo]) => {
    const {
        completedUnitCount, // num bytes completed
        estimatedTimeRemaining, 
        fractionCompleted,
        throughput, // Bit rate
        totalUnitCount, // total num. bytes 
        url, // url of file being transferred
        metadata, // file metadata
        id, // id === transferId
        startTime, // time that the file transfer started
        endTime, // time that the file transfer ended
        error // null or [Error] if the file transfer failed
    } = transferInfo;
})
```


## monitorFileTransfers

```ts
import {monitorFileTransfers} from 'react-native-watch-connectivity';

const cancel = monitorFileTransfers(event => {
    const {
        type, // started | progress | finished | error
        completedUnitCount, // num bytes completed
        estimatedTimeRemaining, 
        fractionCompleted,
        throughput, // Bit rate
        totalUnitCount, // total num. bytes 
        url, // url of file being transferred
        metadata, // file metadata
        id, // id === transferId
        startTime, // time that the file transfer started
        endTime, // time that the file transfer ended
        error // null or [Error] if the file transfer failed
    } = transferInfo;
});

// ...

cancel();
```