---
title: Xamarin Studio 6 and iOS Certificate error
publishedAt: "2016-06-14"
tags: ["xamarin", "ios"]
---

Xamarin Studio 6 is here and it broke [some](https://forums.xamarin.com/discussion/comment/202744#Comment_202744) [people's](https://bugzilla.xamarin.com/show_bug.cgi?id=41207) [code](https://bugzilla.xamarin.com/show_bug.cgi?id=41653) including ours. The error happens when using `HttpClient` to connect to a web service using TLS. Here is a part of the exception:

> System.Net.WebException: Error: TrustFailure (CertificateUnknown) ---> Mono.Security.Interface.TlsException: CertificateUnknown
>   at Security.Tls.MobileAuthenticatedStream.ProcessAuthentication (System.Net.LazyAsyncResult lazyResult) [0x00077] in /Users/builder/data/lanes/3339/39ebb778/source/maccore/src/Security/Tls/MobileAuthenticatedStream.cs:206

![iOS Build settings](./2016-06-14_settings.png)

To fix this, go to iOS project settings and change the SSL/TLS implementation from Apple TLS (default) to Mono (TLS v1.0) as seen on the image below.

This should fix the issue and you can continue using Xamarin Studio 6 instead of downgrading to 5.2.0.

Happy coding!
