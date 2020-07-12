---
id: user-info
title: User Info
sidebar_label: User Info
---

## transferUserInfo

```ts
import { transferUserInfo } from "react-native-watch-connectivity"

const userInfo = {key: "value"}; // Any number of key/value pairs

transferUserInfo(userInfo); 
```

## transferCurrentComplicationUserInfo

Same as transferUserInfo but receives priority. Generally used to update information with complications presented on the watch face.

```ts
import { transferCurrentComplicationUserInfo } from "react-native-watch-connectivity"

const userInfo = {key: "value"}; // Any number of key/value pairs

transferCurrentComplicationUserInfo(userInfo);
```
