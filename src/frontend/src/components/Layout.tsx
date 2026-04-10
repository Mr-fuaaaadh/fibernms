import { Outlet } from "@tanstack/react-router";
import { CommandPalette } from "./CommandPalette";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

export function Layout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-auto bg-background">
          <Outlet />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
