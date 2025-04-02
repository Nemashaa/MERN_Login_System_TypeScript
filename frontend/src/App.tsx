import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes";
import "./utils/axiosInterceptor"; // Ensure the interceptor is imported
import useAuthStore from "./store/authStore";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { checkAuth, refreshAccessToken } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      await refreshAccessToken();
      await checkAuth();
    };
    initializeAuth();
  }, [checkAuth, refreshAccessToken]);

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <AppRoutes /> {/* Navbar is removed here to prevent duplication */}
    </QueryClientProvider>
  );
};

export default App;