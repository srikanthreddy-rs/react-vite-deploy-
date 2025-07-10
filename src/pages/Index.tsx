import { useState } from 'react';
import { useAuth } from '@/components/AuthGuard';
import { Header } from '@/components/Header';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { AdminDashboard } from '@/components/AdminDashboard';
import { EnhancedUserDashboard } from '@/components/EnhancedUserDashboard';
import { StoreOwnerDashboard } from '@/components/StoreOwnerDashboard';

const Index = () => {
  const { user } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-heading font-bold text-white mb-4">
              StoreRating Platform
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Professional store rating and review platform for businesses and customers
            </p>
          </div>
          
          <div className="max-w-md mx-auto">
            {authMode === 'login' ? (
              <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
            ) : (
              <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {user.role === 'admin' && <AdminDashboard />}
        {user.role === 'user' && <EnhancedUserDashboard />}
        {user.role === 'store_owner' && <StoreOwnerDashboard />}
      </main>
    </div>
  );
};

export default Index;
