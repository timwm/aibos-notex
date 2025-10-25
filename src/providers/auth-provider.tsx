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
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<AuthStatus>(() =>
    initialError ? "error" : initialUser ? "authenticated" : "unauthenticated",
  );

  useEffect(() => {
    // Listen for auth changes on the client
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const user = session?.user ?? null;

      setUser(user);
      setStatus(user ? "authenticated" : "unauthenticated");
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

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
