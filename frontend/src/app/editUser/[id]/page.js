"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function EditUser({ params }) {
  const { id } = use(params); // ✅ Corrected use of params

  const router = useRouter();

  const [formData, setFormData] = useState({
    user: "",
    email: "",
    mobile: "",
    age: "",
    interest: "",
  });

  console.log("form data before use effects",formData);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/editusers/${id}`
        );
        const data = await res.json();

        setFormData({
          user: data.user.user || "",
          email: data.user.email || "",
          mobile: data.user.mobile || "",
          age: data.user.age || "",
          interest: data.user.interest?.join(", ") || "",
        });
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/editusers/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("User updated successfully");
        router.push("/");
      } else {
        const errorData = await res.json();
        alert(`Failed: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  console.log("form data before after effects",formData);


  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="user"
            value={formData.user}
            onChange={handleChange}
            placeholder="Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            placeholder="Interests (comma-separated)"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
