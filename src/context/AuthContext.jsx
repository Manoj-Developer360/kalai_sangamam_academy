import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async () => {
    const token = localStorage.getItem('ks_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const { data } = await authService.me();
      setUser(data.data.user);
      setProfile(data.data.profile);
    } catch {
      localStorage.removeItem('ks_token');
      localStorage.removeItem('ks_user');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const login = async (username, password) => {
    const { data } = await authService.login(username, password);
    const { token, user: loggedInUser, profile: loggedInProfile } = data.data;
    localStorage.setItem('ks_token', token);
    localStorage.setItem('ks_user', JSON.stringify(loggedInUser));
    setUser(loggedInUser);
    setProfile(loggedInProfile);
    return loggedInUser;
  };

  const logout = () => {
    localStorage.removeItem('ks_token');
    localStorage.removeItem('ks_user');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, login, logout, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
