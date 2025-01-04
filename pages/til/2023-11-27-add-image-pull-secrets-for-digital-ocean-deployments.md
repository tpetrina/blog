---
title: "Add ImagePullSecrets for DigitalOcean deployments"
publishedAt: "2023-11-27"
summary: "Add imagePullSecrets to ensure authentication for the DO registry"
tags: ["kubernetes", "digitalocean"]
---

After deploying to DigitalOcean, suddenly my containers wouldn't start due to
401 errors from DigitalOcean. The cluster never had issues before so I had to
manually add it.

```yaml
spec:
  template:
    spec:
      imagePullSecrets:
        - name: secret-name-injected-usually-name-of-registry
```
