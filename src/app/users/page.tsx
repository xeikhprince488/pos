'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, UserCog } from 'lucide-react';

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link
          href="/users/add"
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        {users.length === 0 ? (
          <p className="text-gray-500">No users found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-200 text-gray-600">
                <th className="py-3">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id || index}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="py-3">{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                      {user.role}
                    </span>
                  </td>
                  <td className="text-right space-x-2">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Edit2 size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <UserCog size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
