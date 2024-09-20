import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import image from "../assets/main2.jpeg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axios.post("http://localhost:5001/auth/register", {
        username,
        password,
      });
      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Registration failed. Please try again.");
      }
      console.error("Registration failed:", error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen font-sans flex items-center justify-center bg-gray-200">
      <div className="bg-white shadow-lg rounded-lg flex max-w-4xl w-full overflow-hidden">
        <div className="w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-2 font-sans">Sign up</h2>
          <p className="mb-6 text-gray-600 font-sans">
            Enter your details below to sign up
          </p>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                value={username}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter a username"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Enter a password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-300"
            >
              Sign up
            </button>
          </form>
          <p className=" text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              onClick={() => navigate("/")}
            >
              Log in
            </a>
          </p>
          <p className="text-center text-gray-400 mt-6">&copy; 2025 Rsmit</p>
        </div>
        <div className="w-1/2">
          <img
            src={image}
            alt="Background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
