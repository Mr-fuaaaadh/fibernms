import { useAuth } from "@/hooks/useAuth";
import type { RegisterData } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { Plan } from "@/types/subscription";
import { useRouter } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronRight,
  Eye,
  EyeOff,
  Globe2,
  Loader2,
  Moon,
  Radio,
  Shield,
  Sun,
  User,
  Wifi,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  "Telecom",
  "ISP",
  "Cable",
  "Infrastructure",
  "Government",
  "Other",
] as const;
const COMPANY_SIZES = [
  "1–10",
  "11–50",
  "51–200",
  "201–1,000",
  "1,000+",
] as const;
const DEPARTMENTS = [
  "NOC",
  "Network Operations",
  "IT",
  "Engineering",
  "Management",
  "Other",
] as const;
const DEVICE_RANGES = [
  "<100",
  "100–1,000",
  "1,001–10,000",
  "10,001–100,000",
  "100,000+",
] as const;
const INTEGRATIONS = [
  "Zabbix",
  "Splunk",
  "Netconf",
  "SNMP",
  "Custom API",
] as const;

const PLAN_CARDS: {
  plan: Plan;
  label: string;
  price: string;
  color: string;
  badge?: string;
  features: string[];
}[] = [
  {
    plan: Plan.BASIC,
    label: "BASIC",
    price: "$49/mo",
    color: "emerald",
    features: [
      "Up to 1,000 devices",
      "GIS map dashboard",
      "Basic monitoring",
      "Email alerts",
    ],
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
      "Advanced alerting",
    ],
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
      "AI insights (basic)",
    ],
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
      "White-labeling",
    ],
  },
];

const PLAN_COLOR_MAP: Record<
  string,
  { border: string; bg: string; text: string; badge: string }
> = {
  emerald: {
    border: "border-emerald-500/40",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    badge: "bg-emerald-500/20 text-emerald-400",
  },
  primary: {
    border: "border-primary/40",
    bg: "bg-primary/10",
    text: "text-primary",
    badge: "bg-primary/20 text-primary",
  },
  violet: {
    border: "border-violet-500/40",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    badge: "bg-violet-500/20 text-violet-400",
  },
  amber: {
    border: "border-amber-500/40",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-400",
  },
};

const STEPS = [
  "Account",
  "Organization",
  "Network",
  "Plan",
  "Security",
] as const;
type Step = (typeof STEPS)[number];

// ─── Password strength ────────────────────────────────────────────────────────

function getPasswordStrength(pw: string): {
  score: number;
  label: string;
  color: string;
} {
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
    "text-emerald-400",
  ];
  return { score, label: labels[score] ?? "", color: colors[score] ?? "" };
}

// ─── Theme Toggle ─────────────────────────────────────────────────────────────

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

// ─── Field components ─────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: { label: string; error?: string | null; children: React.ReactNode }) {
  return (
    <div>
      <p className="block text-[11px] font-mono text-muted-foreground mb-1.5 tracking-wide">
        {label}
      </p>
      {children}
      {error && (
        <p className="mt-1 text-[10px] font-mono text-destructive">{error}</p>
      )}
    </div>
  );
}

const inputCls = (err?: string | null) =>
  cn(
    "w-full px-3.5 py-2.5 rounded-lg text-sm bg-muted/50 border text-foreground placeholder:text-muted-foreground/50 font-body focus:outline-none transition-smooth",
    err
      ? "border-destructive/60 focus:border-destructive"
      : "border-border/50 focus:border-primary/60",
  );

const selectCls = inputCls();

// ─── Main Component ───────────────────────────────────────────────────────────

type FormData = Omit<RegisterData, "integrations"> & {
  integrations: string[];
  confirmPassword: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
};

const INITIAL: FormData = {
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
  privacyAccepted: false,
};

export default function Register() {
  const { isAuthenticated } = useAuth();
  const { register, isLoading, error } = useAuthStore();
  const router = useRouter();

  const [step, setStep] = useState<Step>("Account");
  const [form, setForm] = useState<FormData>(INITIAL);
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isAuthenticated) void router.navigate({ to: "/" });
  }, [isAuthenticated, router]);

  const stepIndex = STEPS.indexOf(step);

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setStepErrors((e) => {
      const copy = { ...e };
      delete copy[key];
      return copy;
    });
  }

  function toggleIntegration(val: string) {
    setForm((f) => ({
      ...f,
      integrations: f.integrations.includes(val)
        ? f.integrations.filter((i) => i !== val)
        : [...f.integrations, val],
    }));
  }

  function validateStep(): boolean {
    const errs: Record<string, string> = {};
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep()) return;
    const data: RegisterData = {
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
      password: form.password,
    };
    const ok = await register(data);
    if (ok) void router.navigate({ to: "/" });
  }

  const pwStrength = getPasswordStrength(form.password);

  return (
    <div className="min-h-screen w-full flex flex-col bg-background overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, oklch(var(--primary)) 1px, transparent 1px), linear-gradient(to bottom, oklch(var(--primary)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/4 blur-3xl pointer-events-none" />

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
            ENTERPRISE REGISTRATION
          </span>
        </div>
        <ThemeToggle />
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 px-4 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <button
                  type="button"
                  onClick={() => i < stepIndex && setStep(s)}
                  className={cn(
                    "flex flex-col items-center gap-1 group",
                    i < stepIndex ? "cursor-pointer" : "cursor-default",
                  )}
                >
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border text-xs font-mono font-semibold transition-smooth",
                      i < stepIndex
                        ? "bg-primary/20 border-primary/50 text-primary"
                        : i === stepIndex
                          ? "bg-primary border-primary text-primary-foreground"
                          : "bg-muted/40 border-border/40 text-muted-foreground",
                    )}
                  >
                    {i < stepIndex ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      i + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "hidden sm:block text-[9px] font-mono tracking-wide transition-smooth",
                      i === stepIndex
                        ? "text-primary"
                        : "text-muted-foreground",
                    )}
                  >
                    {s.toUpperCase()}
                  </span>
                </button>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-px mx-2 transition-smooth",
                      i < stepIndex ? "bg-primary/40" : "bg-border/40",
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="glass-elevated rounded-2xl p-8 shadow-noc-elevated border border-border/50">
              <form
                onSubmit={
                  step === "Security"
                    ? handleSubmit
                    : (e) => {
                        e.preventDefault();
                        handleNext();
                      }
                }
                noValidate
              >
                {/* ── STEP 1: Account ─────────────────────────────────────── */}
                {step === "Account" && (
                  <div className="space-y-5">
                    <SectionHeader
                      icon={User}
                      title="Personal Details"
                      desc="Tell us about you — the primary NOC operator for this account."
                    />
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="FIRST NAME *" error={stepErrors.firstName}>
                        <input
                          type="text"
                          value={form.firstName}
                          onChange={(e) => set("firstName", e.target.value)}
                          placeholder="Alex"
                          className={inputCls(stepErrors.firstName)}
                          data-ocid="reg-first-name"
                        />
                      </Field>
                      <Field label="LAST NAME *" error={stepErrors.lastName}>
                        <input
                          type="text"
                          value={form.lastName}
                          onChange={(e) => set("lastName", e.target.value)}
                          placeholder="Johnson"
                          className={inputCls(stepErrors.lastName)}
                          data-ocid="reg-last-name"
                        />
                      </Field>
                    </div>
                    <Field label="WORK EMAIL *" error={stepErrors.email}>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="alex@telecom.com"
                        className={inputCls(stepErrors.email)}
                        data-ocid="reg-email"
                      />
                    </Field>
                    <Field label="PHONE NUMBER" error={stepErrors.phone}>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => set("phone", e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className={inputCls()}
                        data-ocid="reg-phone"
                      />
                    </Field>
                  </div>
                )}

                {/* ── STEP 2: Organization ────────────────────────────────── */}
                {step === "Organization" && (
                  <div className="space-y-5">
                    <SectionHeader
                      icon={Shield}
                      title="Organization Details"
                      desc="Help us understand your organization's scope and structure."
                    />
                    <Field label="COMPANY NAME *" error={stepErrors.company}>
                      <input
                        type="text"
                        value={form.company}
                        onChange={(e) => set("company", e.target.value)}
                        placeholder="TelecomCo Inc."
                        className={inputCls(stepErrors.company)}
                        data-ocid="reg-company"
                      />
                    </Field>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="INDUSTRY *" error={stepErrors.industry}>
                        <select
                          value={form.industry}
                          onChange={(e) => set("industry", e.target.value)}
                          className={selectCls}
                          data-ocid="reg-industry"
                        >
                          <option value="">Select industry…</option>
                          {INDUSTRIES.map((i) => (
                            <option key={i} value={i}>
                              {i}
                            </option>
                          ))}
                        </select>
                      </Field>
                      <Field
                        label="COMPANY SIZE *"
                        error={stepErrors.companySize}
                      >
                        <select
                          value={form.companySize}
                          onChange={(e) => set("companySize", e.target.value)}
                          className={selectCls}
                          data-ocid="reg-company-size"
                        >
                          <option value="">Select size…</option>
                          {COMPANY_SIZES.map((s) => (
                            <option key={s} value={s}>
                              {s} employees
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="JOB TITLE" error={stepErrors.jobTitle}>
                        <input
                          type="text"
                          value={form.jobTitle}
                          onChange={(e) => set("jobTitle", e.target.value)}
                          placeholder="NOC Manager"
                          className={inputCls()}
                          data-ocid="reg-job-title"
                        />
                      </Field>
                      <Field label="DEPARTMENT" error={stepErrors.department}>
                        <select
                          value={form.department}
                          onChange={(e) => set("department", e.target.value)}
                          className={selectCls}
                          data-ocid="reg-department"
                        >
                          <option value="">Select department…</option>
                          {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </Field>
                    </div>
                    <Field label="COUNTRY / REGION" error={stepErrors.country}>
                      <input
                        type="text"
                        value={form.country}
                        onChange={(e) => set("country", e.target.value)}
                        placeholder="United States"
                        className={inputCls()}
                        data-ocid="reg-country"
                      />
                    </Field>
                  </div>
                )}

                {/* ── STEP 3: Network ─────────────────────────────────────── */}
                {step === "Network" && (
                  <div className="space-y-5">
                    <SectionHeader
                      icon={Zap}
                      title="Network Planning"
                      desc="Tell us about your current network scale and integration requirements."
                    />
                    <Field
                      label="PRIMARY COVERAGE AREA"
                      error={stepErrors.coverageArea}
                    >
                      <input
                        type="text"
                        value={form.coverageArea}
                        onChange={(e) => set("coverageArea", e.target.value)}
                        placeholder="Northeast US / Europe / APAC"
                        className={inputCls()}
                        data-ocid="reg-coverage"
                      />
                    </Field>
                    <Field
                      label="ESTIMATED DEVICES TO MANAGE *"
                      error={stepErrors.estimatedDevices}
                    >
                      <select
                        value={form.estimatedDevices}
                        onChange={(e) =>
                          set("estimatedDevices", e.target.value)
                        }
                        className={selectCls}
                        data-ocid="reg-devices"
                      >
                        <option value="">Select range…</option>
                        {DEVICE_RANGES.map((d) => (
                          <option key={d} value={d}>
                            {d} devices
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field
                      label="CURRENT NMS / OSS SYSTEMS"
                      error={stepErrors.currentNMS}
                    >
                      <input
                        type="text"
                        value={form.currentNMS}
                        onChange={(e) => set("currentNMS", e.target.value)}
                        placeholder="Zabbix, custom tools, none…"
                        className={inputCls()}
                        data-ocid="reg-current-nms"
                      />
                    </Field>
                    <div>
                      <p className="text-[11px] font-mono text-muted-foreground mb-2.5 tracking-wide">
                        INTEGRATION NEEDS
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {INTEGRATIONS.map((intg) => (
                          <button
                            key={intg}
                            type="button"
                            onClick={() => toggleIntegration(intg)}
                            data-ocid={`reg-intg-${intg.toLowerCase()}`}
                            className={cn(
                              "px-3 py-1.5 rounded-lg border text-xs font-mono transition-smooth",
                              form.integrations.includes(intg)
                                ? "border-primary/60 bg-primary/15 text-primary"
                                : "border-border/50 bg-muted/30 text-muted-foreground hover:border-border hover:text-foreground",
                            )}
                          >
                            {intg}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ── STEP 4: Plan ────────────────────────────────────────── */}
                {step === "Plan" && (
                  <div className="space-y-5">
                    <SectionHeader
                      icon={CheckCircle2}
                      title="Select Your Plan"
                      desc="Choose the tier that matches your network scale. You can upgrade at any time."
                    />
                    <div className="grid sm:grid-cols-2 gap-3">
                      {PLAN_CARDS.map((p) => {
                        const colors = PLAN_COLOR_MAP[p.color];
                        const selected = form.plan === p.plan;
                        return (
                          <button
                            key={p.plan}
                            type="button"
                            onClick={() => set("plan", p.plan)}
                            data-ocid={`reg-plan-${p.plan.toLowerCase()}`}
                            className={cn(
                              "relative text-left rounded-xl border p-4 transition-smooth",
                              selected
                                ? cn(
                                    colors.border,
                                    colors.bg,
                                    "ring-1",
                                    colors.border,
                                  )
                                : "border-border/40 bg-muted/20 hover:border-border/70",
                            )}
                          >
                            {p.badge && (
                              <span
                                className={cn(
                                  "absolute -top-2 right-3 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-wide",
                                  colors.badge,
                                )}
                              >
                                {p.badge}
                              </span>
                            )}
                            <div className="flex items-center justify-between mb-2">
                              <span
                                className={cn(
                                  "font-display text-xs tracking-widest font-semibold",
                                  selected ? colors.text : "text-foreground",
                                )}
                              >
                                {p.label}
                              </span>
                              <span
                                className={cn(
                                  "font-mono text-xs font-semibold",
                                  selected
                                    ? colors.text
                                    : "text-muted-foreground",
                                )}
                              >
                                {p.price}
                              </span>
                            </div>
                            <ul className="space-y-1">
                              {p.features.map((f) => (
                                <li
                                  key={f}
                                  className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground"
                                >
                                  <CheckCircle2
                                    className={cn(
                                      "w-3 h-3 flex-shrink-0",
                                      selected
                                        ? colors.text
                                        : "text-muted-foreground/50",
                                    )}
                                  />
                                  {f}
                                </li>
                              ))}
                            </ul>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ── STEP 5: Security ────────────────────────────────────── */}
                {step === "Security" && (
                  <div className="space-y-5">
                    <SectionHeader
                      icon={Shield}
                      title="Set Your Password"
                      desc="Create a strong password to secure your NOC operator account."
                    />
                    <Field label="PASSWORD *" error={stepErrors.password}>
                      <div className="relative">
                        <input
                          type={showPw ? "text" : "password"}
                          value={form.password}
                          onChange={(e) => set("password", e.target.value)}
                          placeholder="Create a strong password"
                          className={cn(inputCls(stepErrors.password), "pr-10")}
                          data-ocid="reg-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          aria-label="Toggle password"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground"
                        >
                          {showPw ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {form.password && (
                        <div className="mt-2 space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-1 flex-1">
                              {[1, 2, 3, 4].map((bar) => (
                                <div
                                  key={bar}
                                  className={cn(
                                    "h-1 flex-1 rounded-full transition-smooth",
                                    bar <= pwStrength.score
                                      ? pwStrength.score === 1
                                        ? "bg-red-400"
                                        : pwStrength.score === 2
                                          ? "bg-amber-400"
                                          : pwStrength.score === 3
                                            ? "bg-primary"
                                            : "bg-emerald-400"
                                      : "bg-border/40",
                                  )}
                                />
                              ))}
                            </div>
                            <span
                              className={cn(
                                "text-[10px] font-mono",
                                pwStrength.color,
                              )}
                            >
                              {pwStrength.label}
                            </span>
                          </div>
                          <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5">
                            {[
                              {
                                ok: form.password.length >= 8,
                                label: "8+ characters",
                              },
                              {
                                ok: /[A-Z]/.test(form.password),
                                label: "1 uppercase letter",
                              },
                              {
                                ok: /[0-9]/.test(form.password),
                                label: "1 number",
                              },
                              {
                                ok: /[^A-Za-z0-9]/.test(form.password),
                                label: "1 special character",
                              },
                            ].map((req) => (
                              <li
                                key={req.label}
                                className={cn(
                                  "flex items-center gap-1 text-[10px] font-mono transition-smooth",
                                  req.ok
                                    ? "text-emerald-400"
                                    : "text-muted-foreground/60",
                                )}
                              >
                                <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                                {req.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Field>
                    <Field
                      label="CONFIRM PASSWORD *"
                      error={stepErrors.confirmPassword}
                    >
                      <div className="relative">
                        <input
                          type={showConfirm ? "text" : "password"}
                          value={form.confirmPassword}
                          onChange={(e) =>
                            set("confirmPassword", e.target.value)
                          }
                          placeholder="Confirm your password"
                          className={cn(
                            inputCls(stepErrors.confirmPassword),
                            "pr-10",
                          )}
                          data-ocid="reg-confirm-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          aria-label="Toggle confirm"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-muted-foreground"
                        >
                          {showConfirm ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </Field>
                    <div className="space-y-3 pt-1">
                      <label
                        className="flex items-start gap-2.5 cursor-pointer group"
                        data-ocid="reg-terms"
                      >
                        <input
                          type="checkbox"
                          checked={form.termsAccepted}
                          onChange={(e) =>
                            set("termsAccepted", e.target.checked)
                          }
                          className="mt-0.5 w-3.5 h-3.5 rounded border-border/50 accent-primary flex-shrink-0"
                        />
                        <span className="text-[11px] font-mono text-muted-foreground leading-relaxed group-hover:text-foreground transition-smooth">
                          I agree to the{" "}
                          <span className="text-primary underline underline-offset-2 cursor-pointer">
                            Terms of Service
                          </span>{" "}
                          and acknowledge that all system activity is logged and
                          audited.
                        </span>
                      </label>
                      {stepErrors.termsAccepted && (
                        <p className="text-[10px] font-mono text-destructive">
                          {stepErrors.termsAccepted}
                        </p>
                      )}
                      <label
                        className="flex items-start gap-2.5 cursor-pointer group"
                        data-ocid="reg-privacy"
                      >
                        <input
                          type="checkbox"
                          checked={form.privacyAccepted}
                          onChange={(e) =>
                            set("privacyAccepted", e.target.checked)
                          }
                          className="mt-0.5 w-3.5 h-3.5 rounded border-border/50 accent-primary flex-shrink-0"
                        />
                        <span className="text-[11px] font-mono text-muted-foreground leading-relaxed group-hover:text-foreground transition-smooth">
                          I have read and accept the{" "}
                          <span className="text-primary underline underline-offset-2 cursor-pointer">
                            Privacy Policy
                          </span>
                          .
                        </span>
                      </label>
                      {stepErrors.privacyAccepted && (
                        <p className="text-[10px] font-mono text-destructive">
                          {stepErrors.privacyAccepted}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Server error */}
                {error && step === "Security" && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 px-3.5 py-2.5 rounded-lg border border-destructive/40 bg-destructive/10 text-[11px] font-mono text-destructive"
                    data-ocid="reg-error"
                  >
                    {error}
                  </motion.div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-8 pt-5 border-t border-border/30">
                  {stepIndex > 0 ? (
                    <button
                      type="button"
                      onClick={() => setStep(STEPS[stepIndex - 1])}
                      className="px-4 py-2 rounded-lg text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-border/40 hover:border-border/70 transition-smooth"
                    >
                      ← Back
                    </button>
                  ) : (
                    <a
                      href="/login"
                      onClick={(e) => {
                        e.preventDefault();
                        void router.navigate({ to: "/login" });
                      }}
                      className="text-xs font-mono text-muted-foreground hover:text-foreground transition-smooth"
                      data-ocid="reg-login-link"
                    >
                      Already have an account? Sign in
                    </a>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    data-ocid={step === "Security" ? "reg-submit" : "reg-next"}
                    className={cn(
                      "flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-sm tracking-widest transition-smooth border",
                      "bg-primary/15 hover:bg-primary/25 border-primary/40 hover:border-primary/70 text-primary noc-glow",
                      "disabled:opacity-60 disabled:cursor-not-allowed",
                    )}
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : step === "Security" ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                    {isLoading
                      ? "CREATING ACCOUNT…"
                      : step === "Security"
                        ? "CREATE ACCOUNT"
                        : "NEXT STEP"}
                  </button>
                </div>
              </form>
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

// ─── SectionHeader ────────────────────────────────────────────────────────────

function SectionHeader({
  icon: Icon,
  title,
  desc,
}: { icon: React.ElementType; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-3 mb-1">
      <div className="w-9 h-9 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div>
        <h2 className="font-display text-sm font-semibold tracking-widest text-foreground uppercase">
          {title}
        </h2>
        <p className="text-xs text-muted-foreground font-body mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
