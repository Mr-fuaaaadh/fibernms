import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  ChevronRight,
  Copy,
  ExternalLink,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
// Vite ?raw import — inlined at build time, zero network request
import readmeContent from "../../../../README.md?raw";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TocEntry {
  id: string;
  label: string;
  level: number;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function parseToc(markdown: string): TocEntry[] {
  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const entries: TocEntry[] = [];
  for (const match of markdown.matchAll(headingRegex)) {
    const level = match[1].length;
    const label = match[2].replace(/\*\*|__|`/g, "").trim();
    entries.push({ id: slugify(label), label, level });
  }
  return entries;
}

// ─── Code block with copy ─────────────────────────────────────────────────────

function CodeBlock({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const codeText =
    typeof children === "string" ? children : String(children ?? "");

  function copy() {
    navigator.clipboard.writeText(codeText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  const lang = className?.replace("language-", "") ?? "";

  return (
    <div className="relative group my-4 rounded-lg border border-border/60 bg-[hsl(var(--background))] overflow-hidden">
      {lang && (
        <div className="flex items-center justify-between px-4 py-1.5 border-b border-border/50 bg-muted/30">
          <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            {lang}
          </span>
          <button
            type="button"
            onClick={copy}
            aria-label="Copy code"
            className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
          >
            <Copy className="w-3 h-3" />
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <ScrollArea>
        <pre className="px-4 py-3 text-[13px] font-mono leading-relaxed text-foreground overflow-x-auto whitespace-pre">
          <code>{children}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}

// ─── Markdown component map ───────────────────────────────────────────────────

function makeComponents(): Components {
  return {
    h1: ({ children }) => (
      <h1 className="text-2xl font-display font-bold text-foreground mt-8 mb-4 pb-2 border-b border-border/50 flex items-center gap-2">
        <span className="text-primary/60">›</span>
        {children}
      </h1>
    ),
    h2: ({ children }) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugify(text);
      return (
        <h2
          id={id}
          className="text-xl font-display font-semibold text-foreground mt-8 mb-3 pb-1.5 border-b border-border/30 scroll-mt-6"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="text-base font-display font-semibold text-foreground mt-6 mb-2 scroll-mt-6"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugify(text);
      return (
        <h4
          id={id}
          className="text-sm font-display font-semibold text-muted-foreground mt-4 mb-2 uppercase tracking-wide scroll-mt-6"
        >
          {children}
        </h4>
      );
    },
    p: ({ children }) => (
      <p className="text-sm text-muted-foreground leading-7 mb-4">{children}</p>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-primary hover:text-primary/80 underline underline-offset-2 inline-flex items-center gap-0.5 transition-colors"
      >
        {children}
        {href?.startsWith("http") && (
          <ExternalLink className="w-3 h-3 opacity-60" />
        )}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="list-none mb-4 space-y-1.5 text-sm text-muted-foreground pl-0">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-1.5 text-sm text-muted-foreground pl-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="flex items-start gap-2 leading-6">
        <span className="text-primary/50 mt-1.5 flex-shrink-0">▸</span>
        <span>{children}</span>
      </li>
    ),
    code: ({ className, children, ...rest }) => {
      const isBlock = "node" in rest;
      if (className?.startsWith("language-") || isBlock) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
      }
      return (
        <code className="px-1.5 py-0.5 rounded bg-muted/70 font-mono text-[12px] text-primary/90 border border-border/40">
          {children}
        </code>
      );
    },
    pre: ({ children }) => <>{children}</>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-primary/50 pl-4 my-4 text-muted-foreground italic text-sm bg-primary/5 py-2 pr-4 rounded-r-md">
        {children}
      </blockquote>
    ),
    table: ({ children }) => (
      <div className="my-4 overflow-x-auto rounded-lg border border-border/50">
        <table className="w-full text-sm">{children}</table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-muted/40 text-foreground font-medium">
        {children}
      </thead>
    ),
    tbody: ({ children }) => (
      <tbody className="divide-y divide-border/30">{children}</tbody>
    ),
    tr: ({ children }) => (
      <tr className="hover:bg-muted/20 transition-colors">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2.5 text-left text-xs font-display font-semibold uppercase tracking-wider text-muted-foreground">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2.5 text-sm text-muted-foreground">{children}</td>
    ),
    hr: () => <Separator className="my-6 bg-border/40" />,
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic text-muted-foreground">{children}</em>
    ),
  };
}

// ─── Table of Contents ────────────────────────────────────────────────────────

function TableOfContents({
  entries,
  activeId,
  onSelect,
}: {
  entries: TocEntry[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  // Only show h2 and h3
  const visible = entries.filter((e) => e.level <= 3);

  return (
    <aside className="w-56 flex-shrink-0 hidden xl:flex flex-col">
      <div className="sticky top-0">
        <div className="flex items-center gap-2 mb-4">
          <ChevronRight className="w-3.5 h-3.5 text-primary/60" />
          <span className="text-[10px] font-display uppercase tracking-[0.2em] text-muted-foreground/70">
            On this page
          </span>
        </div>
        <ScrollArea className="h-[calc(100vh-12rem)]">
          <nav className="space-y-0.5 pr-2">
            {visible.map((entry) => (
              <button
                key={entry.id}
                type="button"
                onClick={() => onSelect(entry.id)}
                className={cn(
                  "block w-full text-left px-2 py-1.5 rounded text-xs transition-colors leading-snug",
                  entry.level === 2
                    ? "font-medium"
                    : "pl-4 text-[11px] font-normal",
                  activeId === entry.id
                    ? "bg-primary/15 text-primary border-l-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                )}
                data-ocid={`toc-${entry.id}`}
              >
                {entry.label}
              </button>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Docs() {
  const toc = useMemo(() => parseToc(readmeContent), []);
  const [activeId, setActiveId] = useState(toc[0]?.id ?? "");
  const contentRef = useRef<HTMLDivElement>(null);
  const components = useMemo(() => makeComponents(), []);

  // Intersection observer for active TOC tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0% -70% 0%", threshold: 0 },
    );

    const headings = contentRef.current?.querySelectorAll("h2, h3, h4");
    if (headings) {
      for (const h of headings) {
        observer.observe(h);
      }
    }
    return () => observer.disconnect();
  }, []);

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  }

  return (
    <div className="min-h-full bg-background">
      {/* ── Page Header ── */}
      <div className="sticky top-0 z-10 bg-card border-b border-border/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-primary/15 border border-primary/30 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-display font-semibold text-foreground leading-none">
                Documentation
              </h1>
              <p className="text-[10px] text-muted-foreground mt-0.5 font-mono">
                FiberNMS Platform Guide
              </p>
            </div>
            <Badge
              variant="outline"
              className="ml-2 text-[9px] font-mono border-primary/30 text-primary/70 hidden sm:flex"
            >
              README.md
            </Badge>
          </div>

          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground gap-2 text-xs"
              data-ocid="docs-back-to-app"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to App
            </Button>
          </Link>
        </div>
      </div>

      {/* ── Content layout ── */}
      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Main content */}
        <main
          ref={contentRef}
          className="flex-1 min-w-0"
          data-ocid="docs-content"
        >
          <div className="prose-noc">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
              {readmeContent}
            </ReactMarkdown>
          </div>
        </main>

        {/* Table of contents */}
        <TableOfContents
          entries={toc}
          activeId={activeId}
          onSelect={scrollToSection}
        />
      </div>
    </div>
  );
}
