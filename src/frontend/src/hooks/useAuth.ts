import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export type AuthState = {
  isAuthenticated: boolean;
  isInitializing: boolean;
  principal: string | null;
  login: () => void;
  logout: () => void;
};

/**
 * Wraps InternetIdentityProvider context with NOC-friendly helpers.
 *
 * - `isAuthenticated`: true when an identity has been loaded (persisted or fresh login)
 * - `principal`: the textual principal of the logged-in user, or null
 * - `login`: opens the Internet Identity popup
 * - `logout`: clears the identity from state + storage
 */
export function useAuth(): AuthState {
  const { identity, login, clear, isInitializing } = useInternetIdentity();

  const isAuthenticated = !!identity;
  const principal = identity ? identity.getPrincipal().toText() : null;

  return {
    isAuthenticated,
    isInitializing,
    principal,
    login,
    logout: clear,
  };
}
