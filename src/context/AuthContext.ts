import { createContext, useContext } from "react";
import type { User } from "../types";

/** What every component can read about the current sign-in. */
export interface AuthState {
  user: User | null;
  isOwner: boolean;
  loading: boolean;
}

/**
 * Shared sign-in state. AuthProvider fills it in; any component can read it
 * with useAuth() instead of passing the user down through every page.
 */
export const AuthContext = createContext<AuthState>({
  user: null,
  isOwner: false,
  loading: true,
});

/** Gives a component the current sign-in state. */
export function useAuth(): AuthState {
  return useContext(AuthContext);
}
