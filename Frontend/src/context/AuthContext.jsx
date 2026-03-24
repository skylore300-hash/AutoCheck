import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const USERS_STORAGE_KEY = "autocheck_users";
const AUTH_STORAGE_KEY = "autocheck_auth";

// Utilisateurs par défaut pour démo
const DEFAULT_USERS = [
  {
    id: "police_1",
    email: "police@autocheck.cd",
    password: "police123",
    role: "police",
    name: "Agent Police - Kinshasa",
    city: "Kinshasa",
  },
  {
    id: "admin_1",
    email: "admin@autocheck.cd",
    password: "admin123",
    role: "agent",
    name: "Agent Administratif",
    city: "Kinshasa",
  },
  {
    id: "owner_1",
    email: "owner@autocheck.cd",
    password: "owner123",
    role: "owner",
    name: "Jean Proprietaire",
    vehicleCount: 2,
  },
  {
    id: "superadmin_1",
    email: "superadmin@autocheck.cd",
    password: "superadmin123",
    role: "superadmin",
    name: "Super Administrateur",
  },
];

function initializeUsers() {
  const stored = localStorage.getItem(USERS_STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  return JSON.parse(stored);
}

function getStoredAuth() {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [users] = useState(() => initializeUsers());
  const [currentUser, setCurrentUser] = useState(() => getStoredAuth());

  const login = (email, password) => {
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      throw new Error("Email ou mot de passe incorrect");
    }
    const { password: _, ...userWithoutPassword } = user;
    setCurrentUser(userWithoutPassword);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userWithoutPassword));
    return userWithoutPassword;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const isAuthenticated = !!currentUser;

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated,
      login,
      logout,
      users,
    }),
    [currentUser, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated;
}
