"use client";

import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";

const getBadgeColor = () => {
  const colors = [
    "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
    "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300",
    "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300",
    "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-300",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_API_URL + "/api/users/userslist")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="flex justify-between align-center mb-6">
          <h1 className="text-2xl font-bold text-center text-gray-800">
            User List
          </h1>
          <Link
            href={`/addUser`}
            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Add User
          </Link>
        </div>
        <div className="bg-white p-4 rounded-lg border border-neutral-200 hover:border-neutral-300 transition-colors">
          {users?.length > 0 ? (
            <div className="space-y-4">
              {users.map((user) => (
                <div key={user._id} className="border border-neutral-200 rounded-lg p-4 hover:border-neutral-300 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-sm font-medium">{user.user}</span>
                  </div>
                  <div className="flex">
                    <Link href={`/users/${user._id}`}>
                      <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-green-900 dark:text-green-300">
                        View
                      </span>
                    </Link>
                    <Link href={`/editUser/${user._id}`}>
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm dark:bg-yellow-900 dark:text-yellow-300">
                        Edit
                      </span>
                    </Link>
                  </div>
                </div>
                <h4 className="font-medium mb-2">{user.email}</h4>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <span>
                    <span>Mobile No:</span>
                    {user.mobile}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Interests:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {user.interest?.map((item, index) => (
                        <span
                          key={index}
                          className={`${getBadgeColor()} text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">
              No User List Found
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default UserList;
