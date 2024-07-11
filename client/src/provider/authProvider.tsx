import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { UpdateUser, User } from "../types/state/User";

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  updateProfile: (
    userData: UpdateUser
  ) => Promise<void | { error: string }>;
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
        `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/auth/register`,
        {
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          password: password,
        }
      );

      const mappedUser = {
        id: response.data.user.user_id,
        firstName: response.data.user.first_name,
        lastName: response.data.user.last_name,
        username: response.data.user.username,
        email: response.data.user.email,
        image: response.data.user.image,
      };

      localStorage.setItem("user", JSON.stringify(mappedUser));
      localStorage.setItem("accessToken", response.data.access_token);

      setUser(mappedUser);
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
        `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/auth/login`,
        { email: email, password: password }
      );

      const mappedUser = {
        id: response.data.user.user_id,
        firstName: response.data.user.first_name,
        lastName: response.data.user.last_name,
        username: response.data.user.username,
        email: response.data.user.email,
        image: response.data.user.image,
      };

      localStorage.setItem("user", JSON.stringify(mappedUser));
      localStorage.setItem("accessToken", response.data.access_token);

      setUser(mappedUser);
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

  const updateProfile = async (userData: UpdateUser) => {
    if (user) {
      try {
        await axios.patch(
          `${import.meta.env.VITE_PUBLIC_HOST}/api/v1/users/update-profile`,
          {
            first_name: userData.firstName,
            last_name: userData.lastName,
            image: userData.image,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        const updatedUser = {
          ...user,
          firstName: userData.firstName,
          lastName: userData.lastName,
          image: userData.image,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return { error: error.response?.data };
        } else {
          console.error(error);
          return { error: "Something went wrong..." };
        }
      }
    } else {
      return { error: "User not found" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        updateProfile,
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
