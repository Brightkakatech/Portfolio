import { createContext, useContext } from "react";

/**
 * Shared sign-in state. AuthProvider fills it in; any component can read it
 * with useAuth() instead of passing the user down through every page.
 */
export const AuthContext = createContext({
  user: null,
  isOwner: false,
  loading: true,
});

/**
 * Gives a component the current sign-in state.
 * @returns {{ user: object | null, isOwner: boolean, loading: boolean }}
 */
export function useAuth() {
  return useContext(AuthContext);
}
