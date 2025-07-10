import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  email: string;
  role: string;
  name: string;
  token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, role: string, name: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const normalizeRole = (role: string) => role.toLowerCase();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          ...parsedUser,
          role: normalizeRole(parsedUser.role)
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);



  const verifyAuth = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify', {
        credentials: 'include'
      });
      
      if (response.ok) {
        const userData = await response.json();
        console.log(response)
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        logout();
      }
    } catch (err) {
      logout();
    }
  };
  
  // Update your useEffect
  useEffect(() => {
    verifyAuth();
  }, []);
  const login = (email: string, role: string, name: string, token: string) => {
    const normalizedRole = normalizeRole(role);
    const userData = { email, role: normalizedRole, name, token };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};