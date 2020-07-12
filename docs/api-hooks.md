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


## usePaired

Is the phone paired with an iWatch?

```tsx
import {usePaired} from 'react-native-watch-connectivity';

function MyComponent() {
    const state = usePaired(); // true | false
    
    // ...
}
```

## useInstalled

Is the watch app installed?

```tsx
import {useInstalled} from 'react-native-watch-connectivity';

function MyComponent() {
    const state = useInstalled(); // true | false
    
    // ...
}
```

## useReachability

Is the watch app reachable? Can we use interactive messaging? (`sendMessage` etc)

```tsx
import {useReachability} from 'react-native-watch-connectivity';
import {Text} from 'react-native';

function MyComponent() {
    const reachable = useReachability(); // true | false
    
    return <Text>{reachable ? 'Watch is reachable' : 'Watch is unreachable'}</Text>
}
```
