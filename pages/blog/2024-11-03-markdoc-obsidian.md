---
title: Markdoc and Obsidian for blog
publishedAt: 2024-11-03
summary: Switching to Obsidian for writing, Markdoc for rendering
tags:
  - blog
---
This blog is a Next.js app rendering blog posts written as Markdown files. Originally, both development of the app and writing of posts happened in VS Code. The authoring experience was pretty good due to built in Markdown preview and templates using [`plop`](https://plopjs.com/).

I use Obsidian regularly for taking private notes and general writing. Over time, I wrote code snippets and other notes that could end up in blog. I realized quickly that writing in Obsidian was way faster and more convenient than writing raw Markdown files in VS Code. Since the focus when writing is on writing itself, the "app" nature of the blog started to get in the way.

Hence the "new system" where the authoring is done via Obsidian without thinking too much about the markdown or code itself. Writing should be separate from development. Obsidian is customizable and two features were really easy in Obsidian compared to writing Markdown: links between posts and pasting images.

The original version of this blog used `remark`/`rehype` code salvaged/scavenged from the internet. All blog posts are markdown files in the root `data` folder which Next renders statically as pages. Pasting images was impossible: I had to save the file first and then reference it by full path and name. Compare that with Obsidian where pasting image immediately pastes it in the correct folder. It also automatically updates posts referencing files after renaming or moving a file.

Obsidian is best used for writing. It is also highly customizable and I wanted to take advantage of that.. I also wanted better control over the markdown files so I decided to switch to [Markdoc](https://markdoc.dev/) instead (cue the obligatory sneering comment about rewriting blog system) - but this one feels "final". Worst case scenario, I can just keep using Obsidian or use myriad of publishing options available in the ecosystem.

From now on, development of the site will be kept separate from authoring experience. In fact, I don't even need to run the blog locally when I just want to type up something or create a knowledge base article. I can fire up Obsidian and just type (and push to GHA). And if I want to play with design and functionality, I will start is an application.

So here is to the new era of writing.