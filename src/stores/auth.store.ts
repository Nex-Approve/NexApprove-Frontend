import { create } from "zustand";
import { persist } from "zustand/middleware";

// ─── Token Storage Keys ─────────────────────────────────────────────────────
const STORAGE_KEY = "nexapprove-auth";

// ─── Types ───────────────────────────────────────────────────────────────────
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;

  /** Replace both tokens at once (login / refresh). */
  setTokens: (tokens: AuthTokens) => void;

  /** Wipe tokens (logout). */
  clearTokens: () => void;

  /** Whether the user currently holds an access token. */
  isAuthenticated: () => boolean;
}

// ─── Store ───────────────────────────────────────────────────────────────────
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,

      setTokens: ({ accessToken, refreshToken }) =>
        set({ accessToken, refreshToken }),

      clearTokens: () => set({ accessToken: null, refreshToken: null }),

      isAuthenticated: () => get().accessToken !== null,
    }),
    {
      name: STORAGE_KEY,
      // Only persist the tokens, not the methods.
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    },
  ),
);
