import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { AdminUser } from '../types';

interface AdminAuthContextType {
  user: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkSession() {
      setIsLoading(true);

      if (isSupabaseConfigured) {
        try {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            // Fetch profile role
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();

            const role = profile?.role || 'admin';
            if (role === 'admin') {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                role: 'admin'
              });
            } else {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        } catch (err) {
          console.error('Supabase Auth Session error:', err);
        }
      } else {
        // Fallback local session check for dev preview
        const storedAdmin = localStorage.getItem('cleanza_admin_auth');
        if (storedAdmin) {
          try {
            setUser(JSON.parse(storedAdmin));
          } catch {
            setUser(null);
          }
        }
      }

      setIsLoading(false);
    }

    checkSession();

    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            role: 'admin'
          });
        } else {
          setUser(null);
        }
      });

      return () => {
        authListener.subscription.unsubscribe();
      };
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: pass,
        });

        if (error || !data.user) {
          setIsLoading(false);
          return { success: false, error: error?.message || 'Ungültige Anmeldedaten' };
        }

        // Verify admin role in profiles table
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        const role = profile?.role || 'admin';

        if (role !== 'admin') {
          await supabase.auth.signOut();
          setIsLoading(false);
          return { success: false, error: 'Keine Admin-Berechtigung für dieses Konto.' };
        }

        const adminUser: AdminUser = {
          id: data.user.id,
          email: data.user.email || email,
          role: 'admin'
        };

        setUser(adminUser);
        setIsLoading(false);
        return { success: true };
      } catch (err: any) {
        setIsLoading(false);
        return { success: false, error: err?.message || 'Anmeldefehler' };
      }
    } else {
      // Local fallback auth check (Default Admin Credentials: admin@duaari-gebaeudereinigung.de / Admin123!)
      if (
        (email.toLowerCase() === 'admin@duaari-gebaeudereinigung.de' || email.toLowerCase() === 'admin') &&
        (pass === 'Admin123!' || pass === 'admin' || pass === '123456')
      ) {
        const adminUser: AdminUser = {
          id: 'admin-local-1',
          email: 'admin@duaari-gebaeudereinigung.de',
          role: 'admin'
        };
        localStorage.setItem('cleanza_admin_auth', JSON.stringify(adminUser));
        setUser(adminUser);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { 
          success: false, 
          error: 'E-Mail oder Passwort falsch. Standard Admin: admin@duaari-gebaeudereinigung.de / Admin123!' 
        };
      }
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('cleanza_admin_auth');
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
