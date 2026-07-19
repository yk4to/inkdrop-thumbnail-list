declare module 'extract-img-url' {
  export function extractImgUrl(markdown: string): string | undefined
}

declare module 'white-matter' {
  interface MatterResult {
    data: Record<string, unknown>
  }

  export default function matter(markdown: string): MatterResult
}
