'use client';

import Link from 'next/link';
import {
  PlusCircle,
  UserPlus,
  BarChart4,
  Layers,
} from 'lucide-react';

export default function QuickAccess() {
  return (
   <div className="bg-white dark:bg-black text-gray-800 dark:text-white p-4 rounded-2xl shadow-md text-sm w-full h-full flex flex-col justify-between">

      <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 border-b pb-2 dark:border-gray-700">
        Quick Access
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {/* Create Order */}
        <Link
          href="/sales/create"
          className="flex flex-col items-center bg-teal-50 dark:bg-teal-900 hover:bg-teal-100 dark:hover:bg-teal-800 text-teal-900 dark:text-teal-100 p-3 rounded-xl shadow-sm transition"
        >
          <PlusCircle className="w-5 h-5 mb-1" />
          <span className="font-medium text-sm">Create Order</span>
          <p className="text-[10px] text-gray-500 dark:text-gray-300 text-center mt-1">
            Start a new sale quickly.
          </p>
        </Link>

        {/* Add Customer */}
        <Link
          href="/customers/add"
          className="flex flex-col items-center bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 text-green-900 dark:text-green-100 p-3 rounded-xl shadow-sm transition"
        >
          <UserPlus className="w-5 h-5 mb-1" />
          <span className="font-medium text-sm">Add Customer</span>
          <p className="text-[10px] text-gray-500 dark:text-gray-300 text-center mt-1">
            Register a new customer.
          </p>
        </Link>

        {/* Generate Report */}
        <Link
          href="/reports"
          className="flex flex-col items-center bg-emerald-50 dark:bg-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-emerald-900 dark:text-emerald-100 p-3 rounded-xl shadow-sm transition"
        >
          <BarChart4 className="w-5 h-5 mb-1" />
          <span className="font-medium text-sm">Generate Report</span>
          <p className="text-[10px] text-gray-500 dark:text-gray-300 text-center mt-1">
            View report insights.
          </p>
        </Link>

        {/* Manage Inventory */}
        <Link
          href="/inventory"
          className="flex flex-col items-center bg-green-50 dark:bg-green-900 hover:bg-green-100 dark:hover:bg-green-800 text-green-900 dark:text-green-100 p-3 rounded-xl shadow-sm transition"
        >
          <Layers className="w-5 h-5 mb-1" />
          <span className="font-medium text-sm">Manage Inventory</span>
          <p className="text-[10px] text-gray-500 dark:text-gray-300 text-center mt-1">
            Update stock items.
          </p>
        </Link>
      </div>
    </div>
  );
}
