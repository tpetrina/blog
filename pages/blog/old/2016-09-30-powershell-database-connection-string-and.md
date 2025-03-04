---
title: Powershell, database connection string and $
publishedAt: "2016-09-30"
---

Using connection strings in Powershell can yield some strange errors if the connection string contains the very special sign `$`.

Why? Because the dollar sign is a special character and it needs to be escaped. To escape it, just add grave accent before and after. So your connection string becomes

```
Server=tcp:mycooldb.database.windows.net,1433;Database=mycooldb;User ID=admin@mycooldb;Password=Pa`$$`w0rd;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;
```

Why would one have the dollar sign in their password is another topic...
