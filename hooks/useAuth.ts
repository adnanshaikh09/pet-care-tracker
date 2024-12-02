import { useState } from "react";
import { auth } from "../constants/firebase";

const useAuth = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await auth.signInWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  const logout = async () => {
    try {
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return { user, login, signup, logout };
};

export default useAuth;
