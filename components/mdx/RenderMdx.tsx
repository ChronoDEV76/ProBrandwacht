components/mdx/RenderMdx.tsx
```tsx
"use client";

import * as React from "react";
import { useMDXComponent } from "next-contentlayer/hooks"; // Ensure this is correctly imported
import type { MDXComponents } from "next-contentlayer/types"; // Import the types for components

// Optional: map custom MDX components here
const defaultComponents = {
  // code: (p: any) => <pre className="...">{p.children}</pre>,
};

export default function RenderMdx({
  code,
  components,
}: {
  code: string;
  components?: MDXComponents; // Use the imported MDXComponents type
}) {
  const MDX = useMDXComponent(code);
  return <MDX components={{ ...defaultComponents, ...components }} />;
}

