---
title: "Use tee in GitHub Actions to save logs from a process"
publishedAt: "2024-02-03"
summary: "I needed to save logs from a process, but ensure GitHub Actions wait for the process to complete. Bonus point - restore exit code"
tags: ["shell", "github actions"]
---

Here is the situation: a step in GitHub actions runs a process, in this case a Helm command, and I need to redirect the output.

The obvious way to do it is to redirect into a file

```shell
helm ... > helm.log
# show logs after done
cat helm.log
```

However, what happens is that GitHub Actions immediately skips this step. It doesn't wait for the redirected command to end!
I also lose the ability to watch logs, especially if `--wait` is passed to Helm.

## Introducing `tee`

[`tee`](<https://en.wikipedia.org/wiki/Tee_(command)>) is a command that redirects
output and duplicates it. This way the output is _both_ standard output and, in
this case, a file.

Here is the new command:

```shell
helm ... 2>&1 | tee helm.log
```

Sweet, now GitHub Actions will wait for the process as we expected. We also get
live logs.

However, if `helm` returns with a nonzero value, the step is a success. Which we
clearly don't want.

## Use `pipefail` to catch pipeline errors

Since `|` is a pipe, it kinda swallows errors. We need to propagate them "out".

```shell
# ensure that a step failing will make the pipeline appear to fail
set -o pipefail

# tee to split into file
helm ... 2>&1 | tee helm.log

# do something with helm.log

# restore the previous state
set +o pipefail

# Now fail if helm command returned a nonzero exit code
if [ $? -ne 0 ]; then
echo "Helm deployment failed"
exit 1
fi
```

Voilà! We have a functional step that will properly redirect output and fail.
