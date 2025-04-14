"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

// Function to generate a random color from a list
const getBadgeColor = () => {
  const colors = [
    "bg-red-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-indigo-500",
    "bg-teal-500",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/editusers/${id}`)
        .then((res) => setUser(res.data.user))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading user details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">User Details</h1>
        <div className="space-y-3">
          <div>
            <span className="text-gray-500">Name:</span>
            <p className="text-lg text-gray-800">{user.user}</p>
          </div>
          <div>
            <span className="text-gray-500">Email:</span>
            <p className="text-lg text-gray-800">{user.email}</p>
          </div>
          <div>
            <span className="text-gray-500">Mobile:</span>
            <p className="text-lg text-gray-800">{user.mobile}</p>
          </div>
          <div>
            <span className="text-gray-500">Age:</span>
            <p className="text-lg text-gray-800">{user.age}</p>
          </div>
          <div>
            <span className="text-gray-500">Interests:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.interest?.map((item, index) => (
                <span
                  key={index}
                  className={`${getBadgeColor()} text-white text-sm px-3 py-1 rounded-full`}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
