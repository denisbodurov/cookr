import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  signUp: (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) => Promise<void | { error: string }>;
  signIn: (
    email: string,
    password: string
  ) => Promise<void | { error: string }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

interface User {
  id: string;
  fistName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        const storedAccessToken = localStorage.getItem("accessToken");

        if (storedUser && storedAccessToken) {
          setUser(JSON.parse(storedUser));
          setAccessToken(storedAccessToken);
        }
      } catch (error) {
        console.error("Failed to load storage data", error);
      } finally {
        setLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const signUp = async (
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `${process.env.PUBLIC_HOST}/api/v1/auth/register`,
        {
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password,
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.access_token);

      setUser(response.data.user);
      setAccessToken(response.data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return { error: error.response?.data };
      } else {
        console.error(error);
        return { error: "Something went wrong..." };
      }
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${process.env.PUBLIC_HOST}/api/v1/auth/login`,
        { email: email, password: password }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.access_token);

      setUser(response.data.user);
      setAccessToken(response.data.access_token);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.data.detail === "Invalid credentials") {
          return { error: "Invalid email or password!" };
        } else {
          return { error: error.message };
        }
      } else {
        return { error: "Something went wrong..." };
      }
    }
  };

  const signOut = async () => {
    setUser(null);
    setAccessToken(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        signUp,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
