
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee' | 'hr';
  avatar?: string;
  department?: string;
  position?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: authUser, signOut } = useAuth();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (authUser) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single();

          if (profile) {
            setUser({
              id: profile.id,
              name: `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || 'User',
              email: profile.email || authUser.email || '',
              role: profile.role || 'employee',
              avatar: profile.avatar_url
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUserProfile();
  }, [authUser]);

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  const value = {
    user,
    setUser,
    isAuthenticated: !!authUser,
    logout,
    loading
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
