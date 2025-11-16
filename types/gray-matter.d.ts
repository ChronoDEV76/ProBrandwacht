declare module 'gray-matter' {
  import type { Input, GrayMatterOption, GrayMatterFile } from 'gray-matter'
  export default function matter<T = Record<string, unknown>>(
    input: Input,
    options?: GrayMatterOption<T>
  ): GrayMatterFile<T>
  export type { GrayMatterOption, GrayMatterFile }
}
