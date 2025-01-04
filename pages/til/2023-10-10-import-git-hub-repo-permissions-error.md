---
title: "Import GitHub repo permissions error"
publishedAt: "2023-10-10"
tags: ["terraform"]
summary: "In which I turn on permissions until things work"
---

While importing GitHub repository into Terraform, the following error ocurred:

```
╷
│ Error: error reading repository vulnerability alerts: GET https://api.github.com/repos/OWNER/REPO/vulnerability-alerts: 403 Resource not accessible by personal access token []
│
│
```

Since I've been using PAT for authentication, I figured there was a setting missing.
The error wouldn't go away even if I set:

```toml
resource "github_repository" "REPO" {
    vulnerability_alerts                    = false
    ignore_vulnerability_alerts_during_read = true
}
```

So, after lots of trial and error, turns out that the following repository
permission needs to be added: **Administration: Read-only**.

Unfortunately, knowing what permissions to add to the PAT used in Terraform is a
bit of a game of whack-a-mole. Fortunately, there is only so many options and
one can always just give full access to PAT.
