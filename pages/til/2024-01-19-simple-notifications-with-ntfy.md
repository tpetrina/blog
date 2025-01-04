---
title: "Simple notifications with ntfy"
publishedAt: "2024-01-19"
summary: "Getting notifications when stuff is done is quite easy with ntfy. It is simple and nifty!"
tags: ["events", "notifications"]
---

In day to day operations, various systems will process things asynchronously.
The most common thing notification is "build complete" (or "build failed"). To
get all the notifications from these systems into one, central location, I used
[ntfy](https://ntfy.sh/) - it's simple and convenient.

First, a topic is needed. Best naming scheme is "mycooltopic_ID" e.g. "project_5d6gd".

Then, `curl -d "Thing happened" ntfy.sh/mycooltopic_ID` will send the notification into that topic.

I get notifications on both my phone and desktop - which is convenient for both
build notifications as well as rare events notifications.

## GHA integration

A handful snippet to paste into any GHA workflow:

```yaml
notify-success:
  runs-on: ubuntu-latest
  needs: [build]
  if: success()

  steps:
    - name: Notify on success
      run: curl -d "App deployed 🥳" ntfy.sh/mycooltopic_ID

notify-failure:
  runs-on: ubuntu-latest
  needs: [build]
  if: failure()

  steps:
    - name: Notify on failure
      run: curl -d "App failed to deploy 😭" ntfy.sh/mycooltopic_ID
```
