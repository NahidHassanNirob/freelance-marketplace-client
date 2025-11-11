import { useState, useEffect } from "react";
import { AuthContext } from "../hooks/index.jsx";

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse stored user:", error);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock login
    if (password.length < 6) {
      throw new Error("Invalid credentials");
    }
    
    const mockUser = {
      uid: `user_${Date.now()}`,
      email,
      displayName: email.split("@")[0],
      photoURL: `https://ui-avatars.com/api/?name=${email.split("@")[0]}`,
    };
    
    setUser(mockUser);
    localStorage.setItem("authUser", JSON.stringify(mockUser));
  };

  const register = async (name, email, photoURL, password) => {
    // Mock validation
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      throw new Error(
        "Password must be at least 6 characters, with one uppercase and one lowercase letter"
      );
    }

    const mockUser = {
      uid: `user_${Date.now()}`,
      email,
      displayName: name,
      photoURL: photoURL || `https://ui-avatars.com/api/?name=${name}`,
    };

    setUser(mockUser);
    localStorage.setItem("authUser", JSON.stringify(mockUser));
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("authUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
