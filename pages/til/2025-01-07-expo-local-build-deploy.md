---
title: Build expo app locally and deploy to iPhone
summary: 
tags:
  - expo
  - react-native
publishedAt: 2025-01-07
---
Local build:

```
eas build --profile development --platform ios --local
```

Connect iPhone via USB cable, drag and drop `.ipa` file on the `General tab`.