components/mdx/RenderMdx.tsx
```tsx
"use client";

import * as React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

// Optional: map custom MDX components here
const defaultComponents = {
  // code: (p: any) => <pre className="...">{p.children}</pre>,
};

export default function RenderMdx({
  code,
  components,
}: {
  code: string;
  components?: Record<string, React.ComponentType<any>>;
}) {
  const MDX = useMDXComponent(code);
  return <MDX components={{ ...defaultComponents, ...components }} />;
}

