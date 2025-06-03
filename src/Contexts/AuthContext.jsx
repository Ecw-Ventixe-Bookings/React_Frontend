/*
I have used ClaudeAi to help me set up this context
this context is used to set up authorization
*/

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const claims = JSON.parse(atob(token.split('.')[1]))
        if (claims.exp * 1000 > Date.now()) {
          setUser(claims);
        } else {
          localStorage.removeItem('token')
        }
      } catch {
        localStorage.removeItem('token')
      }
    }

    setIsLoading(false)
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token)
    const claims = JSON.parse(atob(token.split('.')[1]))
    setUser(claims)
  };

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}