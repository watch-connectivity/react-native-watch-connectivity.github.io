---
id: installation
title: Installation
sidebar_label: Installation
---

## Install

```shell script
npm install react-native-watch-connectivity --save
# or
yarn add react-native-watch-connectivity
```

## Link

Autolinking is the preferred installation method

### Autolink

```bash
cd ios
pod install
```

### CLI

Use for React Native <0.60

```bash
react-native link
```

### Manual link

Add the following to your `ios/Podfile`

```ruby
pod 'RNWatch', :path => '../node_modules/react-native-watch-connectivity'
```

And then run:

```bash
pod install
``` 


