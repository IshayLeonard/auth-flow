import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; token: string } | null;
  login: (email: string, password?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
    token: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, _password?: string) => {
    setIsLoading(true);
    // Simulate API call for authentication
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email.includes("@")) {
          const mockUser = {
            name: email.split("@")[0],
            email,
            token: "mock_jwt_token_" + Math.random().toString(36).substr(2, 9),
          };
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem("auth_user", JSON.stringify(mockUser));
          // Store token specific for genesys cloud or step-up testing if needed
          localStorage.setItem("oidc_token", mockUser.token);
          resolve();
        } else {
          reject(new Error("Invalid email address"));
        }
        setIsLoading(false);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("oidc_token");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
