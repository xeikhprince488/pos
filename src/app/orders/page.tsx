'use client';

import { BadgeCheck, Clock, Package, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function OrdersPage() {
  const orders = [
    {
      id: 'ORD001',
      customer: 'Qudsia',
      total: 3500,
      status: 'Pending',
    },
    {
      id: 'ORD002',
      customer: 'Ayesha',
      total: 2200,
      status: 'Completed',
    },
    {
      id: 'ORD003',
      customer: 'Minahil',
      total: 4500,
      status: 'Pending',
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return (
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 text-green-700 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 dark:text-green-300 px-3 py-2 rounded-xl text-sm font-semibold shadow-sm border border-green-200 dark:border-green-700"
          >
            <BadgeCheck size={16} /> Completed
          </motion.span>
        );
      case 'Pending':
      default:
        return (
          <motion.span 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center gap-2 text-yellow-700 bg-gradient-to-r from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/30 dark:text-yellow-300 px-3 py-2 rounded-xl text-sm font-semibold shadow-sm border border-yellow-200 dark:border-yellow-700"
          >
            <Clock size={16} /> Pending
          </motion.span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-6 space-y-6"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Package className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              All Orders
            </h1>
          </div>
        </motion.div>

        {/* Orders Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-green-100/50 to-emerald-100/50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Order ID</th>
                  <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Customer</th>
                  <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Total (PKR)</th>
                  <th className="p-4 text-left font-semibold text-gray-700 dark:text-gray-200">Status</th>
                  <th className="p-4 text-center font-semibold text-gray-700 dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {orders.map((order, index) => (
                    <motion.tr 
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/20 dark:border-gray-600/20 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-300"
                    >
                      <td className="p-4 font-medium text-gray-800 dark:text-gray-200">{order.id}</td>
                      <td className="p-4 text-gray-700 dark:text-gray-300">{order.customer}</td>
                      <td className="p-4 font-semibold text-gray-800 dark:text-gray-200">Rs. {order.total.toLocaleString()}</td>
                      <td className="p-4">{getStatusBadge(order.status)}</td>
                      <td className="p-4 text-center">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 hover:from-green-500/20 hover:to-emerald-500/20 border-green-200 dark:border-green-800 transition-all duration-300"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                        </motion.div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Empty State */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl p-12 shadow-xl text-center"
          >
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8">
              <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No orders available at the moment.
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
