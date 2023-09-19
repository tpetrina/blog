---
title: "Add prefix to each key in Terraform"
publishedAt: "2023-08-09"
tags: ["terraform"]
summary: "Simple way to add a prefix to each key when iterating over a collection"
---

Secrets in Hashicorp Vault are not prefixed while the app expects them prefixed.
Example: secret is named `SendgridKey` in HCP, but I need `APP_SendgridKey`.

To insert all of them, but prefix them before applying:

```toml
data "hcp_vault_secrets_app" "some_secrets" {
  app_name = "some_secrets"
}

locals {
  # data.hcp_vault_secrets_app.some_secrets.secrets : {
  prefixed_secrets = { for key, value in data.hcp_vault_secrets_app.some_secrets.secrets : "APP_${key}" => value }
}

resource "kubernetes_secret" "some_secrets" {
  metadata {
    name      = "some_secrets"
  }

  data = local.prefixed_secrets
}
```
