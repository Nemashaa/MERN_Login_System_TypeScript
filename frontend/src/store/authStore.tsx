import { create } from "zustand";
import axios from 'axios';
import type { User } from '../interfaces/User'; // Use `type` for type-only import

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoggedIn: false,

  setUser: (user) => set({ user, isLoggedIn: !!user }),

  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  checkAuth: async () => {
    try {
      const { data } = await axios.get<User>('/profile', { withCredentials: true });
      set({ user: data, isLoggedIn: true });
    } catch {
      set({ user: null, isLoggedIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post('/logout', {}, { withCredentials: true }); // Call the logout API
      set({ user: null, isLoggedIn: false }); // Clear all auth-related state
    } catch (error) {
      console.error("Logout error:", error);
    }
  },
}));

export default useAuthStore;