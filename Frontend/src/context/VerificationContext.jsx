import { createContext, useContext, useMemo, useState } from "react";

const STORAGE_KEY = "autocheck_verifications";

const VerificationContext = createContext(null);

function safeReadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function VerificationProvider({ children }) {
  const [history, setHistory] = useState(() => safeReadHistory());

  const addVerification = (item) => {
    setHistory((prev) => {
      const next = [item, ...prev].slice(0, 200);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setHistory([]);
  };

  const value = useMemo(
    () => ({
      history,
      addVerification,
      clearHistory,
    }),
    [history]
  );

  return <VerificationContext.Provider value={value}>{children}</VerificationContext.Provider>;
}

export function useVerification() {
  const ctx = useContext(VerificationContext);
  if (!ctx) {
    throw new Error("useVerification must be used inside VerificationProvider");
  }
  return ctx;
}
