"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/api/users/userslist")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between align-center">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          User List
        </h1>
        <Link
          href={`/addUser`}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50"
        >
          Add User
        </Link>
      </div>

      {users?.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white shadow-md rounded-xl p-4 flex flex-col space-y-3 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-lg font-semibold text-blue-600">
                {user.user}
              </h2>
              <div className="flex gap-3 text-sm text-blue-500 font-medium">
                <Link href={`/user/${user._id}`} className="hover:underline">
                  Profile
                </Link>
                <Link
                  href={`/editUser/${user._id}`}
                  className="hover:underline"
                >
                  Edit
                </Link>
                <Link href={`/users/${user._id}`} className="hover:underline">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No User List Found</p>
      )}
    </div>
  );
};

export default UserList;
