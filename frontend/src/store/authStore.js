import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,

      login: (userData, token) =>
        set({
          user: userData,
          token: token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),
    {
      name: "voyage-auth",
    },
  ),
);

export default useAuthStore;
