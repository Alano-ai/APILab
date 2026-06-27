import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="prose prose-sm dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            const isInline = !match && !className
            
            if (isInline) {
              return (
                <code
                  className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              )
            }
            
            return (
              <div className="relative">
                {match && (
                  <div className="absolute right-2 top-2 text-xs text-muted-foreground">
                    {match[1]}
                  </div>
                )}
                <code className={className} {...props}>
                  {children}
                </code>
              </div>
            )
          },
          pre({ children }) {
            return (
              <pre className="overflow-x-auto rounded-lg bg-muted p-4">
                {children}
              </pre>
            )
          },
          a({ href, children }) {
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline underline-offset-4 hover:text-primary/80"
              >
                {children}
              </a>
            )
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-border">
                  {children}
                </table>
              </div>
            )
          },
          th({ children }) {
            return (
              <th className="border border-border bg-muted px-4 py-2 text-left font-medium">
                {children}
              </th>
            )
          },
          td({ children }) {
            return (
              <td className="border border-border px-4 py-2">
                {children}
              </td>
            )
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}