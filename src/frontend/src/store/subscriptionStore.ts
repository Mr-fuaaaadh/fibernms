import { create } from "zustand";
import { PLAN_CONFIGS } from "../config/features";
import { Plan } from "../types/subscription";
import type { SubscriptionState } from "../types/subscription";

// ─── Store Interface ──────────────────────────────────────────────────────────
interface SubscriptionStore extends SubscriptionState {
  // Actions
  setCurrentPlan: (plan: Plan) => void;
  updateUsage: (deviceUsed: number, apiUsed: number) => void;
  validateLicense: (key: string) => boolean;
  setTenantId: (id: string) => void;
}

// ─── Initial State (ENTERPRISE demo) ─────────────────────────────────────────
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;
const ENTERPRISE_CONFIG = PLAN_CONFIGS[Plan.ENTERPRISE];

const initialState: SubscriptionState = {
  currentPlan: Plan.ENTERPRISE,
  tenantId: "tenant-fibernms-demo",
  organizationName: "FiberNMS Demo — Tier-2 Telecom",
  deviceLimit: ENTERPRISE_CONFIG.maxDevices, // 100,000
  deviceUsed: 47_823,
  apiQuota: 1_000_000,
  apiUsed: 284_750,
  expiryDate: Date.now() + THIRTY_DAYS_MS,
  trialDaysLeft: 0,
  isLicenseValid: true,
  licenseKey: "FNMS-ENT-2026-DEMO-XXXXXX",
};

// ─── Valid demo license keys per plan ─────────────────────────────────────────
const VALID_LICENSE_KEYS: Record<string, Plan> = {
  "FNMS-BASIC-2026-DEMO": Plan.BASIC,
  "FNMS-PRO-2026-DEMO": Plan.PROFESSIONAL,
  "FNMS-ENT-2026-DEMO-XXXXXX": Plan.ENTERPRISE,
  "FNMS-ULTRA-2026-DEMO": Plan.ULTRA,
};

// ─── Store ────────────────────────────────────────────────────────────────────
export const useSubscriptionStore = create<SubscriptionStore>((set, get) => ({
  ...initialState,

  setCurrentPlan: (plan) => {
    const config = PLAN_CONFIGS[plan];
    set({
      currentPlan: plan,
      deviceLimit: config.maxDevices === -1 ? 10_000_000 : config.maxDevices,
    });
  },

  updateUsage: (deviceUsed, apiUsed) => set({ deviceUsed, apiUsed }),

  validateLicense: (key) => {
    const plan = VALID_LICENSE_KEYS[key.trim().toUpperCase()];
    if (plan) {
      get().setCurrentPlan(plan);
      set({ licenseKey: key, isLicenseValid: true });
      return true;
    }
    set({ isLicenseValid: false });
    return false;
  },

  setTenantId: (id) => set({ tenantId: id }),
}));
