I got a permission error while running `brew` commands on macOS Sequoia.

```
Permission denied @ apply2files
```

To fix it, I used this StackOverflow post: https://stackoverflow.com/questions/61899041/macos-permission-denied-apply2files-usr-local-lib-node-modules-expo-cli-n/63241724#63241724

```bash
sudo chown -R $(whoami):admin /Users/myname/path/to/folder/* \
&& sudo chmod -R g+rwx /Users/myname/path/to/folder/*
```