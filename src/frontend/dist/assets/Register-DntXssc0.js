import { ar as useAuth, as as useAuthStore, ae as useRouter, r as reactExports, ax as Plan, j as jsxRuntimeExports, v as Radio, e as cn, m as motion, an as User, aj as Shield, Z as Zap, n as ChevronRight, au as z, A as AnimatePresence, av as Sun, aw as Moon } from "./index-BuH20gNs.js";
import { W as Wifi } from "./wifi-D3dQo2O3.js";
import { C as CircleCheck } from "./circle-check-CkO1g3Ux.js";
import { E as EyeOff } from "./eye-off-0BCBEYPY.js";
import { E as Eye } from "./eye-4GRSPQQa.js";
import { L as LoaderCircle } from "./loader-circle-_XjoRtYa.js";
import { E as Earth } from "./earth-CIxXh85S.js";
const INDUSTRIES = [
  "Telecom",
  "ISP",
  "Cable",
  "Infrastructure",
  "Government",
  "Other"
];
const COMPANY_SIZES = [
  "1–10",
  "11–50",
  "51–200",
  "201–1,000",
  "1,000+"
];
const DEPARTMENTS = [
  "NOC",
  "Network Operations",
  "IT",
  "Engineering",
  "Management",
  "Other"
];
const DEVICE_RANGES = [
  "<100",
  "100–1,000",
  "1,001–10,000",
  "10,001–100,000",
  "100,000+"
];
const INTEGRATIONS = [
  "Zabbix",
  "Splunk",
  "Netconf",
  "SNMP",
  "Custom API"
];
const PLAN_CARDS = [
  {
    plan: Plan.BASIC,
    label: "BASIC",
    price: "$49/mo",
    color: "emerald",
    features: [
      "Up to 1,000 devices",
      "GIS map dashboard",
      "Basic monitoring",
      "Email alerts"
    ]
  },
  {
    plan: Plan.PROFESSIONAL,
    label: "PROFESSIONAL",
    price: "$199/mo",
    color: "primary",
    features: [
      "Up to 10,000 devices",
      "Full GIS tools",
      "30-day history",
      "Advanced alerting"
    ]
  },
  {
    plan: Plan.ENTERPRISE,
    label: "ENTERPRISE",
    price: "$799/mo",
    color: "violet",
    badge: "Most Popular",
    features: [
      "Up to 100,000 devices",
      "Real-time monitoring",
      "SLA dashboard",
      "AI insights (basic)"
    ]
  },
  {
    plan: Plan.ULTRA,
    label: "ULTRA",
    price: "Custom",
    color: "amber",
    badge: "Carrier Grade",
    features: [
      "Unlimited devices (1M+)",
      "Predictive fault AI",
      "Digital twin",
      "White-labeling"
    ]
  }
];
const PLAN_COLOR_MAP = {
  emerald: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-400"
  },
  primary: {
    border: "border-primary/40",
    bg: "bg-primary/10",
    text: "text-primary",
    badge: "bg-primary/20 text-primary"
  },
  violet: {
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    badge: "bg-violet-500/20 text-violet-400"
  },
  amber: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-400"
  }
};
const STEPS = [
  "Account",
  "Organization",
  "Network",
  "Plan",
  "Security"
];
function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ["", "Weak", "Fair", "Strong", "Very Strong"];
  const colors = [
    "",
    "text-red-400",
    "text-amber-400",
    "text-primary",
    "text-emerald-400"
  ];
  return { score, label: labels[score] ?? "", color: colors[score] ?? "" };
}
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
function Field({
  label,
  error,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "block text-[11px] font-mono text-muted-foreground mb-1.5 tracking-wide", children: label }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-[10px] font-mono text-destructive", children: error })
  ] });
}
const inputCls = (err) => cn(
  "w-full px-3.5 py-2.5 rounded-lg text-sm bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none transition-smooth",
  err ? "border-destructive/60 focus:border-destructive" : "border-border/50 focus:border-primary/60"
);
const selectCls = inputCls();
const INITIAL = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  industry: "",
  companySize: "",
  jobTitle: "",
  department: "",
  country: "",
  coverageArea: "",
  estimatedDevices: "",
  currentNMS: "",
  integrations: [],
  plan: Plan.ENTERPRISE,
  password: "",
  confirmPassword: "",
  termsAccepted: false,
  privacyAccepted: false
};
function Register() {
  const { isAuthenticated } = useAuth();
  const { register, isLoading, error } = useAuthStore();
  const router = useRouter();
  const [step, setStep] = reactExports.useState("Account");
  const [form, setForm] = reactExports.useState(INITIAL);
  const [showPw, setShowPw] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [stepErrors, setStepErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (isAuthenticated) void router.navigate({ to: "/" });
  }, [isAuthenticated, router]);
  const stepIndex = STEPS.indexOf(step);
  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setStepErrors((e) => {
      const copy = { ...e };
      delete copy[key];
      return copy;
    });
  }
  function toggleIntegration(val) {
    setForm((f) => ({
      ...f,
      integrations: f.integrations.includes(val) ? f.integrations.filter((i) => i !== val) : [...f.integrations, val]
    }));
  }
  function validateStep() {
    const errs = {};
    if (step === "Account") {
      if (!form.firstName.trim()) errs.firstName = "Required";
      if (!form.lastName.trim()) errs.lastName = "Required";
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email))
        errs.email = "Valid email required";
    }
    if (step === "Organization") {
      if (!form.company.trim()) errs.company = "Required";
      if (!form.industry) errs.industry = "Select an industry";
      if (!form.companySize) errs.companySize = "Select company size";
    }
    if (step === "Network") {
      if (!form.estimatedDevices) errs.estimatedDevices = "Select device range";
    }
    if (step === "Security") {
      const strength = getPasswordStrength(form.password);
      if (form.password.length < 8)
        errs.password = "At least 8 characters required";
      else if (strength.score < 2) errs.password = "Password is too weak";
      if (form.password !== form.confirmPassword)
        errs.confirmPassword = "Passwords do not match";
      if (!form.termsAccepted)
        errs.termsAccepted = "You must accept the Terms of Service";
      if (!form.privacyAccepted)
        errs.privacyAccepted = "You must accept the Privacy Policy";
    }
    setStepErrors(errs);
    return Object.keys(errs).length === 0;
  }
  function handleNext() {
    if (!validateStep()) return;
    const nextIdx = stepIndex + 1;
    if (nextIdx < STEPS.length) setStep(STEPS[nextIdx]);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateStep()) return;
    const data = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      phone: form.phone,
      company: form.company,
      industry: form.industry,
      companySize: form.companySize,
      jobTitle: form.jobTitle,
      department: form.department,
      country: form.country,
      coverageArea: form.coverageArea,
      estimatedDevices: form.estimatedDevices,
      currentNMS: form.currentNMS,
      integrations: form.integrations,
      plan: form.plan,
      password: form.password
    };
    const ok = await register(data);
    if (ok) void router.navigate({ to: "/" });
  }
  const pwStrength = getPasswordStrength(form.password);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/4 blur-3xl pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "relative z-10 flex items-center justify-between px-6 h-14 border-b border-border/40 bg-card/80 backdrop-blur-md flex-shrink-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center noc-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm font-semibold tracking-wider text-foreground", children: "FIBERNMS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:inline-flex items-center gap-1 ml-2 px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-[9px] font-mono text-primary tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-2.5 h-2.5" }),
          "ENTERPRISE REGISTRATION"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "relative z-10 flex-1 px-4 py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between mb-8", children: STEPS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center flex-1 last:flex-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => i < stepIndex && setStep(s),
            className: cn(
              "flex flex-col items-center gap-1 group",
              i < stepIndex ? "cursor-pointer" : "cursor-default"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn(
                    "w-8 h-8 rounded-full flex items-center justify-center border text-xs font-mono font-semibold transition-smooth",
                    i < stepIndex ? "bg-primary/20 border-primary/50 text-primary" : i === stepIndex ? "bg-primary border-primary text-primary-foreground" : "bg-muted/40 border-border/40 text-muted-foreground"
                  ),
                  children: i < stepIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : i + 1
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "hidden sm:block text-[9px] font-mono tracking-wide transition-smooth",
                    i === stepIndex ? "text-primary" : "text-muted-foreground"
                  ),
                  children: s.toUpperCase()
                }
              )
            ]
          }
        ),
        i < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex-1 h-px mx-2 transition-smooth",
              i < stepIndex ? "bg-primary/40" : "bg-border/40"
            )
          }
        )
      ] }, s)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, x: 20 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -20 },
          transition: { duration: 0.25, ease: "easeOut" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: step === "Security" ? handleSubmit : (e) => {
                e.preventDefault();
                handleNext();
              },
              noValidate: true,
              children: [
                step === "Account" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: User,
                      title: "Personal Details",
                      desc: "Tell us about you — the primary NOC operator for this account."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "FIRST NAME *", error: stepErrors.firstName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: form.firstName,
                        onChange: (e) => set("firstName", e.target.value),
                        placeholder: "Alex",
                        className: inputCls(stepErrors.firstName),
                        "data-ocid": "reg-first-name"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "LAST NAME *", error: stepErrors.lastName, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: form.lastName,
                        onChange: (e) => set("lastName", e.target.value),
                        placeholder: "Johnson",
                        className: inputCls(stepErrors.lastName),
                        "data-ocid": "reg-last-name"
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "WORK EMAIL *", error: stepErrors.email, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "email",
                      value: form.email,
                      onChange: (e) => set("email", e.target.value),
                      placeholder: "alex@telecom.com",
                      className: inputCls(stepErrors.email),
                      "data-ocid": "reg-email"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "PHONE NUMBER", error: stepErrors.phone, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "tel",
                      value: form.phone,
                      onChange: (e) => set("phone", e.target.value),
                      placeholder: "+1 (555) 000-0000",
                      className: inputCls(),
                      "data-ocid": "reg-phone"
                    }
                  ) })
                ] }),
                step === "Organization" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: Shield,
                      title: "Organization Details",
                      desc: "Help us understand your organization's scope and structure."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "COMPANY NAME *", error: stepErrors.company, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: form.company,
                      onChange: (e) => set("company", e.target.value),
                      placeholder: "TelecomCo Inc.",
                      className: inputCls(stepErrors.company),
                      "data-ocid": "reg-company"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "INDUSTRY *", error: stepErrors.industry, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: form.industry,
                        onChange: (e) => set("industry", e.target.value),
                        className: selectCls,
                        "data-ocid": "reg-industry",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select industry…" }),
                          INDUSTRIES.map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: i, children: i }, i))
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Field,
                      {
                        label: "COMPANY SIZE *",
                        error: stepErrors.companySize,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "select",
                          {
                            value: form.companySize,
                            onChange: (e) => set("companySize", e.target.value),
                            className: selectCls,
                            "data-ocid": "reg-company-size",
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select size…" }),
                              COMPANY_SIZES.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: s, children: [
                                s,
                                " employees"
                              ] }, s))
                            ]
                          }
                        )
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "JOB TITLE", error: stepErrors.jobTitle, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "input",
                      {
                        type: "text",
                        value: form.jobTitle,
                        onChange: (e) => set("jobTitle", e.target.value),
                        placeholder: "NOC Manager",
                        className: inputCls(),
                        "data-ocid": "reg-job-title"
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "DEPARTMENT", error: stepErrors.department, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "select",
                      {
                        value: form.department,
                        onChange: (e) => set("department", e.target.value),
                        className: selectCls,
                        "data-ocid": "reg-department",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select department…" }),
                          DEPARTMENTS.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: d, children: d }, d))
                        ]
                      }
                    ) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "COUNTRY / REGION", error: stepErrors.country, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      type: "text",
                      value: form.country,
                      onChange: (e) => set("country", e.target.value),
                      placeholder: "United States",
                      className: inputCls(),
                      "data-ocid": "reg-country"
                    }
                  ) })
                ] }),
                step === "Network" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: Zap,
                      title: "Network Planning",
                      desc: "Tell us about your current network scale and integration requirements."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      label: "PRIMARY COVERAGE AREA",
                      error: stepErrors.coverageArea,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.coverageArea,
                          onChange: (e) => set("coverageArea", e.target.value),
                          placeholder: "Northeast US / Europe / APAC",
                          className: inputCls(),
                          "data-ocid": "reg-coverage"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      label: "ESTIMATED DEVICES TO MANAGE *",
                      error: stepErrors.estimatedDevices,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          value: form.estimatedDevices,
                          onChange: (e) => set("estimatedDevices", e.target.value),
                          className: selectCls,
                          "data-ocid": "reg-devices",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select range…" }),
                            DEVICE_RANGES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: d, children: [
                              d,
                              " devices"
                            ] }, d))
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      label: "CURRENT NMS / OSS SYSTEMS",
                      error: stepErrors.currentNMS,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "text",
                          value: form.currentNMS,
                          onChange: (e) => set("currentNMS", e.target.value),
                          placeholder: "Zabbix, custom tools, none…",
                          className: inputCls(),
                          "data-ocid": "reg-current-nms"
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] font-mono text-muted-foreground mb-2.5 tracking-wide", children: "INTEGRATION NEEDS" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: INTEGRATIONS.map((intg) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => toggleIntegration(intg),
                        "data-ocid": `reg-intg-${intg.toLowerCase()}`,
                        className: cn(
                          "px-3 py-1.5 rounded-lg border text-xs font-mono transition-smooth",
                          form.integrations.includes(intg) ? "border-primary/60 bg-primary/15 text-primary" : "border-border/50 bg-muted/30 text-muted-foreground hover:border-border hover:text-foreground"
                        ),
                        children: intg
                      },
                      intg
                    )) })
                  ] })
                ] }),
                step === "Plan" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: CircleCheck,
                      title: "Select Your Plan",
                      desc: "Choose the tier that matches your network scale. You can upgrade at any time."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid sm:grid-cols-2 gap-3", children: PLAN_CARDS.map((p) => {
                    const colors = PLAN_COLOR_MAP[p.color];
                    const selected = form.plan === p.plan;
                    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => set("plan", p.plan),
                        "data-ocid": `reg-plan-${p.plan.toLowerCase()}`,
                        className: cn(
                          "relative text-left rounded-xl border p-4 transition-smooth",
                          selected ? cn(
                            colors.border,
                            colors.bg,
                            "ring-1",
                            colors.border
                          ) : "border-border/40 bg-muted/20 hover:border-border/70"
                        ),
                        children: [
                          p.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "span",
                            {
                              className: cn(
                                "absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wide",
                                colors.badge
                              ),
                              children: p.badge
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: cn(
                                  "font-display text-xs tracking-widest font-semibold",
                                  selected ? colors.text : "text-foreground"
                                ),
                                children: p.label
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "span",
                              {
                                className: cn(
                                  "font-mono text-xs font-semibold",
                                  selected ? colors.text : "text-muted-foreground"
                                ),
                                children: p.price
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1", children: p.features.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "li",
                            {
                              className: "flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  CircleCheck,
                                  {
                                    className: cn(
                                      "w-3 h-3 flex-shrink-0",
                                      selected ? colors.text : "text-muted-foreground/50"
                                    )
                                  }
                                ),
                                f
                              ]
                            },
                            f
                          )) })
                        ]
                      },
                      p.plan
                    );
                  }) })
                ] }),
                step === "Security" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SectionHeader,
                    {
                      icon: Shield,
                      title: "Set Your Password",
                      desc: "Create a strong password to secure your NOC operator account."
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { label: "PASSWORD *", error: stepErrors.password, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: showPw ? "text" : "password",
                          value: form.password,
                          onChange: (e) => set("password", e.target.value),
                          placeholder: "Create a strong password",
                          className: cn(inputCls(stepErrors.password), "pr-10"),
                          "data-ocid": "reg-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPw((v) => !v),
                          "aria-label": "Toggle password",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground",
                          children: showPw ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                        }
                      )
                    ] }),
                    form.password && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 flex-1", children: [1, 2, 3, 4].map((bar) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: cn(
                              "h-1 flex-1 rounded-full transition-smooth",
                              bar <= pwStrength.score ? pwStrength.score === 1 ? "bg-red-400" : pwStrength.score === 2 ? "bg-amber-400" : pwStrength.score === 3 ? "bg-primary" : "bg-emerald-400" : "bg-border/40"
                            )
                          },
                          bar
                        )) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "span",
                          {
                            className: cn(
                              "text-[10px] font-mono",
                              pwStrength.color
                            ),
                            children: pwStrength.label
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid grid-cols-2 gap-x-4 gap-y-0.5", children: [
                        {
                          ok: form.password.length >= 8,
                          label: "8+ characters"
                        },
                        {
                          ok: /[A-Z]/.test(form.password),
                          label: "1 uppercase letter"
                        },
                        {
                          ok: /[0-9]/.test(form.password),
                          label: "1 number"
                        },
                        {
                          ok: /[^A-Za-z0-9]/.test(form.password),
                          label: "1 special character"
                        }
                      ].map((req) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: cn(
                            "flex items-center gap-1 text-[10px] font-mono transition-smooth",
                            req.ok ? "text-emerald-400" : "text-muted-foreground/60"
                          ),
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 flex-shrink-0" }),
                            req.label
                          ]
                        },
                        req.label
                      )) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      label: "CONFIRM PASSWORD *",
                      error: stepErrors.confirmPassword,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            type: showConfirm ? "text" : "password",
                            value: form.confirmPassword,
                            onChange: (e) => set("confirmPassword", e.target.value),
                            placeholder: "Confirm your password",
                            className: cn(
                              inputCls(stepErrors.confirmPassword),
                              "pr-10"
                            ),
                            "data-ocid": "reg-confirm-password"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowConfirm((v) => !v),
                            "aria-label": "Toggle confirm",
                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground",
                            children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                          }
                        )
                      ] })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "flex items-start gap-2.5 cursor-pointer group",
                        "data-ocid": "reg-terms",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "checkbox",
                              checked: form.termsAccepted,
                              onChange: (e) => set("termsAccepted", e.target.checked),
                              className: "mt-0.5 w-3.5 h-3.5 rounded border-border/50 accent-primary flex-shrink-0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground leading-relaxed group-hover:text-foreground transition-smooth", children: [
                            "I agree to the",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary underline underline-offset-2 cursor-pointer", children: "Terms of Service" }),
                            " ",
                            "and acknowledge that all system activity is logged and audited."
                          ] })
                        ]
                      }
                    ),
                    stepErrors.termsAccepted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-destructive", children: stepErrors.termsAccepted }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        className: "flex items-start gap-2.5 cursor-pointer group",
                        "data-ocid": "reg-privacy",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "checkbox",
                              checked: form.privacyAccepted,
                              onChange: (e) => set("privacyAccepted", e.target.checked),
                              className: "mt-0.5 w-3.5 h-3.5 rounded border-border/50 accent-primary flex-shrink-0"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] font-mono text-muted-foreground leading-relaxed group-hover:text-foreground transition-smooth", children: [
                            "I have read and accept the",
                            " ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary underline underline-offset-2 cursor-pointer", children: "Privacy Policy" }),
                            "."
                          ] })
                        ]
                      }
                    ),
                    stepErrors.privacyAccepted && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-mono text-destructive", children: stepErrors.privacyAccepted })
                  ] })
                ] }),
                error && step === "Security" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    initial: { opacity: 0, y: -4 },
                    animate: { opacity: 1, y: 0 },
                    className: "mt-4 px-3.5 py-2.5 rounded-lg border border-destructive/40 bg-destructive/10 text-[11px] font-mono text-destructive",
                    "data-ocid": "reg-error",
                    children: error
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-8 pt-5 border-t border-border/30", children: [
                  stepIndex > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setStep(STEPS[stepIndex - 1]),
                      className: "px-4 py-2 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/40 hover:border-border/70 transition-smooth",
                      children: "← Back"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: "/login",
                      onClick: (e) => {
                        e.preventDefault();
                        void router.navigate({ to: "/login" });
                      },
                      className: "text-xs font-mono text-muted-foreground hover:text-foreground transition-smooth",
                      "data-ocid": "reg-login-link",
                      children: "Already have an account? Sign in"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "submit",
                      disabled: isLoading,
                      "data-ocid": step === "Security" ? "reg-submit" : "reg-next",
                      className: cn(
                        "flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-sm tracking-widest transition-smooth border",
                        "bg-primary/15 hover:bg-primary/25 border-primary/40 hover:border-primary/70 text-primary noc-glow",
                        "disabled:opacity-60 disabled:cursor-not-allowed"
                      ),
                      children: [
                        isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : step === "Security" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" }),
                        isLoading ? "CREATING ACCOUNT…" : step === "Security" ? "CREATE ACCOUNT" : "NEXT STEP"
                      ]
                    }
                  )
                ] })
              ]
            }
          ) })
        },
        step
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
function SectionHeader({
  icon: Icon,
  title,
  desc
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4 text-primary" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold tracking-widest text-foreground uppercase", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-body mt-0.5", children: desc })
    ] })
  ] });
}
export {
  Register as default
};
