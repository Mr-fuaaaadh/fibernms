import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "@tanstack/react-router";
import { CommandPalette } from "./CommandPalette";
import { MobileBottomNav } from "./MobileBottomNav";
import { MobileHeader } from "./MobileHeader";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function Layout() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="flex flex-col w-screen h-dvh overflow-hidden bg-background text-foreground">
        {/* Fixed mobile header — 56px (h-14) */}
        <MobileHeader />

        {/* Scrollable main content — sits between header (56px) and bottom nav (64px) */}
        <main
          className="overflow-y-auto overflow-x-hidden bg-background"
          style={{
            position: "fixed",
            top: "56px",
            bottom: "64px",
            left: 0,
            right: 0,
            height: "calc(100dvh - 56px - 64px)",
            WebkitOverflowScrolling: "touch",
            /* Map pages need height:100% to propagate down to MapContainer */
          }}
        >
          {/* height:100% wrapper so map pages can fill the full available height */}
          <div style={{ height: "100%", width: "100%" }}>
            <Outlet />
          </div>
        </main>

        {/* Fixed bottom navigation — 64px (h-16) */}
        <MobileBottomNav />

        <CommandPalette />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />
        {/* overflow-hidden here + height:100% in map pages = fullscreen map without scroll */}
        {/* position:relative so map page can use absolute inset-0 */}
        <main
          className="flex-1 bg-background"
          style={{ position: "relative", overflow: "hidden" }}
        >
          {/* Scroll host for non-map pages — map page overrides with absolute inset-0 */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </div>
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
