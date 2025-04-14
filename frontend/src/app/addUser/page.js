"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ message: "", type: "" }); // 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.user) newErrors.user = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.mobile) newErrors.mobile = "Mobile is required";
    if (!formData.age) newErrors.age = "Age is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...formData,
      age: parseInt(formData.age),
      mobile: Number(formData.mobile),
      interest: formData.interest
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i),
    };

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
        payload
      );

      if (res.data?.message) {
        setPopup({ message: res.data.message, type: "success" });
        setFormData({
          user: "",
          email: "",
          mobile: "",
          age: "",
          interest: "",
        });

        setTimeout(() => {
          setPopup({ message: "", type: "" });
          router.push("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Error creating user:", error);

      let message = "Something went wrong. Please try again.";

      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }

      setPopup({ message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => setPopup({ message: "", type: "" });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Add User</h1>
        <Link
          href="/"
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors"
      >
        {["user", "email", "mobile", "age", "interest"].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white capitalize">
              {field === "user" ? "Name" : field === "interest" ? "Interests (comma separated)" : field}
            </label>
            <input
              name={field}
              type={field === "email" ? "email" : field === "age" || field === "mobile" ? "number" : "text"}
              value={formData[field]}
              onChange={handleChange}
              className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white ${loading ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-800"} focus:ring-4 focus:outline-none 
          focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center 
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>

      {/* ✅ Popup */}
      {popup.message && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white max-w-sm w-full p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closePopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
            <p className={`text-center font-semibold ${popup.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {popup.message}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
