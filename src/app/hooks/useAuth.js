import { createContext, useContext, useState } from "react";
import { AuthService } from "../services/AuthService";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const authenticated = !!AuthService.getCurrentUser();
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

  const login = (username, password) => {
    return new Promise((resolve, reject) => {
      console.log("se viene el user y el pass")
      AuthService.login(username, password).then(
        () => {
          console.log("pasa ok")
          setIsAuthenticated(true);
          resolve();
        }
      ).catch(
        (err) => {
          console.log("pasa mal")
          setIsAuthenticated(false);
          reject(err);
        }
      );
    })
  }

  const logout = () => {
    AuthService.logout();
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}