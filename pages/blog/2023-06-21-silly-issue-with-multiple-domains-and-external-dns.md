---
title: "Silly issue with multiple domains and external-dns"
publishedAt: "2023-06-21"
summary: "When using multiple domains, don't forget to also update zones"
tags: ["buildinpublic", "external-dns"]
---

I am using [external-dns](https://github.com/kubernetes-sigs/external-dns) for
automatically creating DNS entries on Cloudflare from ingresses and services
running in a cluster. The setup worked well enough when I used only one domain -
but now I wanted to add a bunch of other domains.

Adding domains is pretty straightforward: just spam `--domain-filter=`. But
after deploying it - no domain records were updated.

So, two problems:

1. The Cloudflare token was only for the zone originally used - added others
2. The zone was also passed as a `-zone-id-filter` argument - added others

That's really it! For every domain in Cloudflare do the following:

1. Update API Token `DNS:Edit` entries (let's not comment on CF and edit functionality)
2. Add the domain as another `--domain-filter=` entry
3. Add the zone as another `-zone-id-filter` entry
