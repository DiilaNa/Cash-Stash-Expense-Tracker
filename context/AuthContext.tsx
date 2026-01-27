import React from "react";
import { useLoader } from "@/hooks/useLoader";
import { auth } from "@/services/firebase";
import { AuthContextType } from "@/types/Auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { showLoader, hideLoader, isLoading } = useLoader();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    showLoader();
    const unsucribe = onAuthStateChanged(auth, (usr) => {
      setUser(usr);
      hideLoader();
    });

    return () => unsucribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading: isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
