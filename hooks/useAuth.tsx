'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define the shape of the context
interface AuthContextType {
  isAuthenticated: boolean;
  studentId: string | null;
  login: (token: string, id: string) => void;
  logout: () => void;
  loading: boolean;
}

// Create an empty AuthContext with a placeholder type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check for saved authentication tokens when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    const id = localStorage.getItem('studentId');

    if (token && id) {
      setIsAuthenticated(true);
      setStudentId(id);
    }
    setLoading(false);
  }, []);

  // Log in the user
  const login = (token: string, id: string) => {
    localStorage.setItem('studentToken', token);
    localStorage.setItem('studentId', id);
    setIsAuthenticated(true);
    setStudentId(id);
  };

  // Log out the user
  const logout = () => {
    localStorage.removeItem('studentToken');
    localStorage.removeItem('studentId');
    setIsAuthenticated(false);
    setStudentId(null);
    router.push('/student/login');
  };


  return (
      <AuthContext.Provider value={{ isAuthenticated, studentId, login, logout, loading }}>
  {children}
  </AuthContext.Provider>
);
}

// Custom Hook to Use AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default useAuth;