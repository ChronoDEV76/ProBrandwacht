declare module "next-contentlayer/hooks" {
  import type { MDXComponents } from "next-contentlayer/types";

  export function useMDXComponent(code: string): (props: any) => JSX.Element;
  export { MDXComponents };
}
