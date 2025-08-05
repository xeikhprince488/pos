'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PlusCircle, Edit2, Trash2, UserCog, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardHeader className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600 dark:text-green-400" />
                  User Management
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage system users and their permissions</p>
              </div>
              <Button asChild className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-8 px-3 text-sm font-medium">
                <Link href="/users/add">
                  <PlusCircle className="h-3 w-3 mr-1" />
                  Add User
                </Link>
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Users Table */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Users ({users.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {users.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 dark:text-gray-400 text-sm">No users found.</p>
                <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Add your first user to get started.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
                      <th className="py-2 text-xs font-medium uppercase tracking-wider">Name</th>
                      <th className="py-2 text-xs font-medium uppercase tracking-wider">Email</th>
                      <th className="py-2 text-xs font-medium uppercase tracking-wider">Role</th>
                      <th className="py-2 text-xs font-medium uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id || index}
                        className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        <td className="py-3 text-gray-900 dark:text-gray-100 font-medium">{user.name}</td>
                        <td className="py-3 text-gray-600 dark:text-gray-300">{user.email}</td>
                        <td className="py-3">
                          <Badge variant="secondary" className="text-xs">
                            {user.role}
                          </Badge>
                        </td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-green-500 hover:text-green-700 hover:bg-green-50">
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-50">
                              <UserCog className="h-3 w-3" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
