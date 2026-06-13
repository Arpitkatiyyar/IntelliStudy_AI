import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const token = localStorage.getItem("token") || user?.token;

    if (!user || !token) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      return null;
    }

    return { ...user, token };
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    if (userData?.token) {
      localStorage.setItem("token", userData.token);
    }

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
