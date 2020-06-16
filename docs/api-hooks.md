---
id: api-hooks
title: Hooks
sidebar_label: Hooks
---

## useApplicationContext

```tsx
import {useApplicationContext} from 'react-native-watch-connectivity';

function MyComponent() {
    const context = useApplicationContext();
    // ...
}
```

### TypeScript Support

```tsx
import {useApplicationContext} from 'react-native-watch-connectivity';
import {Text} from 'react-native';

type MyApplicationContext = {
    key: string;
}

function MyComponent() {
    const context = useApplicationContext();
    
    return <Text>{context.key}</Text>
}
```

## useFileTransfers

Returns an array of all file transfers (in progress, errored, completed)

```tsx
import {useFileTransfers} from 'react-native-watch-connectivity';
import {Text, View} from 'react-native';

type MyApplicationContext = {
    key: string;
}

function MyComponent() {
    const transfers = useFileTransfers();
    
    return (
        <View>
            {transfers.map(transfer => {
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
                    
                return (
                    <View>
                         <Text>{url}</Text>
                         <ProgressBar fractionCompleted={fractionCompleted}/>
                    </View>
                )
            })}
        </View>
    )
}
```

## useMessageListener

```tsx
import {useMessageListener} from 'react-native-watch-connectivity';

function MyComponent() {
    useMessageListener((message, reply) => {
        console.log('Received message from watch', message);
        reply({text: "Thanks for the message!"})
    });
    
    // ...
}
```

### TypeScript Support

```tsx
import {useMessageListener} from 'react-native-watch-connectivity';

type MessageFromWatch = {
    x: string
}

function MyComponent() {
    useMessageListener<MessageFromWatch>((message, reply) => {
        console.log('Received message from watch', message.x);
        reply({text: "Thanks for the message!"})
    });
    
    // ...
}
```

## useWatchState

```tsx
import {useWatchState} from 'react-native-watch-connectivity';


function MyComponent() {
    const state = useWatchState(); // Activated | NotActivated | Inactive
    
    // ...
}
```

## useReachability

```tsx
import {useReachability} from 'react-native-watch-connectivity';
import {Text} from 'react-native';


function MyComponent() {
    const reachable = useReachability(); // true | false
    
    return <Text>{reachable ? 'Watch is reachable' : 'Watch is unreachable'}</Text>
}
```