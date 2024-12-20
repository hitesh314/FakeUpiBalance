import { createContext, useContext } from "react";
import { signIn } from "next-auth/react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const googleSignIn = async () => {
    await signIn("google");
  };

  return (
    <AuthContext.Provider value={{ googleSignIn }}>
      {children}
      
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
