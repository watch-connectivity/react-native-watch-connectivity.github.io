---
id: guides-files
title: Files
sidebar_label: Files
---

## Starting a file transfer

### Using the file system

```ts
import {startFileTransfer} from 'react-native-watch-connectivity';

const uri = 'file:///path/to/image.jpg';

const id = await startFileTransfer(uri);

console.log(`Started file transfer with id ${id}`);
```

### With metadata

```ts
import {startFileTransfer} from 'react-native-watch-connectivity';

const id = await startFileTransfer('file:///path/to/file', {
    name: 'photo.jpg',
    type: 'image/jpeg',
});
```

`startFileTransfer` rejects with a [`WatchError`](./errors.md) if the transfer cannot start.

## Monitoring file transfers

### Get file transfers

This includes ongoing, finished, cancelled and failed file transfers.

```ts
import {getFileTransfers} from 'react-native-watch-connectivity';

const transfers = await getFileTransfers();

Object.values(transfers).forEach(transfer => {
    console.log(transfer.fractionCompleted); // 0 to 1
    console.log(transfer.error); // a WatchError, or null
    console.log(transfer.endTime); // a Date, or null
});
```

### File transfer events

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('file', event => {
    switch (event.type) {
        case 'started':
            console.log(`${event.uri}: started file transfer`);
            break;
        case 'progress':
            console.log(`${event.uri}: ${event.fractionCompleted * 100}%`);
            break;
        case 'finished':
            console.log(`${event.uri}: file transfer finished`);
            break;
        case 'error':
            console.error(`${event.uri}: transfer failed`, event.error?.code);
            break;
    }
});

// ...

unsubscribe();
```

## Receiving files from the watch

The library copies each received file into the app's `Documents/FilesReceived` folder. The `file-received` callback receives an array. Its first call includes files that arrived before you added the listener.

```ts
import {watchEvents} from 'react-native-watch-connectivity';

const unsubscribe = watchEvents.on('file-received', files => {
    files.forEach(file => {
        console.log(file.url, file.metadata);
    });
});

const unsubscribeErrors = watchEvents.on('file-received-error', ({fileInfo, error}) => {
    console.warn(`Could not save ${fileInfo.url}`, error.code);
});
```
