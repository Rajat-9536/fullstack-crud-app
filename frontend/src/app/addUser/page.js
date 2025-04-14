"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddUser() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    mobile: "",
    age: "",
    interest: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      age: parseInt(formData.age),
      mobile: Number(formData.mobile),
      interest: formData.interest.split(",").map((i) => i.trim()),
    };

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users`, payload);
      router.push("/");
    } catch (error) {
      console.error("Error creating user:", error.response?.data || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Add User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="user"
            placeholder="Name"
            value={formData.user}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="mobile"
            type="number"
            placeholder="Mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="interest"
            placeholder="Interests (comma-separated)"
            value={formData.interest}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
