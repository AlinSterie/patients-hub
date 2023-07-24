import { createContext, useContext } from "react";
import { useState } from "react";
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ retry: true, user: null });

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
}
