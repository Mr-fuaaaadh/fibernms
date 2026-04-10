import { Plan } from "@/types/subscription";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  email: string;
  firstName: string;
  lastName: string;
  company: string;
  plan: Plan;
  role: string;
  department: string;
  country: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  companySize: string;
  jobTitle: string;
  department: string;
  country: string;
  coverageArea: string;
  estimatedDevices: string;
  currentNMS: string;
  integrations: string[];
  plan: Plan;
  password: string;
}

// ─── Seeded Mock Users ────────────────────────────────────────────────────────

interface StoredUser {
  email: string;
  passwordHash: string;
  profile: AuthUser;
}

const SEED_USERS: StoredUser[] = [
  {
    email: "admin@fibernms.com",
    passwordHash: "Admin@123",
    profile: {
      email: "admin@fibernms.com",
      firstName: "System",
      lastName: "Administrator",
      company: "FiberNMS Operations",
      plan: Plan.ENTERPRISE,
      role: "NOC Engineer",
      department: "NOC",
      country: "United States",
    },
  },
  {
    email: "operator@fibernms.com",
    passwordHash: "Operator@123",
    profile: {
      email: "operator@fibernms.com",
      firstName: "Network",
      lastName: "Operator",
      company: "TelecomCo Inc.",
      plan: Plan.PROFESSIONAL,
      role: "Network Engineer",
      department: "Network Operations",
      country: "United Kingdom",
    },
  },
];

// ─── localStorage helpers ─────────────────────────────────────────────────────

const USERS_KEY = "fibernms:users";

function getStoredUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [...SEED_USERS];
    const parsed: StoredUser[] = JSON.parse(raw) as StoredUser[];
    // Merge with seed users (seed users always win on conflict)
    const emails = new Set(parsed.map((u) => u.email));
    const merged = [...parsed];
    for (const seed of SEED_USERS) {
      if (!emails.has(seed.email)) merged.push(seed);
    }
    return merged;
  } catch {
    return [...SEED_USERS];
  }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ─── Zustand Store ────────────────────────────────────────────────────────────

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      currentUser: null,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));

        const users = getStoredUsers();
        const match = users.find(
          (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.passwordHash === password,
        );

        if (!match) {
          set({
            isLoading: false,
            error: "Invalid credentials. Please check your email and password.",
          });
          return false;
        }

        set({
          isAuthenticated: true,
          currentUser: match.profile,
          isLoading: false,
          error: null,
        });
        return true;
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null });
        await new Promise((r) => setTimeout(r, 1000));

        const users = getStoredUsers();
        const exists = users.some(
          (u) => u.email.toLowerCase() === data.email.toLowerCase(),
        );

        if (exists) {
          set({
            isLoading: false,
            error: "An account with this email already exists.",
          });
          return false;
        }

        const newUser: StoredUser = {
          email: data.email,
          passwordHash: data.password,
          profile: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            company: data.company,
            plan: data.plan,
            role: data.jobTitle,
            department: data.department,
            country: data.country,
          },
        };

        saveStoredUsers([...users, newUser]);

        set({
          isAuthenticated: true,
          currentUser: newUser.profile,
          isLoading: false,
          error: null,
        });
        return true;
      },

      logout: () => {
        set({ isAuthenticated: false, currentUser: null, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "fibernms:auth",
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        currentUser: s.currentUser,
      }),
    },
  ),
);
