'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import RecentActivity from "@/components/RecentActivity";
import QuickAccess from '@/components/QuickAccess';
import {
  ShoppingCart,
  Package,
  ClipboardList,
  ClipboardCheck,
  Users,
  FileBarChart,
  Settings,
  Download,
  AlertTriangle,
  Sun,
  MoonStar,
  Bell,
  User,
  TrendingUp,
  DollarSign,
  Activity,
  Search,
} from 'lucide-react';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const navItems = [{ name: '', path: '/settings', icon: Settings }];

const lowStockItems = [
  { name: 'Mouse', quantity: 2 },
  { name: 'Keyboard', quantity: 1 },
  { name: 'USB Cable', quantity: 3 },
];

const outOfStockItems = [
  { name: 'HDMI Cable', quantity: 0 },
  { name: 'Laptop Charger', quantity: 0 },
];

const topProducts = [
  { name: 'Wireless Mouse', sales: 1240 },
  { name: 'Gaming Keyboard', sales: 980 },
  { name: 'Laptop Stand', sales: 860 },
  { name: 'Monitor 24"', sales: 750 },
];

const salesData = [
  { name: 'Mon', sales: 1200 },
  { name: 'Tue', sales: 1500 },
  { name: 'Wed', sales: 1700 },
  { name: 'Thu', sales: 1600 },
  { name: 'Fri', sales: 1800 },
  { name: 'Sat', sales: 2000 },
  { name: 'Sun', sales: 2200 },
];

// Mock data for dashboard metrics
const todaysSales = 2450;
const totalOrders = 127;
const productsSold = 89;
const avgOrderValue = 19.29;

export default function DashboardPage() {
  const pathname = usePathname();
  const [user, setUser] = useState({ name: 'Admin' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800 transition-all duration-500">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(34,197,94,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-2 space-y-2">
        {/* Professional Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="group"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.12)] dark:shadow-[0_8px_30px_rgb(34,197,94,0.08)] hover:shadow-[0_12px_40px_rgb(34,197,94,0.18)] dark:hover:shadow-[0_12px_40px_rgb(34,197,94,0.12)] transition-all duration-300">
            {/* Enhanced Gradient Border */}
            <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-green-500/25 via-white/15 to-emerald-500/25 dark:from-green-500/20 dark:via-white/8 dark:to-emerald-500/20">
              {/* Glass Background */}
              <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl" />
            </div>

            <div className="relative z-10 p-3">
              <div className="flex items-center justify-between">
                {/* Left Side - Title and Icon */}
                <div className="flex items-center space-x-2">
                  {/* Dashboard Icon/Badge */}
                  <div className="relative group/icon">
                    <div className="p-1 rounded-md bg-gradient-to-br from-green-400/10 via-green-300/5 to-green-400/10 group-hover/icon:from-green-400/15 group-hover/icon:to-green-400/15 transition-all duration-300">
                      <Activity className="w-3 h-3 text-green-500" />
                    </div>
                    {/* Subtle glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-green-500/20 blur-xl opacity-0 group-hover/icon:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Title Section */}
                  <div className="space-y-1">
                    <h1 className="relative group/title">
                      <span className="text-base font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white tracking-tight group-hover/title:from-green-600 group-hover/title:via-green-500 group-hover/title:to-emerald-600 dark:group-hover/title:from-green-400 dark:group-hover/title:via-green-300 dark:group-hover/title:to-emerald-400 transition-all duration-500">
                        POS Dashboard
                      </span>
                      {/* Subtle underline effect */}
                      <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-green-400 to-emerald-500 group-hover/title:w-full transition-all duration-500" />
                    </h1>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                      Daily business overview
                    </p>
                  </div>
                </div>

                {/* Right Side - Stats */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900 dark:text-white">
                      Store Status
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      🟢 Open • Today
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out opacity-0 group-hover:opacity-100" />
          </div>
        </motion.div>

        {/* Primary Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatCard
            title="Today's Sales"
            value={`$${todaysSales.toLocaleString()}`}
            trend="+12.5% from yesterday"
            trendUp={true}
            icon={DollarSign}
            delay={0.1}
          />
          <StatCard
            title="Total Orders"
            value={totalOrders.toString()}
            trend="+8.2% from yesterday"
            trendUp={true}
            icon={ShoppingCart}
            delay={0.2}
          />
          <StatCard
            title="Products Sold"
            value={productsSold.toString()}
            trend="+15.3% from yesterday"
            trendUp={true}
            icon={Package}
            delay={0.3}
          />
          <StatCard
            title="Avg. Order Value"
            value={`$${avgOrderValue.toFixed(2)}`}
            trend="+5.7% from yesterday"
            trendUp={true}
            icon={TrendingUp}
            delay={0.4}
          />
        </div>

        {/* Secondary Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          <StatCard
            title="Low Stock Items"
            value={lowStockItems.length.toString()}
            trend="Need attention"
            trendUp={false}
            icon={AlertTriangle}
            delay={0.5}
          />
          <StatCard
            title="Out of Stock"
            value={outOfStockItems.length.toString()}
            trend="Requires restocking"
            trendUp={false}
            icon={Package}
            delay={0.6}
          />
          <StatCard
            title="Active Customers"
            value="127"
            trend="This week"
            trendUp={true}
            icon={Users}
            delay={0.7}
          />
          <StatCard
            title="Revenue Growth"
            value="+18.2%"
            trend="This month"
            trendUp={true}
            icon={TrendingUp}
            delay={0.8}
          />
        </div>

        {/* Analytics Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="group"
        >
          <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.12)] dark:shadow-[0_8px_30px_rgb(34,197,94,0.08)] hover:shadow-[0_12px_40px_rgb(34,197,94,0.18)] dark:hover:shadow-[0_12px_40px_rgb(34,197,94,0.12)] transition-all duration-300">
            {/* Enhanced Gradient Border */}
            <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-green-500/25 via-white/15 to-emerald-500/25 dark:from-green-500/20 dark:via-white/8 dark:to-emerald-500/20">
              {/* Glass Background */}
              <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl" />
            </div>

            <div className="relative z-10 p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Sales Analytics
                </h3>
                <div className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-md">
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">
                    Last 7 Days
                  </span>
                </div>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                    <XAxis 
                      dataKey="name" 
                      stroke="#6b7280" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#6b7280" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '16px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        backdropFilter: 'blur(16px)'
                      }}
                      formatter={(value) => [`$${value}`, 'Sales']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      stroke="url(#salesGradient)" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#10b981', strokeWidth: 2, fill: '#ffffff' }}
                    />
                    <defs>
                      <linearGradient id="salesGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="#059669" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top Products & Low Stock Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          {/* Top Products */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.12)] dark:shadow-[0_8px_30px_rgb(34,197,94,0.08)] hover:shadow-[0_12px_40px_rgb(34,197,94,0.18)] dark:hover:shadow-[0_12px_40px_rgb(34,197,94,0.12)] transition-all duration-300">
              {/* Enhanced Gradient Border */}
              <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-green-500/25 via-white/15 to-emerald-500/25 dark:from-green-500/20 dark:via-white/8 dark:to-emerald-500/20">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl" />
              </div>

              <div className="relative z-10 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Top Products
                  </h3>
                  <div className="px-2 py-0.5 bg-green-50 dark:bg-green-900/20 rounded-md">
                    <span className="text-xs font-medium text-green-700 dark:text-green-400">
                      Best Sellers
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {topProducts.map((item, idx) => (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 + idx * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-center justify-between p-2 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-md border border-white/30 dark:border-gray-600/30 hover:bg-white/80 dark:hover:bg-gray-600/80 transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex items-center space-x-2">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-white font-bold text-xs shadow-lg ${
                            idx === 0 ? 'bg-gradient-to-br from-yellow-500 to-orange-500' :
                            idx === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-600' :
                            idx === 2 ? 'bg-gradient-to-br from-orange-600 to-red-500' :
                            'bg-gradient-to-br from-blue-500 to-purple-600'
                          }`}
                        >
                          {idx + 1}
                        </motion.div>
                        <div>
                          <h4 className="font-medium text-xs text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{item.sales} units</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-xs text-gray-900 dark:text-white">{item.sales}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">Sales</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Low Stock Alert */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(239,68,68,0.12)] dark:shadow-[0_8px_30px_rgb(239,68,68,0.08)] hover:shadow-[0_12px_40px_rgb(239,68,68,0.18)] dark:hover:shadow-[0_12px_40px_rgb(239,68,68,0.12)] transition-all duration-300">
              {/* Enhanced Gradient Border */}
              <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-red-500/25 via-white/15 to-orange-500/25 dark:from-red-500/20 dark:via-white/8 dark:to-orange-500/20">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl" />
              </div>

              <div className="relative z-10 p-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    Low Stock Alerts
                  </h3>
                  <div className="px-2 py-0.5 bg-red-50 dark:bg-red-900/20 rounded-md">
                    <span className="text-xs font-medium text-red-700 dark:text-red-400">
                      {lowStockItems.length + outOfStockItems.length} Alerts
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {[...lowStockItems, ...outOfStockItems].slice(0, 5).map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className={`p-2 rounded-md border transition-all duration-300 cursor-pointer ${
                        item.quantity === 0
                          ? 'bg-red-50/80 dark:bg-red-900/30 border-red-200/60 dark:border-red-700/60 hover:bg-red-100/80 dark:hover:bg-red-800/40'
                          : 'bg-yellow-50/80 dark:bg-yellow-900/30 border-yellow-200/60 dark:border-yellow-700/60 hover:bg-yellow-100/80 dark:hover:bg-yellow-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <motion.div 
                            whileHover={{ scale: 1.1 }}
                            className={`w-6 h-6 rounded-md flex items-center justify-center shadow-lg ${
                              item.quantity === 0
                                ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
                                : 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
                            }`}
                          >
                            {item.quantity === 0 ? <AlertTriangle size={12} /> : <Package size={12} />}
                          </motion.div>
                          <div>
                            <h4 className="font-medium text-xs text-gray-900 dark:text-white">{item.name}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                              {item.quantity} units
                            </p>
                          </div>
                        </div>
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.3 + index * 0.1 }}
                          className={`px-3 py-1 rounded-lg text-xs font-bold ${
                            item.quantity === 0
                              ? 'bg-red-500/20 text-red-700 dark:text-red-400 border border-red-300/50 dark:border-red-600/50'
                              : 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 border border-yellow-300/50 dark:border-yellow-600/50'
                          }`}
                        >
                          {item.quantity === 0 ? 'Out of Stock' : 'Low Stock'}
                        </motion.div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-2 p-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white rounded-md font-medium hover:from-green-600 hover:via-emerald-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl text-xs"
                >
                  View All Alerts
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Access & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.12)] dark:shadow-[0_8px_30px_rgb(34,197,94,0.08)] hover:shadow-[0_12px_40px_rgb(34,197,94,0.18)] dark:hover:shadow-[0_12px_40px_rgb(34,197,94,0.12)] transition-all duration-300">
              {/* Enhanced Gradient Border */}
              <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-green-500/25 via-white/15 to-emerald-500/25 dark:from-green-500/20 dark:via-white/8 dark:to-emerald-500/20">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl" />
              </div>
              <div className="relative z-10 p-3">
                <RecentActivity />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.12)] dark:shadow-[0_8px_30px_rgb(34,197,94,0.08)] hover:shadow-[0_12px_40px_rgb(34,197,94,0.18)] dark:hover:shadow-[0_12px_40px_rgb(34,197,94,0.12)] transition-all duration-300">
              {/* Enhanced Gradient Border */}
              <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-green-500/25 via-white/15 to-emerald-500/25 dark:from-green-500/20 dark:via-white/8 dark:to-emerald-500/20">
                {/* Glass Background */}
                <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl" />
              </div>
              <div className="relative z-10 p-3">
                <QuickAccess />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  title, 
  value, 
  trend,
  trendUp,
  icon: Icon = Activity, 
  delay = 0
}: { 
  title: string; 
  value: string; 
  trend: string;
  trendUp: boolean;
  icon?: any; 
  delay?: number;
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl shadow-[0_8px_30px_rgb(34,197,94,0.12)] dark:shadow-[0_8px_30px_rgb(34,197,94,0.08)] hover:shadow-[0_12px_40px_rgb(34,197,94,0.18)] dark:hover:shadow-[0_12px_40px_rgb(34,197,94,0.12)] transition-all duration-300">
        {/* Enhanced Gradient Border */}
        <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-green-500/25 via-white/15 to-emerald-500/25 dark:from-green-500/20 dark:via-white/8 dark:to-emerald-500/20">
          {/* Glass Background */}
          <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-2xl" />
        </div>
        
        <div className="relative z-10 p-3">
          <div className="flex items-center justify-between mb-2">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="p-1.5 bg-gradient-to-br from-green-500 to-emerald-600 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-md shadow-lg"
            >
              <Icon className="w-3 h-3 text-white" />
            </motion.div>
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: delay + 0.2 }}
              className={`text-xs font-semibold px-1.5 py-0.5 rounded-full backdrop-blur-sm border shadow-lg ${
                trendUp 
                  ? 'bg-green-100/80 dark:bg-green-900/40 text-green-700 dark:text-green-400 border-green-200/50 dark:border-green-700/50' 
                  : 'bg-red-100/80 dark:bg-red-900/40 text-red-700 dark:text-red-400 border-red-200/50 dark:border-red-700/50'
              }`}
            >
              {trend}
            </motion.div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.1 }}
            className="text-gray-600 dark:text-gray-300 text-xs font-medium mb-0.5 uppercase tracking-wide"
          >
            {title}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + 0.2 }}
            className="text-lg font-bold text-gray-900 dark:text-white"
          >
            {value}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
