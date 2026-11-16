import { createContext, useContext, type ReactNode } from "react";
import { api } from "../services/api";
import { useApi } from "../hooks/useApi";
import type { Profile } from "../types";

const ProfileContext = createContext<Profile | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const { data } = useApi(api.getProfile);
  return <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>;
}

/** Returns null until the profile has loaded (or if the API is unreachable). */
export function useProfile() {
  return useContext(ProfileContext);
}
