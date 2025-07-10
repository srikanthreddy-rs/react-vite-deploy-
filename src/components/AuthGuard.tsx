import { useEffect, useState } from 'react';
import { authService, type User, type UserRole } from '@/lib/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, requiredRole, fallback }: AuthGuardProps) => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  
  useEffect(() => {
    const checkAuth = () => {
      setUser(authService.getCurrentUser());
    };
    
    // Listen for auth changes
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);
  
  if (!user) {
    return fallback || null;
  }
  
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-2">Access Denied</h1>
          <p className="text-muted-foreground">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(authService.getCurrentUser());
  
  useEffect(() => {
    const checkAuth = () => {
      setUser(authService.getCurrentUser());
    };
    
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);
  
  const login = async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setUser(user);
      window.dispatchEvent(new Event('auth-change'));
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  const signup = async (userData: Omit<User, 'id' | 'createdAt' | 'role'>) => {
    try {
      const user = await authService.signup(userData);
      setUser(user);
      window.dispatchEvent(new Event('auth-change'));
      return user;
    } catch (error) {
      throw error;
    }
  };
  
  const logout = () => {
    authService.logout();
    setUser(null);
    window.dispatchEvent(new Event('auth-change'));
  };
  
  return { user, login, signup, logout };
};