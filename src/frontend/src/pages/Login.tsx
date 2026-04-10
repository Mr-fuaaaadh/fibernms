import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import {
  Fingerprint,
  Globe2,
  Loader2,
  Lock,
  Moon,
  Radio,
  Sun,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const STATS = [
  { label: "Nodes Online", value: "48,291" },
  { label: "Signal Uptime", value: "99.97%" },
  { label: "Regions Active", value: "12" },
  { label: "Alerts Resolved", value: "1,042" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
      data-ocid="login-theme-toggle"
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : (
          <motion.span
            key="moon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

export default function Login() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, router]);

  function handleLogin() {
    setIsLoggingIn(true);
    login();
    // Reset in case popup was closed without logging in
    setTimeout(() => setIsLoggingIn(false), 10_000);
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-hidden relative">
      {/* Decorative grid */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      {/* Radial glow behind card */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-between px-6 h-14 border-b border-border/40 bg-card/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center noc-glow">
            <Radio className="w-4 h-4 text-primary" />
          </div>
          <span className="font-display text-sm font-semibold tracking-wider text-foreground">
            FIBERNMS
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-[9px] font-mono text-primary tracking-widest">
            <Wifi className="w-2.5 h-2.5" />
            ENTERPRISE
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* Card */}
          <div className="glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50">
            {/* Lock icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow">
                  <Lock className="w-7 h-7 text-primary" />
                </div>
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-100 animate-pulse" />
                </span>
              </div>
            </div>

            <h1 className="font-display text-xl font-semibold text-center text-foreground tracking-wide mb-1">
              NOC OPERATOR ACCESS
            </h1>
            <p className="text-center text-xs text-muted-foreground font-body mb-8">
              Authenticate with Internet Identity to access the global network
              operations center.
            </p>

            {/* Internet Identity button */}
            <button
              type="button"
              onClick={handleLogin}
              disabled={isLoggingIn || isInitializing}
              data-ocid="login-ii-button"
              className={cn(
                "w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-display text-sm tracking-widest transition-smooth border",
                "bg-primary/15 hover:bg-primary/25 border-primary/40 hover:border-primary/70 text-primary noc-glow",
                "disabled:opacity-60 disabled:cursor-not-allowed",
              )}
            >
              {isLoggingIn || isInitializing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Fingerprint className="w-4 h-4" />
              )}
              {isInitializing
                ? "INITIALIZING…"
                : isLoggingIn
                  ? "AUTHENTICATING…"
                  : "SIGN IN WITH INTERNET IDENTITY"}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border/40" />
              <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest">
                SECURE AUTH
              </span>
              <div className="flex-1 h-px bg-border/40" />
            </div>

            {/* Register link */}
            <p className="text-center text-xs text-muted-foreground">
              New to FiberNMS?{" "}
              <a
                href="/register"
                onClick={(e) => {
                  e.preventDefault();
                  router.navigate({ to: "/register" });
                }}
                data-ocid="login-register-link"
                className="text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth"
              >
                Create an account
              </a>
            </p>
          </div>

          {/* Live stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="grid grid-cols-4 gap-3 mt-5"
          >
            {STATS.map((s) => (
              <div
                key={s.label}
                className="glass-card rounded-xl p-3 text-center"
              >
                <p className="text-metric text-primary text-sm">{s.value}</p>
                <p className="text-[9px] font-mono text-muted-foreground/70 mt-0.5 tracking-wide leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-6 py-3 border-t border-border/30 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60">
          <Globe2 className="w-3 h-3" />
          <span>GLOBAL NOC SYSTEM v3.2.1</span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground/50">
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-muted-foreground transition-smooth"
          >
            Built with caffeine.ai
          </a>
        </span>
      </footer>
    </div>
  );
}
