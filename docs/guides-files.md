---
id: guides-files
title: Files
sidebar_label: Files
---

## Starting a file transfer

### Using the camera

```ts
import ImagePicker from 'react-native-image-picker';
import {startFileTransfer} from "react-native-watch-connectivity";

ImagePicker.showImagePicker(
  { /* options */ },
  ({uri}) => {
     if (uri) {
        startFileTransfer(uri).then(({id}) => {
          console.log(`Started file transfer with id ${id}`)
        })
     }
  }
)
```

### Using the file system

```ts
import fs from 'react-native-fs';
import {startFileTransfer} from "react-native-watch-connectivity";

let uri = 'file://' + fs.MainBundlePath + '/MyImage.jpg';

const {id} = await startFileTransfer(uri);

console.log(`Started file transfer with id ${id}`);
```

## Monitoring file transfers

### Get file transfers

This includes ongoing, finished, cancelled & errored file transfers.

```ts
import {getFileTransfers, FileTransferEvent} from "react-native-watch-connectivity";

const transfers = await getFileTransfers();

Object.entries(transfers).map(([transferId, info]) => {
    console.log(info.fractionCompleted); // 0 - 1
    console.log(info.error); // Error || null
    console.log(info.endTime); // null || number
});
```

### File transfer events

```ts
import {monitorFileTransfers, FileTransferEvent} from "react-native-watch-connectivity";

const unsubscribe = monitorFileTransfers(event => {
    switch(event.type) {
        case FileTransferEvent.STARTED:
            console.log(`${event.uri}: started file transfer`);
            break;
        case FileTransferEvent.PROGRESS:
            console.log(`${event.uri}: file transfer progress: ${event.fractionCompleted * 100}%`);
            break;
        case FileTransferEvent.FINISHED:
            const timeTakenInSeconds = (event.endTime - event.startTime) / 1000;
            console.log(`${event.uri}: file transfer finished in ${timeTakenInSeconds}s`);
            break;
        case FileTransferEvent.ERROR:
            console.error(`${event.uri}: transfer failed`, event.error);
            break;
    }
})
```
