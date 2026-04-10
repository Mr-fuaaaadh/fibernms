import { c as createLucideIcon, ai as useAuth, a2 as useRouter, r as reactExports, j as jsxRuntimeExports, k as Radio, m as motion, am as ShieldCheck, a7 as Zap, b as cn, aj as z, A as AnimatePresence, ak as Sun, al as Moon } from "./index-DluTrB5k.js";
import { W as Wifi } from "./wifi-CfF65Acg.js";
import { C as CircleCheck } from "./circle-check-CDCUwaRH.js";
import { L as LoaderCircle } from "./loader-circle-BDHRWl05.js";
import { F as Fingerprint, E as Earth } from "./fingerprint-DG3224cM.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Decentralized Identity",
    desc: "No passwords. Your identity is secured on the Internet Computer blockchain."
  },
  {
    icon: Zap,
    title: "Instant Access",
    desc: "One tap to authenticate — no email verification, no approval queue."
  },
  {
    icon: CircleCheck,
    title: "Full NOC Privileges",
    desc: "Access all 12 operational modules from day one with Admin-level visibility."
  }
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
      "data-ocid": "register-theme-toggle",
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
function Register() {
  const { isAuthenticated, isInitializing, login } = useAuth();
  const router = useRouter();
  const [isRegistering, setIsRegistering] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!isInitializing && isAuthenticated) {
      router.navigate({ to: "/" });
    }
  }, [isAuthenticated, isInitializing, router]);
  function handleRegister() {
    setIsRegistering(true);
    login();
    setTimeout(() => setIsRegistering(false), 1e4);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-accent/5 blur-3xl pointer-events-none" }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-1 flex items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-2xl grid md:grid-cols-2 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.4, ease: "easeOut" },
          className: "hidden md:flex flex-col justify-center gap-6 pt-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-base tracking-widest text-foreground uppercase mb-1", children: "NOC OPERATOR PORTAL" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body leading-relaxed", children: "Join the global fiber network operations center. Gain real-time visibility into 48K+ optical nodes across 12 regions." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: { duration: 0.35, delay: 0.1 + i * 0.08 },
                className: "flex items-start gap-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(f.icon, { className: "w-4 h-4 text-primary" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-display text-foreground tracking-wide", children: f.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed mt-0.5", children: f.desc })
                  ] })
                ]
              },
              f.title
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: "easeOut" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center noc-glow-active", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-7 h-7 text-accent" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary border-2 border-card flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-primary-foreground" }) })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl font-semibold text-center text-foreground tracking-wide mb-1", children: "CREATE NOC ACCOUNT" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground font-body mb-8", children: "Register with Internet Identity — no username or password required." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: handleRegister,
                  disabled: isRegistering || isInitializing,
                  "data-ocid": "register-ii-button",
                  className: cn(
                    "w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl font-display text-sm tracking-widest transition-smooth border",
                    "bg-accent/15 hover:bg-accent/25 border-accent/40 hover:border-accent/70 text-accent noc-glow-active",
                    "disabled:opacity-60 disabled:cursor-not-allowed"
                  ),
                  children: [
                    isRegistering || isInitializing ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Fingerprint, { className: "w-4 h-4" }),
                    isInitializing ? "INITIALIZING…" : isRegistering ? "CREATING IDENTITY…" : "REGISTER WITH INTERNET IDENTITY"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 my-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono text-muted-foreground/60 tracking-widest", children: "SECURE AUTH" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/40" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
                "Already have an account?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: "/login",
                    onClick: (e) => {
                      e.preventDefault();
                      router.navigate({ to: "/login" });
                    },
                    "data-ocid": "register-login-link",
                    className: "text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth",
                    children: "Sign in"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-[10px] font-mono text-muted-foreground/50 mt-4 leading-relaxed", children: "By registering, you accept the NOC operator terms of service and acknowledge that system access is logged and audited." })
          ]
        }
      )
    ] }) }),
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
  Register as default
};
