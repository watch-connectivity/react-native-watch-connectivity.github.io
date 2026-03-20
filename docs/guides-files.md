---
id: guides-files
title: Files
sidebar_label: Files
---

## Starting a file transfer

### Using the file system

```ts
import {startFileTransfer} from "react-native-watch-connectivity";

const uri = 'file:///path/to/image.jpg';

const id = await startFileTransfer(uri);

console.log(`Started file transfer with id ${id}`);
```

### With metadata

```ts
import {startFileTransfer} from "react-native-watch-connectivity";

const id = await startFileTransfer("file:///path/to/file", {
    name: "photo.jpg",
    type: "image/jpeg"
});
```

## Monitoring file transfers

### Get file transfers

This includes ongoing, finished, cancelled and errored file transfers.

```ts
import {getFileTransfers} from "react-native-watch-connectivity";

const transfers = await getFileTransfers();

Object.entries(transfers).map(([transferId, info]) => {
    console.log(info.fractionCompleted); // 0 - 1
    console.log(info.error); // Error || null
    console.log(info.endTime); // null || Date
});
```

### File transfer events

```ts
import {watchEvents} from "react-native-watch-connectivity";

const unsubscribe = watchEvents.addListener('file', event => {
    switch(event.type) {
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
            console.error(`${event.uri}: transfer failed`, event.error);
            break;
    }
});

// ...

unsubscribe();
```
