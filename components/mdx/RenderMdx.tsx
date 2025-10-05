"use client";
import * as React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";

type MDXComponents = Record<string, React.ComponentType<any>>;
const defaultComponents: MDXComponents = {};

export default function RenderMdx({
  code,
  components,
}: {
  code: string;
  components?: MDXComponents;
}) {
  const MDX = useMDXComponent(code);
  return <MDX components={{ ...defaultComponents, ...(components || {}) }} type="button" />; // Ensure button type is set
}
