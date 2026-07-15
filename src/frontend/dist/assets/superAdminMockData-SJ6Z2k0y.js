function mulberry32(initialSeed) {
  let s = initialSeed;
  return () => {
    s = s + 1831565813 | 0;
    let t = Math.imul(s ^ s >>> 15, 1 | s);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rng = mulberry32(42);
const rand = () => rng();
const randInt = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
function pick(arr) {
  return arr[Math.floor(rand() * arr.length)];
}
function randDate(daysAgoMin, daysAgoMax) {
  const ms = Date.now() - randInt(daysAgoMin, daysAgoMax) * 864e5;
  return new Date(ms).toISOString();
}
function randPastDate(base, daysAgoMin, daysAgoMax) {
  const baseMs = new Date(base).getTime();
  const ms = baseMs + randInt(daysAgoMin, daysAgoMax) * 864e5;
  return new Date(Math.min(ms, Date.now())).toISOString();
}
function fmtId(prefix, n, pad = 4) {
  return `${prefix}-${String(n).padStart(pad, "0")}`;
}
function randIp() {
  return `${randInt(10, 220)}.${randInt(0, 255)}.${randInt(0, 255)}.${randInt(1, 254)}`;
}
function randPhone(region) {
  if (region === "India") return `+91-${randInt(7e9, 9999999999)}`;
  if (region === "US") return `+1-${randInt(2e9, 9999999999)}`;
  if (region === "EU") return `+44-${randInt(1e8, 999999999)}`;
  if (region === "APAC") return `+81-${randInt(1e9, 9999999999)}`;
  return `+971-${randInt(5e8, 599999999)}`;
}
const PLAN_MONTHLY = {
  BASIC: 200,
  PROFESSIONAL: 500,
  ENTERPRISE: 2e3,
  ULTRA: 5e3
};
const PLAN_YEARLY = {
  BASIC: 2e3,
  PROFESSIONAL: 5e3,
  ENTERPRISE: 2e4,
  ULTRA: 5e4
};
const PLAN_DEVICE_LIMIT = {
  BASIC: 1e3,
  PROFESSIONAL: 1e4,
  ENTERPRISE: 1e5,
  ULTRA: 1e6
};
const PLAN_API_LIMIT = {
  BASIC: 1e5,
  PROFESSIONAL: 1e6,
  ENTERPRISE: 1e7,
  ULTRA: 1e8
};
const PLAN_DATA_LIMIT = {
  BASIC: 50,
  PROFESSIONAL: 500,
  ENTERPRISE: 5e3,
  ULTRA: 5e4
};
const PLAN_ALERT_LIMIT = {
  BASIC: 1e4,
  PROFESSIONAL: 1e5,
  ENTERPRISE: 1e6,
  ULTRA: 1e7
};
const TAX_BY_REGION = {
  India: { rate: 0.18, type: "GST" },
  EU: { rate: 0.2, type: "VAT" },
  US: { rate: 0, type: "NONE" },
  APAC: { rate: 0.1, type: "NONE" },
  MENA: { rate: 0.1, type: "NONE" }
};
const REGION_DATA = [
  { region: "India", countries: ["India"], count: 15 },
  { region: "US", countries: ["United States", "Canada"], count: 12 },
  {
    region: "EU",
    countries: [
      "Germany",
      "France",
      "Netherlands",
      "UK",
      "Sweden",
      "Poland",
      "Spain",
      "Italy"
    ],
    count: 10
  },
  {
    region: "APAC",
    countries: ["Japan", "Singapore", "Australia", "South Korea", "Malaysia"],
    count: 10
  },
  {
    region: "MENA",
    countries: ["UAE", "Saudi Arabia", "Qatar", "Egypt"],
    count: 7
  }
];
const COMPANY_NAMES = {
  India: [
    "Airtel Fiber Networks",
    "BSNL Optic Systems",
    "Jio FiberCo",
    "Tata Communications",
    "Reliance OptiNet",
    "Vodafone Idea Infra",
    "MTNL FiberGrid",
    "Hathway Networks",
    "ACT Fibernet",
    "YOU Broadband",
    "Excitel FiberISP",
    "Sify Technologies",
    "NTT India Network",
    "Atria Convergence",
    "Tikona Digital"
  ],
  US: [
    "AT&T Fiber Corp",
    "Verizon FiOS Systems",
    "Comcast FiberNet",
    "Charter FiberLink",
    "Frontier Communications",
    "CenturyLink Optics",
    "Cox FiberConnect",
    "Windstream Optic",
    "Consolidated Fiber",
    "Summit Broadband",
    "Ziply Fiber Systems",
    "TDS FiberLink"
  ],
  EU: [
    "Deutsche Telekom Fiber",
    "Orange FiberCore",
    "BT Openreach EU",
    "KPN Glasvezel",
    "Telia FiberNet",
    "Vodafone EU Optics",
    "Telecom Italia Fiber",
    "Telefonica FiberCo",
    "Swisscom FiberLink",
    "Proximus FibrePro"
  ],
  APAC: [
    "NTT FiberJapan",
    "SingTel Optic",
    "Telstra FiberNet AU",
    "KT Corporation Fiber",
    "Maxis FiberLink MY",
    "KDDI OptiCore",
    "Optus FiberCo",
    "SoftBank Fiber",
    "PCCW FiberHK",
    "True Move FiberTH"
  ],
  MENA: [
    "Etisalat FiberME",
    "STC Fiber KSA",
    "Ooredoo FiberQ",
    "Telecom Egypt Optic",
    "Du Fiber UAE",
    "Zain FiberME",
    "Batelco OptiNet"
  ]
};
const PLAN_POOL = [
  ...Array(12).fill("BASIC"),
  ...Array(18).fill("PROFESSIONAL"),
  ...Array(15).fill("ENTERPRISE"),
  ...Array(9).fill("ULTRA")
];
const STATUS_POOL = [
  ...Array(35).fill("active"),
  ...Array(10).fill("trial"),
  ...Array(6).fill("suspended"),
  ...Array(3).fill("expired")
];
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const shuffledPlans = shuffle(PLAN_POOL);
const shuffledStatuses = shuffle(STATUS_POOL);
let _coIdx = 0;
const mockCompanies = REGION_DATA.flatMap(
  ({ region, countries, count }) => {
    const names = COMPANY_NAMES[region].slice(0, count);
    return names.map((name) => {
      const idx = _coIdx++;
      const plan = shuffledPlans[idx] ?? "ENTERPRISE";
      const status = shuffledStatuses[idx] ?? "active";
      const country = pick(countries);
      const domainBase = name.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 14);
      const tlds = {
        India: ".in",
        EU: ".eu",
        APAC: ".net",
        MENA: ".ae",
        US: ".com"
      };
      const tld = tlds[region];
      const devicesLimit = PLAN_DEVICE_LIMIT[plan];
      const apiLimit = PLAN_API_LIMIT[plan];
      const dataLimitGB = PLAN_DATA_LIMIT[plan];
      const alertsLimit = PLAN_ALERT_LIMIT[plan];
      let usagePct;
      if (status === "trial") usagePct = randInt(5, 20) / 100;
      else if (status === "suspended" || status === "expired")
        usagePct = randInt(20, 60) / 100;
      else {
        const bucket = rand();
        if (bucket < 0.2)
          usagePct = randInt(70, 95) / 100;
        else if (bucket < 0.1)
          usagePct = randInt(90, 100) / 100;
        else usagePct = randInt(30, 70) / 100;
      }
      const devicesUsed = Math.floor(devicesLimit * usagePct);
      const apiUsed = Math.floor(apiLimit * (usagePct * (0.6 + rand() * 0.8)));
      const dataUsedGB = Math.floor(
        dataLimitGB * (usagePct * (0.5 + rand() * 0.9))
      );
      const alertsUsed = Math.floor(
        alertsLimit * (usagePct * (0.4 + rand() * 0.8))
      );
      const activeUsers = plan === "BASIC" ? randInt(2, 15) : plan === "PROFESSIONAL" ? randInt(5, 50) : plan === "ENTERPRISE" ? randInt(15, 150) : randInt(50, 500);
      const mrr = status === "active" || status === "trial" ? PLAN_MONTHLY[plan] : 0;
      const createdAt = randDate(90, 1200);
      const lastActiveAt = randPastDate(createdAt, 0, 60);
      return {
        id: fmtId("co", idx + 1, 3),
        name,
        domain: `${domainBase}${tld}`,
        subdomain: `noc.${domainBase}${tld}`,
        region,
        plan,
        status,
        createdAt,
        contactEmail: `admin@${domainBase}${tld}`,
        contactPhone: randPhone(region),
        address: country,
        country,
        devicesUsed,
        devicesLimit,
        apiUsed,
        apiLimit,
        dataUsedGB,
        dataLimitGB,
        alertsUsed,
        alertsLimit,
        activeUsers,
        totalAlerts: randInt(100, 15e3),
        mrr,
        lastActiveAt,
        isSoftDeleted: false,
        ...status === "trial" ? { trialEndsAt: randPastDate(createdAt, 14, 30) } : {},
        // compat aliases
        onboardedAt: createdAt,
        monthlyRevenue: mrr,
        alertsGenerated: randInt(100, 15e3),
        deviceLimit: devicesLimit,
        lastActivity: lastActiveAt
      };
    });
  }
);
const FIRST_NAMES = [
  "Aarav",
  "Aditya",
  "Akira",
  "Alexander",
  "Ali",
  "Amara",
  "Anjali",
  "Anna",
  "Arjun",
  "Benjamin",
  "Carlos",
  "Chen",
  "Daniel",
  "Deepa",
  "Elena",
  "Emma",
  "Fatima",
  "Felix",
  "Gabriel",
  "Hans",
  "Hassan",
  "Hiroshi",
  "Isabel",
  "James",
  "Javier",
  "Jessica",
  "Juan",
  "Kenji",
  "Kumar",
  "Lars",
  "Lena",
  "Li",
  "Maria",
  "Marie",
  "Michael",
  "Mohamed",
  "Nadia",
  "Nisha",
  "Omar",
  "Pedro",
  "Priya",
  "Raj",
  "Ravi",
  "Robert",
  "Samuel",
  "Sara",
  "Sarah",
  "Sergei",
  "Sofia",
  "Thomas",
  "Vikram",
  "Wei",
  "Yuki",
  "Zara",
  "Zhang",
  "Alejandro",
  "Deepak",
  "Tariq",
  "Mei",
  "Olga"
];
const LAST_NAMES = [
  "Ahmed",
  "Al-Rashid",
  "Andersen",
  "Brown",
  "Chakraborty",
  "Chen",
  "Dupont",
  "Garcia",
  "Gupta",
  "Hassan",
  "Johnson",
  "Khan",
  "Kim",
  "Kumar",
  "Lee",
  "Liu",
  "Martinez",
  "Miller",
  "Müller",
  "Nguyen",
  "Patel",
  "Petrov",
  "Rodriguez",
  "Sato",
  "Schmidt",
  "Sharma",
  "Singh",
  "Smith",
  "Svensson",
  "Tanaka",
  "Taylor",
  "Thomas",
  "Wang",
  "Williams",
  "Wilson",
  "Wu",
  "Zhang"
];
const DEVICE_BROWSERS = [
  "Windows 11 Chrome",
  "macOS Safari",
  "Windows 10 Firefox",
  "Ubuntu Chrome",
  "macOS Chrome",
  "Windows 11 Edge",
  "iOS Safari",
  "Android Chrome"
];
const ROLE_WEIGHTS = [
  { role: "Admin", weight: 0.05 },
  { role: "Network Engineer", weight: 0.25 },
  { role: "NOC Operator", weight: 0.4 },
  { role: "Viewer", weight: 0.3 }
];
function pickRole() {
  const r = rand();
  let cum = 0;
  for (const { role, weight } of ROLE_WEIGHTS) {
    cum += weight;
    if (r < cum) return role;
  }
  return "Viewer";
}
let _userGlobalIdx = 0;
const mockUsers = mockCompanies.flatMap((company, ci) => {
  const count = randInt(18, 26);
  return Array.from({ length: count }, () => {
    const uid = ++_userGlobalIdx;
    const firstName = FIRST_NAMES[(uid * 7 + ci) % FIRST_NAMES.length];
    const lastName = LAST_NAMES[(uid * 11 + ci * 3) % LAST_NAMES.length];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/[^a-z]/g, "")}@${company.domain}`;
    const role = pickRole();
    const status = rand() > 0.15 ? "active" : "disabled";
    const lastLogin = randDate(0, 30);
    const mfaEnabled = rand() > 0.4;
    const sessionCount = status === "active" ? randInt(0, 3) : 0;
    const sessions = Array.from(
      { length: sessionCount },
      (_, si) => {
        const loginTime = randDate(0, 7);
        return {
          id: fmtId("sess", uid * 5 + si + 1, 6),
          userId: fmtId("usr", uid, 5),
          loginTime,
          lastActivity: randPastDate(loginTime, 0, 2),
          deviceInfo: pick(DEVICE_BROWSERS),
          ipAddress: randIp(),
          isActive: rand() > 0.3
        };
      }
    );
    return {
      id: fmtId("usr", uid, 5),
      companyId: company.id,
      companyName: company.name,
      name,
      email,
      role,
      status,
      lastLogin,
      assignedRegion: company.region,
      mfaEnabled,
      activeSessions: sessions,
      // compat aliases
      company: company.name,
      region: company.region,
      sessionActive: status === "active" && sessions.some((s) => s.isActive)
    };
  });
});
const ORDER_STATUS_POOL = [
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "paid",
  "pending",
  "pending",
  "failed"
];
const mockOrders = Array.from(
  { length: 520 },
  (_, i) => {
    const company = mockCompanies[i % mockCompanies.length];
    const cycle = rand() > 0.3 ? "monthly" : "yearly";
    const price = cycle === "yearly" ? PLAN_YEARLY[company.plan] : PLAN_MONTHLY[company.plan];
    const status = pick(ORDER_STATUS_POOL);
    const createdAt = randDate(10, 730);
    const dueDateMs = new Date(createdAt).getTime() + 30 * 864e5;
    const dueDate = new Date(dueDateMs).toISOString();
    const paidAt = status === "paid" ? randPastDate(createdAt, 0, 5) : void 0;
    const nextRenewal = status === "paid" ? new Date(
      new Date(createdAt).getTime() + (cycle === "yearly" ? 365 : 30) * 864e5
    ).toISOString() : void 0;
    return {
      id: fmtId("ord", i + 1, 5),
      companyId: company.id,
      companyName: company.name,
      plan: company.plan,
      price,
      billingCycle: cycle,
      status,
      createdAt,
      dueDate,
      ...nextRenewal ? { nextRenewal } : {},
      ...paidAt ? { paidAt } : {}
    };
  }
);
let _invNum = 1e3;
const mockInvoices = mockOrders.map((order, i) => {
  const company = mockCompanies.find((c) => c.id === order.companyId);
  const region = (company == null ? void 0 : company.region) ?? "US";
  const { rate, type: taxType } = TAX_BY_REGION[region];
  const subtotal = order.price;
  const tax = Math.round(subtotal * rate * 100) / 100;
  const total = subtotal + tax;
  const invNum = `INV-${new Date(order.createdAt).getFullYear()}-${String(++_invNum).padStart(5, "0")}`;
  const lineItems = [
    {
      description: `${order.plan} Plan — ${order.billingCycle === "yearly" ? "Annual" : "Monthly"} Subscription`,
      quantity: 1,
      unitPrice: subtotal,
      total: subtotal
    }
  ];
  if (rand() > 0.8) {
    const addon = Math.round(subtotal * 0.05 * 100) / 100;
    lineItems.push({
      description: "Extended API Quota Add-On",
      quantity: 1,
      unitPrice: addon,
      total: addon
    });
  }
  const invoiceStatus = order.status === "paid" ? "paid" : order.status === "failed" ? "overdue" : "pending";
  const paidAt = order.paidAt;
  return {
    id: fmtId("inv", i + 1, 5),
    orderId: order.id,
    companyId: order.companyId,
    companyName: order.companyName,
    invoiceNumber: invNum,
    amount: subtotal,
    tax: rate,
    taxType,
    taxRate: rate * 100,
    subtotal,
    total,
    status: invoiceStatus,
    createdAt: order.createdAt,
    dueDate: order.dueDate,
    ...paidAt ? { paidAt } : {},
    lineItems,
    region,
    // compat aliases
    issuedAt: order.createdAt,
    dueAt: order.dueDate,
    taxAmount: tax
  };
});
const AUDIT_TEMPLATES = [
  {
    action: "user.created",
    category: "user",
    targetType: "User",
    severity: "info",
    details: (c) => `New user account created under ${c.name}`
  },
  {
    action: "user.login",
    category: "auth",
    targetType: "Session",
    severity: "info",
    details: (_c, u) => `User ${(u == null ? void 0 : u.name) ?? "Unknown"} logged in successfully`
  },
  {
    action: "user.login_failed",
    category: "auth",
    targetType: "Session",
    severity: "warning",
    details: (_c, u) => `Failed login attempt for ${(u == null ? void 0 : u.email) ?? "unknown user"}`
  },
  {
    action: "user.disabled",
    category: "user",
    targetType: "User",
    severity: "warning",
    details: (_c, u) => `User account ${(u == null ? void 0 : u.email) ?? "unknown"} was disabled`
  },
  {
    action: "user.role_changed",
    category: "user",
    targetType: "User",
    severity: "warning",
    details: () => "User role updated from NOC Operator to Network Engineer"
  },
  {
    action: "user.force_logout",
    category: "auth",
    targetType: "Session",
    severity: "critical",
    details: (_c, u) => `Active sessions force-terminated for ${(u == null ? void 0 : u.email) ?? "user"}`
  },
  {
    action: "user.invited",
    category: "user",
    targetType: "User",
    severity: "info",
    details: (c) => `User invited to join ${c.name} team via email`
  },
  {
    action: "user.bulk_import",
    category: "user",
    targetType: "User",
    severity: "info",
    details: () => `Bulk import of ${randInt(5, 50)} users completed successfully`
  },
  {
    action: "company.created",
    category: "company",
    targetType: "Company",
    severity: "info",
    details: (c) => `Company ${c.name} onboarded to the platform`
  },
  {
    action: "company.suspended",
    category: "company",
    targetType: "Company",
    severity: "critical",
    details: (c) => `Company ${c.name} suspended due to billing failure`
  },
  {
    action: "company.activated",
    category: "company",
    targetType: "Company",
    severity: "info",
    details: (c) => `Company ${c.name} reactivated after payment resolved`
  },
  {
    action: "company.plan_changed",
    category: "billing",
    targetType: "Subscription",
    severity: "warning",
    details: (c) => `Subscription plan changed to ${c.plan} for ${c.name}`
  },
  {
    action: "company.deleted",
    category: "company",
    targetType: "Company",
    severity: "critical",
    details: (c) => `Company ${c.name} soft-deleted by super admin`
  },
  {
    action: "billing.invoice_paid",
    category: "billing",
    targetType: "Invoice",
    severity: "info",
    details: (c) => `Invoice payment received for ${c.name}`
  },
  {
    action: "billing.payment_failed",
    category: "billing",
    targetType: "Invoice",
    severity: "critical",
    details: (c) => `Payment failed for ${c.name} — retry scheduled`
  },
  {
    action: "billing.plan_upgraded",
    category: "billing",
    targetType: "Subscription",
    severity: "info",
    details: (c) => `Plan upgraded from PROFESSIONAL to ENTERPRISE for ${c.name}`
  },
  {
    action: "billing.plan_downgraded",
    category: "billing",
    targetType: "Subscription",
    severity: "warning",
    details: (c) => `Plan downgraded from ENTERPRISE to PROFESSIONAL for ${c.name}`
  },
  {
    action: "device.added",
    category: "device",
    targetType: "Device",
    severity: "info",
    details: (c) => `New OLT device registered in ${c.region} region`
  },
  {
    action: "device.removed",
    category: "device",
    targetType: "Device",
    severity: "warning",
    details: (c) => `Device decommissioned from ${c.name} network`
  },
  {
    action: "device.alert_triggered",
    category: "device",
    targetType: "Alert",
    severity: "warning",
    details: () => "Critical fiber cut alert acknowledged by NOC operator"
  },
  {
    action: "device.status_changed",
    category: "device",
    targetType: "Device",
    severity: "info",
    details: () => "Device status changed from Warning to Online"
  },
  {
    action: "auth.password_changed",
    category: "auth",
    targetType: "User",
    severity: "warning",
    details: (_c, u) => `Password changed for ${(u == null ? void 0 : u.email) ?? "user"}`
  },
  {
    action: "auth.mfa_enabled",
    category: "auth",
    targetType: "User",
    severity: "info",
    details: (_c, u) => `MFA enabled for ${(u == null ? void 0 : u.email) ?? "user"}`
  },
  {
    action: "api_key.created",
    category: "company",
    targetType: "APIKey",
    severity: "info",
    details: () => "New API key generated for integration access"
  },
  {
    action: "api_key.revoked",
    category: "company",
    targetType: "APIKey",
    severity: "warning",
    details: () => "API key revoked due to suspicious usage pattern"
  }
];
const mockAuditEvents = Array.from(
  { length: 5e3 },
  (_, i) => {
    const company = mockCompanies[i % mockCompanies.length];
    const usersForCompany = mockUsers.filter((u) => u.companyId === company.id);
    const user = usersForCompany.length > 0 ? usersForCompany[i % usersForCompany.length] : null;
    const tmpl = pick(AUDIT_TEMPLATES);
    return {
      id: fmtId("aud", i + 1, 6),
      userId: (user == null ? void 0 : user.id) ?? fmtId("usr", i + 1, 5),
      userEmail: (user == null ? void 0 : user.email) ?? "system@fibernms.internal",
      companyId: company.id,
      companyName: company.name,
      action: tmpl.action,
      targetType: tmpl.targetType,
      targetId: fmtId("tgt", i + 1, 5),
      targetName: (user == null ? void 0 : user.name) ?? company.name,
      details: tmpl.details(company, user),
      timestamp: randDate(0, 180),
      severity: tmpl.severity,
      category: tmpl.category,
      ipAddress: randIp(),
      // compat alias
      userName: (user == null ? void 0 : user.name) ?? "System"
    };
  }
);
const GEO_LOCATIONS = [
  "Mumbai, India",
  "New York, US",
  "Berlin, Germany",
  "Tokyo, Japan",
  "Dubai, UAE",
  "Singapore, SG",
  "London, UK",
  "Paris, France",
  "Riyadh, KSA",
  "Sydney, AU",
  "Shanghai, China",
  "Moscow, Russia",
  "Lagos, Nigeria",
  "São Paulo, Brazil",
  "Seoul, South Korea",
  "Amsterdam, Netherlands",
  "Stockholm, Sweden",
  "Cairo, Egypt"
];
const SEC_EVENT_TYPES = [
  "login_failed",
  "login_failed",
  "login_failed",
  "login_success",
  "suspicious_activity",
  "suspicious_activity",
  "mfa_bypass_attempt",
  "rate_limit_exceeded",
  "ip_blocked"
];
const mockSecurityEvents = Array.from(
  { length: 250 },
  (_, i) => {
    const company = mockCompanies[i % mockCompanies.length];
    const usersForCompany = mockUsers.filter((u) => u.companyId === company.id);
    const user = usersForCompany.length > 0 ? usersForCompany[i % usersForCompany.length] : null;
    const eventType = pick(SEC_EVENT_TYPES);
    const success = eventType === "login_success";
    const failedAttempts = success ? 0 : randInt(1, 20);
    const isBlocked = failedAttempts > 10;
    const secSeverity = eventType === "mfa_bypass_attempt" ? "critical" : eventType === "suspicious_activity" ? "high" : eventType === "rate_limit_exceeded" || eventType === "ip_blocked" ? "medium" : "low";
    const descriptions = {
      login_failed: "Multiple failed login attempts detected",
      login_success: "Successful login from recognized device",
      suspicious_activity: "Unusual API access pattern detected",
      mfa_bypass_attempt: "MFA token reuse detected — session invalidated",
      rate_limit_exceeded: "API rate limit exceeded: threshold hit",
      ip_blocked: "IP address blocked after repeated failures"
    };
    return {
      id: fmtId("sec", i + 1, 5),
      userId: user == null ? void 0 : user.id,
      userEmail: user == null ? void 0 : user.email,
      companyId: company.id,
      ipAddress: randIp(),
      geoLocation: pick(GEO_LOCATIONS),
      eventType,
      success,
      timestamp: randDate(0, 90),
      failedAttempts,
      isBlocked,
      // compat aliases
      type: eventType,
      resolved: rand() > 0.45,
      severity: secSeverity,
      userName: user == null ? void 0 : user.name,
      companyName: company.name,
      description: descriptions[eventType] ?? "Security event detected"
    };
  }
);
const mockIPTracking = Array.from(
  { length: 60 },
  (_, i) => {
    const company = mockCompanies[i % mockCompanies.length];
    const usersForCompany = mockUsers.filter((u) => u.companyId === company.id);
    const user = usersForCompany.length > 0 ? usersForCompany[i % usersForCompany.length] : null;
    const failedAttempts = randInt(0, 25);
    return {
      ipAddress: randIp(),
      userEmail: user == null ? void 0 : user.email,
      companyName: company.name,
      successCount: randInt(1, 100),
      failedAttempts,
      lastSeen: randDate(0, 30),
      geoLocation: pick(GEO_LOCATIONS),
      isBlocked: failedAttempts > 15
    };
  }
);
const SUSPICIOUS_REASONS = [
  "Multiple failed login attempts from same IP",
  "Simultaneous sessions from different continents",
  "Unusual API access pattern — high volume reads",
  "MFA token reuse detected",
  "Access to restricted admin endpoint attempted",
  "Brute-force password attack detected",
  "IP geolocation mismatch with registered country",
  "Large-scale data export outside business hours",
  "Credential stuffing pattern detected",
  "Rapid account enumeration via forgot-password endpoint"
];
const mockSuspiciousActivity = Array.from(
  { length: 20 },
  (_, i) => {
    const user = mockUsers[randInt(0, mockUsers.length - 1)];
    const sev = pick([
      "critical",
      "high",
      "medium"
    ]);
    return {
      id: fmtId("susp", i + 1, 4),
      ipAddress: randIp(),
      userEmail: rand() > 0.4 ? user.email : void 0,
      reason: pick(SUSPICIOUS_REASONS),
      detectedAt: randDate(0, 30),
      severity: sev,
      actionsCount: randInt(5, 500)
    };
  }
);
const mockLoginAttempts = Array.from(
  { length: 30 * 24 },
  (_, i) => {
    const hoursAgo = 30 * 24 - i;
    const timestamp = new Date(Date.now() - hoursAgo * 36e5).toISOString();
    const hour = new Date(timestamp).getHours();
    const isBusinessHour = hour >= 8 && hour <= 20;
    const baseCount = isBusinessHour ? randInt(80, 200) : randInt(10, 40);
    const success = rand() > 0.3;
    return {
      timestamp,
      success,
      count: success ? baseCount : randInt(2, Math.floor(baseCount * 0.15))
    };
  }
);
const mockMFAStatus = mockUsers.map(
  (u) => ({
    userId: u.id,
    userEmail: u.email,
    companyName: u.companyName,
    mfaEnabled: u.mfaEnabled,
    lastMFAEvent: u.mfaEnabled ? randDate(0, 30) : void 0,
    backupCodesAvailable: u.mfaEnabled && rand() > 0.3
  })
);
const mockUsageMetrics = mockCompanies.map(
  (c) => ({
    companyId: c.id,
    companyName: c.name,
    plan: c.plan,
    devices: { used: c.devicesUsed, limit: c.devicesLimit },
    api: { used: c.apiUsed, limit: c.apiLimit },
    data: { used: c.dataUsedGB, limit: c.dataLimitGB },
    alerts: { used: c.alertsUsed, limit: c.alertsLimit }
  })
);
const ACTIVITY_ACTIONS = [
  "Plan upgraded",
  "Plan downgraded",
  "User invited",
  "User disabled",
  "Invoice paid",
  "Invoice overdue",
  "API key rotated",
  "Webhook added",
  "Subscription renewed",
  "Account suspended",
  "Account reactivated",
  "Bulk users imported",
  "Device quota increased",
  "MFA enforced"
];
const mockCompanyActivities = Array.from(
  { length: 350 },
  (_, i) => {
    const company = mockCompanies[i % mockCompanies.length];
    const usersForCompany = mockUsers.filter((u) => u.companyId === company.id);
    const actor = usersForCompany.length > 0 ? usersForCompany[i % usersForCompany.length].email : "system@fibernms.internal";
    return {
      id: fmtId("act", i + 1, 5),
      companyId: company.id,
      action: pick(ACTIVITY_ACTIONS),
      actor,
      timestamp: randDate(0, 180),
      details: `Action performed on ${company.name} by ${actor}`
    };
  }
);
const ALERT_TEMPLATES = [
  {
    title: "API Gateway Outage — India Region",
    message: "Complete loss of API gateway connectivity affecting India region tenants",
    severity: "critical",
    category: "outage"
  },
  {
    title: "Elevated 5xx Error Rate — Telemetry Service",
    message: "Device telemetry ingestion returning 5xx errors at 18% rate",
    severity: "critical",
    category: "error_rate"
  },
  {
    title: "Billing API Intermittent Failures",
    message: "Payment processing API returning timeouts; affecting invoice generation",
    severity: "critical",
    category: "api"
  },
  {
    title: "Map Tile Server Latency Spike",
    message: "GIS map tile service p99 latency increased to 4200ms",
    severity: "medium",
    category: "resource"
  },
  {
    title: "WebSocket Relay Performance Degraded",
    message: "Real-time event relay experiencing packet loss; NOC dashboards may lag",
    severity: "medium",
    category: "resource"
  },
  {
    title: "Authentication Service Outage — EU Region",
    message: "OAuth token validation failure; EU tenant logins blocked",
    severity: "critical",
    category: "outage"
  },
  {
    title: "Alert Correlation Engine Errors",
    message: "Root-cause grouping producing incorrect clusters",
    severity: "critical",
    category: "error_rate"
  },
  {
    title: "Webhook Delivery Failures",
    message: "Outbound webhook delivery queue backing up; events delayed 15min+",
    severity: "critical",
    category: "api"
  },
  {
    title: "Database Read Replica Lag — APAC",
    message: "APAC read replica experiencing 8-second replication lag",
    severity: "medium",
    category: "resource"
  },
  {
    title: "AI Inference Service CPU Saturation",
    message: "Predictive fault AI model response times degraded by 30%",
    severity: "medium",
    category: "resource"
  },
  {
    title: "Object Storage Unavailable — US-East",
    message: "Device configuration backup storage offline; backups suspended",
    severity: "critical",
    category: "outage"
  },
  {
    title: "SNMP Polling Agent Failures",
    message: "SNMP agents failing to poll 23% of registered OLT devices",
    severity: "critical",
    category: "error_rate"
  },
  {
    title: "Kafka Broker Cluster Failure — EU",
    message: "Message broker cluster partitioned; EU telemetry pipeline halted",
    severity: "critical",
    category: "outage"
  },
  {
    title: "MENA Region API Cluster Offline",
    message: "Entire MENA API cluster offline following datacenter network failure",
    severity: "critical",
    category: "outage"
  },
  {
    title: "License Validation API Unavailable",
    message: "License key checks failing — all tenants on cached validation",
    severity: "critical",
    category: "api"
  },
  {
    title: "Real-Time Event Bus Down — Global",
    message: "Event bus offline; device status updates not propagating",
    severity: "critical",
    category: "outage"
  },
  {
    title: "Redis Cache Cluster Eviction Cascade",
    message: "Cache cluster hit 95% memory; mass eviction causing DB read storms",
    severity: "critical",
    category: "resource"
  },
  {
    title: "MFA Token Service Degraded",
    message: "TOTP validation service experiencing intermittent failures",
    severity: "critical",
    category: "api"
  },
  {
    title: "Stripe Webhook Signature Mismatch",
    message: "Payment webhook verification failing; billing events not processing",
    severity: "critical",
    category: "api"
  },
  {
    title: "Device Discovery Service Crash Loop",
    message: "Auto-discovery daemon in crash loop; new devices not being registered",
    severity: "critical",
    category: "outage"
  }
];
const mockSystemAlerts = ALERT_TEMPLATES.map(
  (tmpl, i) => {
    const timestamp = randDate(0, 60);
    const isResolved = rand() > 0.45;
    const resolvedAt = isResolved ? new Date(
      new Date(timestamp).getTime() + randInt(30, 480) * 6e4
    ).toISOString() : void 0;
    return {
      id: fmtId("alrt", i + 1, 4),
      type: tmpl.category,
      severity: tmpl.severity,
      title: tmpl.title,
      message: tmpl.message,
      affectedCompanies: randInt(1, 20),
      timestamp,
      isResolved,
      ...resolvedAt ? { resolvedAt } : {},
      category: tmpl.category,
      // compat aliases
      description: tmpl.message,
      startedAt: timestamp,
      affectedService: tmpl.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 30),
      status: isResolved ? "resolved" : "active"
    };
  }
);
({
  totalCompanies: mockCompanies.length,
  activeCompanies: mockCompanies.filter((c) => c.status === "active").length,
  trialCompanies: mockCompanies.filter((c) => c.status === "trial").length,
  suspendedCompanies: mockCompanies.filter((c) => c.status === "suspended").length,
  totalUsers: mockUsers.length,
  activeSubscriptions: mockCompanies.filter((c) => c.status === "active").length,
  mrr: mockCompanies.reduce((sum, c) => sum + c.mrr, 0),
  arr: mockCompanies.reduce((sum, c) => sum + c.mrr, 0) * 12,
  totalDevices: mockCompanies.reduce((sum, c) => sum + c.devicesUsed, 0)
});
function getCompanyById(id) {
  return mockCompanies.find((c) => c.id === id);
}
function getUsersByCompany(companyId) {
  return mockUsers.filter((u) => u.companyId === companyId);
}
function getOrdersByCompany(companyId) {
  return mockOrders.filter((o) => o.companyId === companyId);
}
function getInvoicesByCompany(companyId) {
  return mockInvoices.filter((inv) => inv.companyId === companyId);
}
function getAuditByCompany(companyId) {
  return mockAuditEvents.filter((e) => e.companyId === companyId);
}
function getActivitiesByCompany(companyId) {
  return mockCompanyActivities.filter((a) => a.companyId === companyId);
}
function getUsageByCompany(companyId) {
  return mockUsageMetrics.find((m) => m.companyId === companyId);
}
const MOCK_COMPANIES = mockCompanies;
const MOCK_ADMIN_USERS = mockUsers;
const MOCK_ORDERS = mockOrders;
const MOCK_INVOICES = mockInvoices;
const MOCK_AUDIT_EVENTS = mockAuditEvents;
const MOCK_SYSTEM_ALERTS = mockSystemAlerts;
const REVENUE_METRICS = (() => {
  const activeCompanies = mockCompanies.filter(
    (c) => c.status === "active" || c.status === "trial"
  );
  const totalMRR = activeCompanies.reduce((sum, c) => sum + c.mrr, 0);
  const revenueByPlan = {
    BASIC: 0,
    PROFESSIONAL: 0,
    ENTERPRISE: 0,
    ULTRA: 0
  };
  const revenueByRegion = {};
  for (const c of activeCompanies) {
    revenueByPlan[c.plan] += c.mrr;
    revenueByRegion[c.region] = (revenueByRegion[c.region] ?? 0) + c.mrr;
  }
  return {
    totalMRR,
    totalARR: totalMRR * 12,
    churnRate: 3.2,
    activeSubscriptions: mockCompanies.filter((c) => c.status === "active").length,
    trialSubscriptions: mockCompanies.filter((c) => c.status === "trial").length,
    suspendedSubscriptions: mockCompanies.filter(
      (c) => c.status === "suspended"
    ).length,
    expiredSubscriptions: mockCompanies.filter((c) => c.status === "expired").length,
    revenueByPlan,
    revenueByRegion
  };
})();
export {
  MOCK_COMPANIES as M,
  REVENUE_METRICS as R,
  getUsersByCompany as a,
  getInvoicesByCompany as b,
  getUsageByCompany as c,
  MOCK_SYSTEM_ALERTS as d,
  MOCK_AUDIT_EVENTS as e,
  getOrdersByCompany as f,
  getCompanyById as g,
  getAuditByCompany as h,
  getActivitiesByCompany as i,
  mockUsageMetrics as j,
  MOCK_ADMIN_USERS as k,
  MOCK_ORDERS as l,
  mockCompanies as m,
  MOCK_INVOICES as n,
  mockIPTracking as o,
  mockSuspiciousActivity as p,
  mockUsers as q,
  mockSecurityEvents as r,
  mockMFAStatus as s,
  mockLoginAttempts as t
};
