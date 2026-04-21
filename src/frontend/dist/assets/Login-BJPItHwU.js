import { ar as useAuth, as as useAuthStore, ae as useRouter, r as reactExports, j as jsxRuntimeExports, v as Radio, m as motion, ac as Server, p as Activity, aj as Shield, at as Lock, e as cn, au as z, A as AnimatePresence, av as Sun, aw as Moon } from "./index-WMTkA9vU.js";
import { W as Wifi } from "./wifi-BaTF3kYY.js";
import { E as Earth } from "./earth-D5woWCof.js";
import { E as EyeOff } from "./eye-off-CgBU5lrk.js";
import { E as Eye } from "./eye-etdloX7s.js";
import { L as LoaderCircle } from "./loader-circle-CaHm_Pxi.js";
const STATS = [
  { label: "Nodes Online", value: "48,291", icon: Server },
  { label: "Signal Uptime", value: "99.97%", icon: Activity },
  { label: "Regions Active", value: "12", icon: Earth },
  { label: "Alerts Resolved", value: "1,042", icon: Shield }
];
function ThemeToggle() {
  const { theme, setTheme } = z();
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const isDark = theme === "dark";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: () => setTheme(isDark ? "light" : "dark"),
      "aria-label": isDark ? "Switch to light mode" : "Switch to dark mode",
      className: "p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth",
      "data-ocid": "login-theme-toggle",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", initial: false, children: isDark ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { rotate: -90, scale: 0.5, opacity: 0 },
          animate: { rotate: 0, scale: 1, opacity: 1 },
          exit: { rotate: 90, scale: 0.5, opacity: 0 },
          transition: { duration: 0.2 },
          className: "flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-4 h-4" })
        },
        "sun"
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { rotate: 90, scale: 0.5, opacity: 0 },
          animate: { rotate: 0, scale: 1, opacity: 1 },
          exit: { rotate: -90, scale: 0.5, opacity: 0 },
          transition: { duration: 0.2 },
          className: "flex items-center justify-center",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-4 h-4" })
        },
        "moon"
      ) })
    }
  );
}
function Login() {
  const { isAuthenticated } = useAuth();
  const { login, isLoading, error } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [rememberMe, setRememberMe] = reactExports.useState(false);
  const [touched, setTouched] = reactExports.useState({ email: false, password: false });
  reactExports.useEffect(() => {
    if (isAuthenticated) void router.navigate({ to: "/" });
  }, [isAuthenticated, router]);
  const emailErr = touched.email && !email.trim() ? "Email is required" : touched.email && !/\S+@\S+\.\S+/.test(email) ? "Enter a valid email" : null;
  const passwordErr = touched.password && !password ? "Password is required" : null;
  async function handleSubmit(e) {
    e.preventDefault();
    setTouched({ email: true, password: true });
    if (!email || !password) return;
    const ok = await login(email, password);
    if (ok) void router.navigate({ to: "/" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen w-full flex flex-col bg-background overflow-hidden relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "absolute inset-0 opacity-[0.04] pointer-events-none",
        style: {
          backgroundImage: "linear-gradient(to right, oklch(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "48px 48px"
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between px-6 h-14 border-b border-border/40 bg-card/80 backdrop-blur-md flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold tracking-wider text-foreground", children: "FIBERNMS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-[9px] font-mono text-primary tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-2.5 h-2.5" }),
          "ENTERPRISE"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-4xl grid lg:grid-cols-2 gap-10 items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.45, ease: "easeOut" },
          className: "hidden lg:flex flex-col gap-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1 h-8 rounded-full bg-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] tracking-[0.3em] text-primary uppercase", children: "Global NOC Platform" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-2xl font-semibold text-foreground leading-tight mb-3", children: [
                "OPTICAL FIBER NETWORK",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "MANAGEMENT SYSTEM"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body leading-relaxed max-w-sm", children: "Enterprise-grade carrier management for 100K+ optical nodes across multi-region deployments. Real-time monitoring, predictive fault intelligence, and SLA assurance." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.35, delay: 0.15 + i * 0.07 },
                className: "glass-card rounded-xl p-4 flex items-center gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: "w-4.5 h-4.5 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-metric text-foreground font-mono font-semibold text-sm", children: s.value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-muted-foreground mt-0.5 tracking-wide", children: s.label })
                  ] })
                ]
              },
              s.label
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 rounded-xl border border-border/40 bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground leading-relaxed", children: "Enterprise-grade TLS 1.3 encryption · RBAC + ABAC · SOC 2 Type II compliant" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: "easeOut" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-100 animate-pulse" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-lg font-semibold text-center text-foreground tracking-wide mb-1", children: "NOC OPERATOR ACCESS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-body mb-6", children: "Sign in with your credentials to access the network operations center." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5 px-3 py-2.5 rounded-lg border border-primary/25 bg-primary/8 flex items-start gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-primary/80 leading-relaxed", children: [
              "Demo:",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "admin@fibernms.com" }),
              " /",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "Admin@123" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", noValidate: true, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    className: "block text-[11px] font-mono text-muted-foreground mb-1.5 tracking-wide",
                    htmlFor: "login-email",
                    children: "WORK EMAIL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "login-email",
                    type: "email",
                    autoComplete: "email",
                    value: email,
                    onChange: (e) => setEmail(e.target.value),
                    onBlur: () => setTouched((t) => ({ ...t, email: true })),
                    placeholder: "operator@company.com",
                    "data-ocid": "login-email",
                    className: cn(
                      "w-full px-3.5 py-2.5 rounded-lg text-sm bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none transition-smooth",
                      emailErr ? "border-destructive/60 focus:border-destructive" : "border-border/50 focus:border-primary/60"
                    )
                  }
                ),
                emailErr && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] font-mono text-destructive", children: emailErr })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      className: "block text-[11px] font-mono text-muted-foreground tracking-wide",
                      htmlFor: "login-password",
                      children: "PASSWORD"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-[10px] font-mono text-primary/70 hover:text-primary transition-smooth",
                      tabIndex: -1,
                      "data-ocid": "login-forgot-password",
                      children: "Forgot password?"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      id: "login-password",
                      type: showPassword ? "text" : "password",
                      autoComplete: "current-password",
                      value: password,
                      onChange: (e) => setPassword(e.target.value),
                      onBlur: () => setTouched((t) => ({ ...t, password: true })),
                      placeholder: "••••••••",
                      "data-ocid": "login-password",
                      className: cn(
                        "w-full pl-3.5 pr-10 py-2.5 rounded-lg text-sm bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none transition-smooth",
                        passwordErr ? "border-destructive/60 focus:border-destructive" : "border-border/50 focus:border-primary/60"
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowPassword((v) => !v),
                      "aria-label": showPassword ? "Hide password" : "Show password",
                      className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground transition-smooth",
                      children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                    }
                  )
                ] }),
                passwordErr && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] font-mono text-destructive", children: passwordErr })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  className: "flex items-center gap-2.5 cursor-pointer group",
                  "data-ocid": "login-remember-me",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "checkbox",
                        checked: rememberMe,
                        onChange: (e) => setRememberMe(e.target.checked),
                        className: "w-3.5 h-3.5 rounded border-border/50 accent-primary"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] font-mono text-muted-foreground group-hover:text-foreground transition-smooth", children: "Keep me signed in" })
                  ]
                }
              ),
              error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: -4 },
                  animate: { opacity: 1, y: 0 },
                  className: "px-3.5 py-2.5 rounded-lg border border-destructive/40 bg-destructive/10 text-[11px] font-mono text-destructive",
                  "data-ocid": "login-error",
                  children: error
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "submit",
                  disabled: isLoading,
                  "data-ocid": "login-submit",
                  className: cn(
                    "w-full flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl font-display text-sm tracking-widest transition-smooth border mt-2",
                    "bg-primary/15 hover:bg-primary/25 border-primary/40 hover:border-primary/70 text-primary noc-glow",
                    "disabled:opacity-60 disabled:cursor-not-allowed"
                  ),
                  children: [
                    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                    isLoading ? "AUTHENTICATING…" : "SIGN IN TO NOC"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/40" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/60 tracking-widest", children: "SECURE AUTH" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/40" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
              "New to FiberNMS?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "a",
                {
                  href: "/register",
                  onClick: (e) => {
                    e.preventDefault();
                    void router.navigate({ to: "/register" });
                  },
                  "data-ocid": "login-register-link",
                  className: "text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth",
                  children: "Request enterprise access"
                }
              )
            ] })
          ] })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative z-10 flex items-center justify-between px-6 py-3 border-t border-border/30 bg-card/50 backdrop-blur-sm flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { className: "w-3 h-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GLOBAL NOC SYSTEM v3.2.1" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-mono text-muted-foreground/50", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        ".",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-muted-foreground transition-smooth",
            children: "Built with caffeine.ai"
          }
        )
      ] })
    ] })
  ] });
}
export {
  Login as default
};
