import type { AuthUser, RegisterData } from "@/store/authStore";
import { useAuthStore } from "@/store/authStore";

export type { RegisterData };

export type AuthState = {
  isAuthenticated: boolean;
  isInitializing: boolean;
  currentUser: AuthUser | null;
  principal: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
};

/**
 * NOC auth hook backed by Zustand + localStorage mock store.
 * Provides isAuthenticated, currentUser, login/register/logout.
 * isInitializing is always false (store hydrates synchronously from localStorage).
 */
export function useAuth(): AuthState {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const currentUser = useAuthStore((s) => s.currentUser);
  const login = useAuthStore((s) => s.login);
  const register = useAuthStore((s) => s.register);
  const logout = useAuthStore((s) => s.logout);

  const principal = currentUser ? currentUser.email : null;

  return {
    isAuthenticated,
    isInitializing: false,
    currentUser,
    principal,
    login,
    register,
    logout,
  };
}
