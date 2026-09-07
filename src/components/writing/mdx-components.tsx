import type { ReactNode } from "react";
import { codeToHtml } from "shiki";

type CodeProps = {
  children?: ReactNode;
  className?: string;
};

export async function CodeBlock({ children, className }: Readonly<CodeProps>) {
  const code = String(children ?? "").replace(/\n$/, "");

  const language = className?.replace("language-", "") || "text";

  const html = await codeToHtml(code, {
    lang: language,
    theme: "github-dark",
  });

  return (
    <div className="my-6 overflow-hidden rounded-md border border-foreground/10 bg-[#0d1117]">
      <div className="overflow-x-auto">
        <div
          className="[&>pre]:m-0 [&>pre]:overflow-x-auto [&>pre]:p-4 sm:[&>pre]:p-5 [&_code]:font-mono [&_code]:text-[11px] [&_code]:leading-6 sm:[&_code]:text-xs"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

export const mdxComponents = {
  pre: CodeBlock,

  h2: ({ children }: { children?: ReactNode }) => (
    <h2 className="mt-12 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
      {children}
    </h2>
  ),

  h3: ({ children }: { children?: ReactNode }) => (
    <h3 className="mt-10 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
      {children}
    </h3>
  ),

  p: ({ children }: { children?: ReactNode }) => (
    <p className="text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
      {children}
    </p>
  ),

  blockquote: ({ children }: { children?: ReactNode }) => (
    <blockquote className="border-l-2 border-accent-text/40 pl-5 text-[15px] leading-7 text-muted-foreground italic sm:text-base sm:leading-8">
      {children}
    </blockquote>
  ),

  ul: ({ children }: { children?: ReactNode }) => (
    <ul className="space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8 [&>li]:list-disc">
      {children}
    </ul>
  ),

  ol: ({ children }: { children?: ReactNode }) => (
    <ol className="space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8 [&>li]:list-decimal">
      {children}
    </ol>
  ),

  a: ({ href, children }: { href?: string; children?: ReactNode }) => (
    <a
      href={href}
      className="text-accent-text underline decoration-accent-text/30 underline-offset-4 transition-colors hover:decoration-accent-text"
    >
      {children}
    </a>
  ),
};
