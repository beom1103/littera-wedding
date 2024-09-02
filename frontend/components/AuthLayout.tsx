"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProviderContext } from "@context/auth.context";
import Header from "@components/common/Header";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProviderContext>
        <Header />
        <main className="container mx-auto flex-grow p-4">{children}</main>
      </AuthProviderContext>
    </QueryClientProvider>
  );
};

export default AuthLayout;
