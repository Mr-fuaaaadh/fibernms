import * as Dialog from "@radix-ui/react-dialog";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ChevronRight,
  Clock,
  Cpu,
  GitBranch,
  LayoutDashboard,
  MapPin,
  Network,
  Route,
  Search,
  Shield,
  Wrench,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNetworkStore } from "../store/networkStore";
import type { CommandPaletteItem } from "../types/network";

// ─── Static page items ────────────────────────────────────────────────────────
const PAGE_ITEMS: CommandPaletteItem[] = [
  {
    id: "p-map",
    type: "page",
    title: "Map Dashboard",
    subtitle: "GIS network map",
    href: "/",
    icon: "map",
  },
  {
    id: "p-dev",
    type: "page",
    title: "Devices",
    subtitle: "Device inventory",
    href: "/devices",
    icon: "cpu",
  },
  {
    id: "p-top",
    type: "page",
    title: "Topology",
    subtitle: "Network tree view",
    href: "/topology",
    icon: "network",
  },
  {
    id: "p-mon",
    type: "page",
    title: "Monitoring",
    subtitle: "Real-time signals",
    href: "/monitoring",
    icon: "activity",
  },
  {
    id: "p-ana",
    type: "page",
    title: "Analytics",
    subtitle: "KPI dashboards",
    href: "/analytics",
    icon: "zap",
  },
  {
    id: "p-wf",
    type: "page",
    title: "Workflows",
    subtitle: "Automation builder",
    href: "/workflows",
    icon: "git",
  },
  {
    id: "p-ai",
    type: "page",
    title: "AI Assistant",
    subtitle: "Copilot & diagnostics",
    href: "/ai",
    icon: "shield",
  },
  {
    id: "p-tools",
    type: "page",
    title: "Tools",
    subtitle: "Power budget & OTDR",
    href: "/tools",
    icon: "wrench",
  },
];

function getIcon(icon: string, className = "w-4 h-4") {
  const props = { className };
  switch (icon) {
    case "map":
      return <MapPin {...props} />;
    case "cpu":
      return <Cpu {...props} />;
    case "network":
      return <Network {...props} />;
    case "activity":
      return <Activity {...props} />;
    case "zap":
      return <Zap {...props} />;
    case "git":
      return <GitBranch {...props} />;
    case "shield":
      return <Shield {...props} />;
    case "wrench":
      return <Wrench {...props} />;
    case "alert":
      return <AlertTriangle {...props} />;
    case "route":
      return <Route {...props} />;
    case "sla":
      return <LayoutDashboard {...props} />;
    default:
      return <Search {...props} />;
  }
}

const CATEGORY_LABELS: Record<CommandPaletteItem["type"], string> = {
  page: "Pages",
  device: "Devices",
  alert: "Alerts",
  workflow: "Workflows",
  route: "Routes",
  sla: "SLA",
};

const RECENT_KEY = "fibernms:recent-searches";
const MAX_RECENT = 5;

export function CommandPalette() {
  const open = useNetworkStore((s) => s.commandPaletteOpen);
  const toggleCommandPalette = useNetworkStore((s) => s.toggleCommandPalette);
  const mobileSearchOpen = useNetworkStore((s) => s.mobileSearchOpen);
  const setMobileSearchOpen = useNetworkStore((s) => s.setMobileSearchOpen);
  const devices = useNetworkStore((s) => s.devices);
  const alerts = useNetworkStore((s) => s.alerts);
  const routes = useNetworkStore((s) => s.routes);
  const slaRecords = useNetworkStore((s) => s.slaRecords);

  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]");
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Combined open state — desktop CMD+K or mobile search icon
  const isOpen = open || mobileSearchOpen;

  // ─── Global keyboard shortcut ───────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggleCommandPalette();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [toggleCommandPalette]);

  // ─── Focus input on open ────────────────────────────────────────────────
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setCursor(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // ─── Build searchable item pool ─────────────────────────────────────────
  const allItems: CommandPaletteItem[] = [
    ...PAGE_ITEMS,
    ...devices.slice(0, 200).map((d) => ({
      id: d.id,
      type: "device" as const,
      title: d.name,
      subtitle: `${d.type} · ${d.status} · ${d.region ?? d.location ?? ""}`,
      href: "/devices",
      icon: "cpu",
    })),
    ...alerts
      .filter((a) => !a.resolved)
      .slice(0, 100)
      .map((a) => ({
        id: a.id,
        type: "alert" as const,
        title: a.deviceName,
        subtitle: a.issueType,
        href: "/monitoring",
        icon: "alert",
      })),
    ...routes.map((r) => ({
      id: r.id,
      type: "route" as const,
      title: r.name,
      subtitle: `${r.type} · ${r.distanceKm} km · ${r.status}`,
      href: "/",
      icon: "route",
    })),
    ...slaRecords.map((s) => ({
      id: s.id,
      type: "sla" as const,
      title: s.customerName,
      subtitle: `SLA · ${s.region} · ${s.status}`,
      href: "/analytics",
      icon: "sla",
    })),
  ];

  // ─── Filtered results ───────────────────────────────────────────────────
  const filtered = query.trim()
    ? allItems
        .filter(
          (item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.subtitle.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 40)
    : PAGE_ITEMS;

  // ─── Group by category ──────────────────────────────────────────────────
  const grouped = filtered.reduce<Record<string, CommandPaletteItem[]>>(
    (acc, item) => {
      const cat = CATEGORY_LABELS[item.type];
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {},
  );

  const flatItems = Object.values(grouped).flat();

  // ─── Keyboard navigation ────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (e.key === "Enter" && flatItems[cursor]) {
        selectItem(flatItems[cursor]);
      }
    },
    [flatItems, cursor],
  );

  // Scroll cursor into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-cursor="${cursor}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [cursor]);

  // ─── Item selection ─────────────────────────────────────────────────────
  const selectItem = useCallback(
    (item: CommandPaletteItem) => {
      if (query.trim()) {
        setRecentSearches((prev) => {
          const updated = [
            query.trim(),
            ...prev.filter((r) => r !== query.trim()),
          ].slice(0, MAX_RECENT);
          localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
          return updated;
        });
      }
      navigate({ to: item.href });
      if (open) toggleCommandPalette();
      if (mobileSearchOpen) setMobileSearchOpen(false);
    },
    [
      query,
      navigate,
      open,
      mobileSearchOpen,
      toggleCommandPalette,
      setMobileSearchOpen,
    ],
  );

  // ─── Severity color for alerts ──────────────────────────────────────────
  function itemAccent(item: CommandPaletteItem) {
    if (item.type === "alert") return "text-[var(--color-critical)]";
    if (item.type === "sla") return "text-[var(--color-warning)]";
    if (item.type === "page") return "text-[var(--color-cyan)]";
    return "text-foreground";
  }

  // ─── Shared results content ─────────────────────────────────────────────
  function renderResults() {
    let globalIdx = 0;
    return (
      <>
        {/* Recent searches (only when no query) */}
        {!query.trim() && recentSearches.length > 0 && (
          <div className="mb-2">
            <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              Recent
            </p>
            {recentSearches.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setQuery(r)}
                className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-muted/30 transition-colors"
              >
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {r}
              </button>
            ))}
          </div>
        )}

        {/* Grouped results */}
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
              {category}
            </p>
            {items.map((item) => {
              const idx = globalIdx++;
              const isActive = idx === cursor;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-cursor={idx}
                  onClick={() => selectItem(item)}
                  onMouseEnter={() => setCursor(idx)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                    isActive
                      ? "bg-cyan-500/10 border-l-2 border-cyan-400"
                      : "border-l-2 border-transparent hover:bg-muted/30"
                  }`}
                >
                  <span className={`shrink-0 ${itemAccent(item)}`}>
                    {getIcon(item.icon)}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span
                      className={`block text-sm font-medium truncate ${itemAccent(item)}`}
                    >
                      {item.title}
                    </span>
                    <span className="block text-xs text-muted-foreground truncate">
                      {item.subtitle}
                    </span>
                  </span>
                  {isActive && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* No results */}
        {flatItems.length === 0 && query.trim() && (
          <div
            className="flex flex-col items-center justify-center py-12 text-center"
            data-ocid="command-palette-empty"
          >
            <Search className="w-8 h-8 text-muted-foreground mb-3" />
            <p className="text-sm font-medium text-foreground">
              No results for &ldquo;{query}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Try searching for device names, alert types, or routes
            </p>
          </div>
        )}
      </>
    );
  }

  // ─── Mobile fullscreen overlay ──────────────────────────────────────────
  if (mobileSearchOpen) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
        data-ocid="mobile-search-overlay"
      >
        {/* Mobile search header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border/50 bg-card flex-shrink-0">
          <button
            type="button"
            onClick={() => setMobileSearchOpen(false)}
            aria-label="Close search"
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
            data-ocid="mobile-search-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 flex items-center gap-2 bg-muted/40 border border-border/50 rounded-xl px-4 py-2.5">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search devices, alerts, routes…"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-lg"
              data-ocid="mobile-search-input"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Mobile results — fills remaining screen */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto py-2"
          data-ocid="mobile-search-results"
        >
          {renderResults()}
        </div>

        {/* Mobile footer */}
        <div className="border-t border-border/50 px-4 py-3 flex items-center justify-between text-[10px] text-muted-foreground flex-shrink-0 bg-card">
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border/60 bg-muted/40 px-1 font-mono text-[10px]">
              ↑↓
            </kbd>{" "}
            Navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="rounded border border-border/60 bg-muted/40 px-1 font-mono text-[10px]">
              ↵
            </kbd>{" "}
            Select
          </span>
          <span>{flatItems.length} results</span>
        </div>
      </div>
    );
  }

  // ─── Desktop dialog ─────────────────────────────────────────────────────
  let globalIdx = 0;

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && toggleCommandPalette()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className="fixed left-1/2 top-[15%] z-50 w-full max-w-2xl -translate-x-1/2 rounded-2xl border border-white/10 bg-card/95 shadow-2xl backdrop-blur-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
          onKeyDown={handleKeyDown}
          aria-label="Command palette"
          data-ocid="command-palette-dialog"
        >
          {/* Search input */}
          <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <Search className="w-5 h-5 text-muted-foreground shrink-0" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCursor(0);
              }}
              placeholder="Search devices, alerts, routes, workflows…"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
              data-ocid="command-palette-input"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-white/10 bg-muted/40 px-1.5 py-0.5 text-[10px] text-muted-foreground font-mono">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div
            ref={listRef}
            className="max-h-[420px] overflow-y-auto py-2"
            data-ocid="command-palette-results"
          >
            {/* Recent searches (only when no query) */}
            {!query.trim() && recentSearches.length > 0 && (
              <div className="mb-2">
                <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Recent
                </p>
                {recentSearches.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setQuery(r)}
                    className="flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground hover:bg-muted/30 transition-colors"
                  >
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Grouped results */}
            {Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <p className="px-4 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {category}
                </p>
                {items.map((item) => {
                  const idx = globalIdx++;
                  const isActive = idx === cursor;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      data-cursor={idx}
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setCursor(idx)}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                        isActive
                          ? "bg-cyan-500/10 border-l-2 border-cyan-400"
                          : "border-l-2 border-transparent hover:bg-muted/30"
                      }`}
                    >
                      <span className={`shrink-0 ${itemAccent(item)}`}>
                        {getIcon(item.icon)}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className={`block text-sm font-medium truncate ${itemAccent(item)}`}
                        >
                          {item.title}
                        </span>
                        <span className="block text-xs text-muted-foreground truncate">
                          {item.subtitle}
                        </span>
                      </span>
                      {isActive && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* No results */}
            {flatItems.length === 0 && query.trim() && (
              <div
                className="flex flex-col items-center justify-center py-12 text-center"
                data-ocid="command-palette-empty"
              >
                <Search className="w-8 h-8 text-muted-foreground mb-3" />
                <p className="text-sm font-medium text-foreground">
                  No results for &ldquo;{query}&rdquo;
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Try searching for device names, alert types, or routes
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/10 px-4 py-2 flex items-center gap-4 text-[10px] text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-muted/40 px-1 font-mono">
                ↑↓
              </kbd>{" "}
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-muted/40 px-1 font-mono">
                ↵
              </kbd>{" "}
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-white/10 bg-muted/40 px-1 font-mono">
                ESC
              </kbd>{" "}
              Close
            </span>
            <span className="ml-auto">{flatItems.length} results</span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
