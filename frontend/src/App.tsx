import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import "./utils/axiosInterceptor"; // Ensure the interceptor is imported
import useAuthStore from "./store/authStore";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await checkAuth(); // Validate the user's authentication state
      } catch (error) {
        console.error("Error during authentication initialization:", error);
      }
    };
    initializeAuth();
  }, [checkAuth]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <AppRoutes />
    </QueryClientProvider>
  );
};

export default App;