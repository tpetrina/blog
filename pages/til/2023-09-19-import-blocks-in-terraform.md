---
title: "Import blocks in Terraform"
publishedAt: "2023-09-19"
tags: ["terraform", "cicd"]
summary: "Import blocks are declarative and can be reviewed"
---

Terraform 1.5.0 introduces import blocks which simplify importing resources.
Instead of doing the following:

```shell
terraform import github_repository.resource_name repo-name
```

You can write:

```toml
import {
    to = github_repository.resource_name
    id = "repo-name"
}
```

This is declarative, avoids CLI and can be reviewed in a PR! If you are using
Atlantis or similar tool, then import is done when applying instead of a
separate step that might change your state.

Additionally, once it is merged, import blocks can be removed in subsequent PRs.

Read more at [Import Syntax](https://developer.hashicorp.com/terraform/language/import#syntax).
