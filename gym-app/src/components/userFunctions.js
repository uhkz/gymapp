// src/userFunctions.js

import { useState, useEffect } from "react";
import axios from "axios";

export const useUser = () => {
  const [user, setUser] = useState(null);

  const fetchUserData = async (userId) => {
    if (!userId) return null;
    try {
      const response = await axios.get(`http://localhost:5001/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      fetchUserData(userId).then(setUser);
    }
  }, []);

  const handleLogin = async (userId) => {
    const userData = await fetchUserData(userId);
    if (userData) {
      setUser(userData);
    }
  };

  return { user, handleLogin };
};
