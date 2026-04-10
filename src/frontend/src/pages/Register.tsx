import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useRouter } from "@tanstack/react-router";
import {
  CheckCircle2,
  Fingerprint,
  Globe2,
  Loader2,
  Moon,
  Radio,
  ShieldCheck,
  Sun,
  UserPlus,
  Wifi,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Decentralized Identity",
    desc: "No passwords. Your identity is secured on the Internet Computer blockchain.",
  },
  {
    icon: Zap,
    title: "Instant Access",
    desc: "One tap to authenticate — no email verification, no approval queue.",
  },
  {
    icon: CheckCircle2,
    title: "Full NOC Privileges",
    desc: "Access all 12 operational modules from day one with Admin-level visibility.",
  },
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
      data-ocid="register-theme-toggle"
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

export default function Register() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, router]);

  function handleRegister() {
    setIsRegistering(true);
    login();
    setTimeout(() => setIsRegistering(false), 10_000);
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
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl pointer-events-none" />

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
        <div className="w-full max-w-2xl grid md:grid-cols-2 gap-8 items-start">
          {/* Left panel — features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="hidden md:flex flex-col justify-center gap-6 pt-4"
          >
            <div>
              <h2 className="font-display text-base tracking-widest text-foreground uppercase mb-1">
                NOC OPERATOR PORTAL
              </h2>
              <p className="text-xs text-muted-foreground font-body leading-relaxed">
                Join the global fiber network operations center. Gain real-time
                visibility into 48K+ optical nodes across 12 regions.
              </p>
            </div>
            <div className="space-y-4">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.1 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <f.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-display text-foreground tracking-wide">
                      {f.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                      {f.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right panel — register card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center noc-glow-active">
                    <UserPlus className="w-7 h-7 text-accent" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary border-2 border-card flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground" />
                  </span>
                </div>
              </div>

              <h1 className="font-display text-xl font-semibold text-center text-foreground tracking-wide mb-1">
                CREATE NOC ACCOUNT
              </h1>
              <p className="text-center text-xs text-muted-foreground font-body mb-8">
                Register with Internet Identity — no username or password
                required.
              </p>

              {/* Register button */}
              <button
                type="button"
                onClick={handleRegister}
                disabled={isRegistering || isInitializing}
                data-ocid="register-ii-button"
                className={cn(
                  "w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-display text-sm tracking-widest transition-smooth border",
                  "bg-accent/15 hover:bg-accent/25 border-accent/40 hover:border-accent/70 text-accent noc-glow-active",
                  "disabled:opacity-60 disabled:cursor-not-allowed",
                )}
              >
                {isRegistering || isInitializing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Fingerprint className="w-4 h-4" />
                )}
                {isInitializing
                  ? "INITIALIZING…"
                  : isRegistering
                    ? "CREATING IDENTITY…"
                    : "REGISTER WITH INTERNET IDENTITY"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest">
                  SECURE AUTH
                </span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              {/* Login link */}
              <p className="text-center text-xs text-muted-foreground">
                Already have an account?{" "}
                <a
                  href="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    router.navigate({ to: "/login" });
                  }}
                  data-ocid="register-login-link"
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth"
                >
                  Sign in
                </a>
              </p>
            </div>

            {/* Terms note */}
            <p className="text-center text-[10px] font-mono text-muted-foreground/50 mt-4 leading-relaxed">
              By registering, you accept the NOC operator terms of service and
              acknowledge that system access is logged and audited.
            </p>
          </motion.div>
        </div>
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
