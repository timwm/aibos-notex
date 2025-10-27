"use client";

import {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { User } from "@supabase/supabase-js";

import { createClient } from "~/utils/supabase/client";

type AuthStatus = "authenticated" | "unauthenticated" | "error";

type AuthContextType = {
  user: User | null;
  status: AuthStatus;
  isLoading: boolean;
  initialError?: string;
  isAuthenticated: boolean;
  isAuthErrored: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  status: "unauthenticated",
  isLoading: true,
  isAuthErrored: false,
});

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({
  children,
  initialUser,
  initialError,
}: {
  initialUser: AuthContextType["user"];
  initialError?: string;
  children: ReactNode;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<AuthContextType["user"]>(initialUser);
  // If there's an initial error but no user, we should still check the client-side session
  const [isLoading, setIsLoading] = useState(
    !initialUser && Boolean(initialError),
  );
  const [status, setStatus] = useState<AuthStatus>(() =>
    initialError ? "error" : initialUser ? "authenticated" : "unauthenticated",
  );

  useEffect(() => {
    let mounted = true;

    // If there's no initial user, check the session on mount
    // This handles the case where server-side session check fails but client-side succeeds

    // Don't treat "no session" as a hard error - let the client check
    // This prevents issues on first load after login where server-side
    // may not have access to the latest cookies yet
    // if (!initialUser) {
    //   supabase.auth.getSession().then(({ data: { session } }) => {
    //     if (!mounted) return;

    //     const user = session?.user ?? null;

    //     setUser(user);
    //     setStatus(user ? "authenticated" : "unauthenticated");
    //     setIsLoading(false);
    //   });
    // }

    // Listen for auth changes on the client
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;

      const user = session?.user ?? null;

      setUser(user);
      setStatus(user ? "authenticated" : "unauthenticated");
      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, initialUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        initialError,
        isLoading,
        isAuthenticated: status === "authenticated",
        isAuthErrored: Boolean(status === "error"),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
