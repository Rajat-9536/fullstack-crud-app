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
    <div className="h-screen dark:bg-gray-700 bg-gray-200 pt-12">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg">
        {/* Profile Header */}
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
              src="https://randomuser.me/api/portraits/women/21.jpg"
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                {user.user}
              </h3>
            </div>
          </div>
          {/* Buttons */}
          <div className="flex gap-2 px-2">
            <button className="flex-1 rounded-full bg-blue-600 dark:bg-blue-800 text-white font-bold hover:bg-blue-800 dark:hover:bg-blue-900 px-4 py-2">
              Follow
            </button>
            <button className="flex-1 rounded-full border-2 border-gray-400 dark:border-gray-700 font-semibold text-black dark:text-white px-4 py-2">
              Message
            </button>
          </div>
        </div>

        {/* User Details Section */}
        <div className="px-4 py-4 space-y-3 text-gray-800 dark:text-gray-300">
          <div>
            <span className="text-gray-500 dark:text-gray-400">Email:</span>
            <p className="text-sm">{user.email}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Mobile:</span>
            <p className="text-sm">{user.mobile}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Age:</span>
            <p className="text-sm">{user.age}</p>
          </div>
          <div>
            <span className="text-gray-500 dark:text-gray-400">Interests:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {user.interest?.map((item, index) => (
                <span
                  key={index}
                  className={`${getBadgeColor()} text-white text-xs px-3 py-1 rounded-full`}
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
