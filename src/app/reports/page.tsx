"use client";

import Link from "next/link";
import { BarChart3, Package } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-4 space-y-4">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">Reports</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400">Generate and view comprehensive business reports</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link 
          href="/reports/sales" 
          className="group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Sales Report</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">View sales by date, branch, and payment method</p>
            </div>
          </div>
        </Link>
        
        <Link 
          href="/reports/inventory" 
          className="group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1 text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Inventory Movement Report</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Track inventory movement, purchases, sales, and stock levels</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}