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
      AuthService.login(username, password).then(
        () => {
          setIsAuthenticated(true);
          resolve();
        }
      ).catch(
        (err) => {
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