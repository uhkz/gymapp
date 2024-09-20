import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState({
    email: localStorage.getItem("email") || "dummyemail@example.com",
    name: localStorage.getItem("name") || "John",
    lastname: localStorage.getItem("lastname") || "Doe",
    username: localStorage.getItem("username") || "johndoe",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/users/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profilePicture", e.target.profilePicture.files[0]);

    try {
      const response = await axios.post(
        `http://localhost:5001/users/profile-picture/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser({ ...user, profilePicture: response.data.profilePicture });
      setImagePreview(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("Request data:", error.request);
      } else {
        console.error("Error message:", error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    localStorage.setItem(name, value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-light text-gray-800 mb-6">Profile Page</h1>
        <div className="relative group w-32 h-32 mx-auto mb-4">
          {user.profilePicture ? (
            <img
              src={`http://localhost:5001/${user.profilePicture}`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-500 flex items-center justify-center text-4xl text-white">
              {user.username && user.username[0].toUpperCase()}
            </div>
          )}
          <button
            className="absolute inset-0 w-full h-full rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => setShowModal(true)}
          >
            Choose File
          </button>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <label className="absolute -top-3.5 left-3 px-1 bg-gray-100 text-sm text-gray-600">
              USERNAME
            </label>
            <div className="w-full px-4 py-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600">
              {user.username}
            </div>
          </div>
          <div className="relative">
            <label className="absolute -top-3.5 left-3 px-1 bg-gray-100 text-sm text-gray-600">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-3.5 left-3 px-1 bg-gray-100 text-sm text-gray-600">
              NAME
            </label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="relative">
            <label className="absolute -top-3.5 left-3 px-1 bg-gray-100 text-sm text-gray-600">
              LASTNAME
            </label>
            <input
              type="text"
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition-colors duration-300"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/home")}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
          >
            Home
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-xl mb-4">Upload New Profile Picture</h2>
            <form onSubmit={handleUpload}>
              <input
                type="file"
                name="profilePicture"
                onChange={handleImageChange}
                className="mb-4"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
                />
              )}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition-colors duration-300"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
