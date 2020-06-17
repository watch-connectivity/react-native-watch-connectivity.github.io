---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
---

Apple's iOS/iWatch simulator integration is really quite buggy. I strongly suggest using real devices instead.

## Messages are not being received on the simulator

Note that communication between the iOS simulator and Apple Watch simulator can be very slow - it's much faster when using actual devices. I've seen response times of up to 2 minutes when using the simulator.

## Watch remains unreachable on the simulator

Apple's dodgy watchos/ios simulator setup strikes again. If you keep reinstalling each app, it will eventually work. Better to use real devices.

## Watch app does not receive user info or application context in the simulator

There's a bug within Apple's simulator setup that can cause issues in iOS 13/watchOS6+ whereby the watch app's WCSessionDelegate does not fire `didReceiveUserInfo`. No solution for this as of yet until Apple fixes this problem. Either use real devices or else downgrade iOS/watchOS
