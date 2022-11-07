// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Markdoc from "@markdoc/markdoc";

type Data = any;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const doc = (function () {
    if (req.method === "POST") {
      return req.body;
    }

    return `---
title: Title!
---
# Markdoc README

## Sub

This is _em_ *strong*.

{% image src="/logo.svg" /%}
`;
  })();

  const config = {
    // tags: {
    //   callout,
    // },
    nodes: {
      //   heading,
    },
    variables: {},
  };

  const ast = Markdoc.parse(doc);
  const content = Markdoc.transform(ast, config);

  res.json(content);
}
