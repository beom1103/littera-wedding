"use client";
import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import { AuthProvider } from "@rest/auth/auth.dto";
import api from "@api/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { User } from "@rest/user/user.dto";

interface AuthContextProps {
  user?: User;
  login: (provider: AuthProvider) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: undefined,
  login: (provider: AuthProvider) => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProviderContext = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.post("auth/check-auth");

        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setUser(undefined);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(undefined);
      }
    };

    checkAuth();
  }, [router]);

  const login = (provider: AuthProvider) => {
    try {
      window.location.href = `${process.env.NEXT_PUBLIC_LITTERA_BE_URL}/auth/${provider}`;
    } catch (error) {
      setUser(undefined);
    }
  };

  const logout = async () => {
    try {
      await api.post("auth/logout");

      setUser(undefined);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  useEffect(() => {
    const handleRedirect = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        const refreshToken = Cookies.get("refreshToken");

        if (accessToken && refreshToken) {
          router.push("/dashboard");
        }
      } catch (error) {
        setUser(undefined);
      }
    };

    handleRedirect();
  }, [router]);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
