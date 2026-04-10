import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "@tanstack/react-router";
import {
  Activity,
  Eye,
  EyeOff,
  Globe2,
  Loader2,
  Lock,
  Moon,
  Radio,
  Server,
  Shield,
  Sun,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const STATS = [
  { label: "Nodes Online", value: "48,291", icon: Server },
  { label: "Signal Uptime", value: "99.97%", icon: Activity },
  { label: "Regions Active", value: "12", icon: Globe2 },
  { label: "Alerts Resolved", value: "1,042", icon: Shield },
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
  const { isAuthenticated } = useAuth();
  const { login, isLoading, error } = useAuthStore();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });

  useEffect(() => {
    if (isAuthenticated) void router.navigate({ to: "/" });
  }, [isAuthenticated, router]);

  const emailErr =
    touched.email && !email.trim()
      ? "Email is required"
      : touched.email && !/\S+@\S+\.\S+/.test(email)
        ? "Enter a valid email"
        : null;
  const passwordErr =
    touched.password && !password ? "Password is required" : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email || !password) return;
    const ok = await login(email, password);
    if (ok) void router.navigate({ to: "/" });
  }

  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-hidden relative">
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 h-14 border-b border-border/40 bg-card/80 backdrop-blur-md flex-shrink-0">
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

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-10 items-center">
          {/* Left panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="hidden lg:flex flex-col gap-8"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-8 rounded-full bg-primary" />
                <span className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase">
                  Global NOC Platform
                </span>
              </div>
              <h2 className="font-display text-2xl font-semibold text-foreground leading-tight mb-3">
                OPTICAL FIBER NETWORK
                <br />
                MANAGEMENT SYSTEM
              </h2>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-sm">
                Enterprise-grade carrier management for 100K+ optical nodes
                across multi-region deployments. Real-time monitoring,
                predictive fault intelligence, and SLA assurance.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.07 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0">
                    <s.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <p className="text-metric text-foreground font-mono font-semibold text-sm">
                      {s.value}
                    </p>
                    <p className="text-[10px] font-mono text-muted-foreground mt-0.5 tracking-wide">
                      {s.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust bar */}
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border/40 bg-muted/20">
              <Shield className="w-4 h-4 text-primary flex-shrink-0" />
              <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
                Enterprise-grade TLS 1.3 encryption · RBAC + ABAC · SOC 2 Type
                II compliant
              </p>
            </div>
          </motion.div>

          {/* Right panel — login card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-100 animate-pulse" />
                  </span>
                </div>
              </div>

              <h1 className="font-display text-lg font-semibold text-center text-foreground tracking-wide mb-1">
                NOC OPERATOR ACCESS
              </h1>
              <p className="text-center text-xs text-muted-foreground font-body mb-6">
                Sign in with your credentials to access the network operations
                center.
              </p>

              {/* Demo credentials hint */}
              <div className="mb-5 px-3 py-2.5 rounded-lg border border-primary/25 bg-primary/8 flex items-start gap-2">
                <span className="text-[10px] font-mono text-primary/80 leading-relaxed">
                  Demo:{" "}
                  <strong className="text-primary">admin@fibernms.com</strong> /{" "}
                  <strong className="text-primary">Admin@123</strong>
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Email */}
                <div>
                  <label
                    className="block text-[11px] font-mono text-muted-foreground mb-1.5 tracking-wide"
                    htmlFor="login-email"
                  >
                    WORK EMAIL
                  </label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                    placeholder="operator@company.com"
                    data-ocid="login-email"
                    className={cn(
                      "w-full px-3.5 py-2.5 rounded-lg text-sm bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none transition-smooth",
                      emailErr
                        ? "border-destructive/60 focus:border-destructive"
                        : "border-border/50 focus:border-primary/60",
                    )}
                  />
                  {emailErr && (
                    <p className="mt-1 text-[10px] font-mono text-destructive">
                      {emailErr}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label
                      className="block text-[11px] font-mono text-muted-foreground tracking-wide"
                      htmlFor="login-password"
                    >
                      PASSWORD
                    </label>
                    <button
                      type="button"
                      className="text-[10px] font-mono text-primary/70 hover:text-primary transition-smooth"
                      tabIndex={-1}
                      data-ocid="login-forgot-password"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() =>
                        setTouched((t) => ({ ...t, password: true }))
                      }
                      placeholder="••••••••"
                      data-ocid="login-password"
                      className={cn(
                        "w-full pl-3.5 pr-10 py-2.5 rounded-lg text-sm bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none transition-smooth",
                        passwordErr
                          ? "border-destructive/60 focus:border-destructive"
                          : "border-border/50 focus:border-primary/60",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-smooth"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {passwordErr && (
                    <p className="mt-1 text-[10px] font-mono text-destructive">
                      {passwordErr}
                    </p>
                  )}
                </div>

                {/* Remember me */}
                <label
                  className="flex items-center gap-2.5 cursor-pointer group"
                  data-ocid="login-remember-me"
                >
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-border/50 accent-primary"
                  />
                  <span className="text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-smooth">
                    Keep me signed in
                  </span>
                </label>

                {/* Server error */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="px-3.5 py-2.5 rounded-lg border border-destructive/40 bg-destructive/10 text-[11px] font-mono text-destructive"
                    data-ocid="login-error"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  data-ocid="login-submit"
                  className={cn(
                    "w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-display text-sm tracking-widest transition-smooth border mt-2",
                    "bg-primary/15 hover:bg-primary/25 border-primary/40 hover:border-primary/70 text-primary noc-glow",
                    "disabled:opacity-60 disabled:cursor-not-allowed",
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                  {isLoading ? "AUTHENTICATING…" : "SIGN IN TO NOC"}
                </button>
              </form>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-border/40" />
                <span className="text-[10px] font-mono text-muted-foreground/60 tracking-widest">
                  SECURE AUTH
                </span>
                <div className="flex-1 h-px bg-border/40" />
              </div>

              <p className="text-center text-xs text-muted-foreground">
                New to FiberNMS?{" "}
                <a
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    void router.navigate({ to: "/register" });
                  }}
                  data-ocid="login-register-link"
                  className="text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth"
                >
                  Request enterprise access
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 flex items-center justify-between px-6 py-3 border-t border-border/30 bg-card/50 backdrop-blur-sm flex-shrink-0">
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
