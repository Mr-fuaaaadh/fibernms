import { ai as useAuth, a2 as useRouter, r as reactExports, j as jsxRuntimeExports, k as Radio, m as motion, b as cn, aj as z, A as AnimatePresence, ak as Sun, al as Moon } from "./index-DluTrB5k.js";
import { W as Wifi } from "./wifi-CfF65Acg.js";
import { L as Lock } from "./lock-B1MUlvau.js";
import { L as LoaderCircle } from "./loader-circle-BDHRWl05.js";
import { F as Fingerprint, E as Earth } from "./fingerprint-DG3224cM.js";
const STATS = [
  { label: "Nodes Online", value: "48,291" },
  { label: "Signal Uptime", value: "99.97%" },
  { label: "Regions Active", value: "12" },
  { label: "Alerts Resolved", value: "1,042" }
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
  const { isAuthenticated, isInitializing, login } = useAuth();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, router]);
  function handleLogin() {
    setIsLoggingIn(true);
    login();
    setTimeout(() => setIsLoggingIn(false), 1e4);
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between px-6 h-14 border-b border-border/40 bg-card/80 backdrop-blur-md", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, ease: "easeOut" },
        className: "w-full max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-7 h-7 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-green-100 animate-pulse" }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-center text-foreground tracking-wide mb-1", children: "NOC OPERATOR ACCESS" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-body mb-8", children: "Authenticate with Internet Identity to access the global network operations center." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleLogin,
                disabled: isLoggingIn || isInitializing,
                "data-ocid": "login-ii-button",
                className: cn(
                  "w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-display text-sm tracking-widest transition-smooth border",
                  "bg-primary/15 hover:bg-primary/25 border-primary/40 hover:border-primary/70 text-primary noc-glow",
                  "disabled:opacity-60 disabled:cursor-not-allowed"
                ),
                children: [
                  isLoggingIn || isInitializing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-4 h-4" }),
                  isInitializing ? "INITIALIZING…" : isLoggingIn ? "AUTHENTICATING…" : "SIGN IN WITH INTERNET IDENTITY"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
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
                    router.navigate({ to: "/register" });
                  },
                  "data-ocid": "login-register-link",
                  className: "text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth",
                  children: "Create an account"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 0.4, delay: 0.25 },
              className: "grid grid-cols-4 gap-3 mt-5",
              children: STATS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-card rounded-xl p-3 text-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-metric text-primary text-sm", children: s.value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] font-mono text-muted-foreground/70 mt-0.5 tracking-wide leading-tight", children: s.label })
                  ]
                },
                s.label
              ))
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "relative z-10 flex items-center justify-between px-6 py-3 border-t border-border/30 bg-card/50 backdrop-blur-sm", children: [
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
