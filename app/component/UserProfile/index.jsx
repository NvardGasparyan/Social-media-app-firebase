"use client";

import { useState } from "react";
import { useUser } from "@/app/context/UserContext";
import defaultImage from "../../../public/user-avatar.png";
import Image from "next/image";
import CreatePost from "../CreatePost";

const UserProfile = () => {
  const { user } = useUser();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
  });

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-gray-900">
        Loading...
      </div>
    );
  }

  if (!formData.firstName && !formData.lastName) {
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
    });
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <div className="flex bg-gray-900 min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full mx-auto my-8">
        <div className="flex items-center space-x-4">
          <div className="relative w-24 h-24">
            <Image
              src={defaultImage}
              alt={`${user.firstName} ${user.lastName}`}
              layout="fill"
              className="rounded-full object-cover border-4 border-gray-700 shadow-md"
            />
          </div>
          <div className="text-white">
            {editMode ? (
              <form onSubmit={handleSubmit} className="flex flex-col">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="bg-gray-700 text-white w-full px-3 py-2 rounded mb-3"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="bg-gray-700 text-white w-full px-3 py-2 rounded mb-3"
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                  className="bg-gray-700 text-white w-full px-3 py-2 rounded mb-3"
                  required
                />
                <div className="flex justify-end space-x-3">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-all duration-300"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-500 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h1 className="text-3xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            )}
          </div>
        </div>
        {!editMode && (
          <div className="mt-6">
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-500 transition-all duration-300"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
      <CreatePost />
    </div>
  );
};

export default UserProfile;
