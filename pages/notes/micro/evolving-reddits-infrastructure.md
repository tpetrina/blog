---
title: Evolving Reddit’s Infrastructure via Principled Platform Abstractions - Karan Thukral & Harvey Xia
---
https://www.youtube.com/watch?v=ruto5Sak-jI

When companies reach a certain maturity, they need platform abstractions to operate efficiently, especially as they grow.

![](../../../public/micro/Kubernetes%20Namespace.png) 

Creating a new cluster was slow (long procedure), decommissioning was worse.
Drift between them, hunting down references.

Abstraction: if it is expressed in concepts or vocabulary that does not require user to have knowledge about the underlying domain.
Why use kubernetes controller instead of IaC?
* IaC is for humans
* Self-healing
* Workflow style - multiple steps
* Scheduling built-in
![](../../../public/micro/Orchestration%20Architecture.png)

![](../../../public/images/Achilles%20SDK.png)