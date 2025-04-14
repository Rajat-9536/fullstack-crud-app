"use client";

import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import Link from "next/link";


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

  console.log("form data before use effects", formData);

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
  console.log("form data before after effects", formData);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Edit User
        </h1>
        <Link
          href={`/`}
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors">
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="user"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Name
            </label>
            <input
              id="user"
              name="user"
              placeholder="John Doe"
              value={formData.user}
              onChange={handleChange}
              required
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="mobile"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              type="number"
              placeholder="1234567890"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              type="number"
              placeholder="25"
              value={formData.age}
              onChange={handleChange}
              required
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="interest"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Interests
            </label>
            <input
              id="interest"
              name="interest"
              placeholder="e.g., Music, Sports"
              value={formData.interest}
              onChange={handleChange}
              required
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
            dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
}
