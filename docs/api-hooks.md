---
id: api-hooks
title: Hooks
sidebar_label: Hooks
---

Where WatchConnectivity is unavailable, `usePaired`, `useInstalled` and `useReachability` return `false`, and `useApplicationContext` returns `null`.

## useApplicationContext

Returns the context **the watch** last sent, or `null` until one has arrived. It reads the stored context when the component mounts, including one that arrived while the app was not running, and updates on each `application-context` event.

It does not return the context this phone sent. To read that, call [`getApplicationContext()`](./application-context.md#getapplicationcontext).

```tsx
import {useApplicationContext} from 'react-native-watch-connectivity';

function MyComponent() {
    const contextFromWatch = useApplicationContext();
    // ...
    return null;
}
```

### TypeScript support

Use a `type` alias, not an interface: the type must be assignable to `Record<string, unknown>`. The hook returns `null` until a context has arrived.

```tsx
import {useApplicationContext} from 'react-native-watch-connectivity';
import {Text} from 'react-native';

type WatchSettings = {
    units: 'metric' | 'imperial';
};

function MyComponent() {
    const settings = useApplicationContext<WatchSettings>();

    if (!settings) {
        return null;
    }

    return <Text>{settings.units}</Text>;
}
```

## usePaired

Is the phone paired with an Apple Watch?

```tsx
import {usePaired} from 'react-native-watch-connectivity';

function MyComponent() {
    const paired = usePaired(); // true | false
    // ...
    return null;
}
```

## useInstalled

Is the watch app installed?

```tsx
import {useInstalled} from 'react-native-watch-connectivity';

function MyComponent() {
    const installed = useInstalled(); // true | false
    // ...
    return null;
}
```

## useReachability

Is the watch app reachable, so that you can use interactive messaging such as `sendMessage`?

```tsx
import {useReachability} from 'react-native-watch-connectivity';
import {Text} from 'react-native';

function MyComponent() {
    const reachable = useReachability(); // true | false

    return <Text>{reachable ? 'Watch is reachable' : 'Watch is unreachable'}</Text>;
}
```

`usePaired`, `useInstalled` and `useReachability` start at `false` and update when the session activates, shortly after launch.
