'use client';

import { useEffect, useState } from 'react';
import { UserPlus, Search, Download, ArrowRight, Trash2, Users } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  type: 'Retail' | 'Wholesale';
  loyaltyPoints: number;
  tags: string[];
  avatar?: string;
  notes?: string;
  createdAt: string;
  salesHistory: {
    invoiceId: string;
    date: string;
    amount: number;
  }[];
}

function formatDate(dateStr: string) {
  try {
    return new Date(dateStr).toLocaleDateString();
  } catch {
    return '';
  }
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<'name' | 'loyaltyPoints'>('name');
  const [activeTab, setActiveTab] = useState<'all' | 'add'>('all');

  const [formData, setFormData] = useState<Omit<Customer, 'id' | 'loyaltyPoints' | 'salesHistory' | 'createdAt'>>({
    name: '',
    phone: '',
    email: '',
    address: '',
    type: 'Retail',
    tags: [],
    avatar: '',
    notes: '',
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle tab from query params (for sidebar routing)
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'add') setActiveTab('add');
    else setActiveTab('all');
  }, [searchParams]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('customers');
      if (stored) {
        try {
          const parsed: Customer[] = JSON.parse(stored).map((c: any) => ({
            ...c,
            tags: Array.isArray(c.tags) ? c.tags : [],
            salesHistory: Array.isArray(c.salesHistory) ? c.salesHistory : [],
          }));
          setCustomers(parsed);
        } catch (e) {
          console.error('Failed to parse customers:', e);
        }
      }
    }
  }, []);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData((prev) => ({
        ...prev,
        tags: value.split(',').map((tag) => tag.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addCustomer = () => {
    if (!formData.name || !formData.phone) return alert('Name and phone are required');
    const newCustomer: Customer = {
      id: uuidv4(),
      ...formData,
      loyaltyPoints: Math.floor(Math.random() * 100),
      createdAt: new Date().toISOString(),
      salesHistory: [],
    };
    const updated = [...customers, newCustomer];
    setCustomers(updated);
    localStorage.setItem('customers', JSON.stringify(updated));
    setFormData({
      name: '',
      phone: '',
      email: '',
      address: '',
      type: 'Retail',
      tags: [],
      avatar: '',
      notes: '',
    });
    setActiveTab('all');
    router.push('/customers?tab=all');
  };

  const deleteCustomer = (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    const updated = customers.filter((c) => c.id !== id);
    setCustomers(updated);
    localStorage.setItem('customers', JSON.stringify(updated));
  };

  const filteredCustomers = customers
    .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) =>
      sortKey === 'name' ? a.name.localeCompare(b.name) : b.loyaltyPoints - a.loyaltyPoints
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 space-y-4"
      >
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Users className="h-4 w-4" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Customers
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert('PDF Export coming soon...')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-all duration-200 text-sm"
            >
              <Download size={14} /> Export PDF
            </motion.button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg p-1 shadow-lg"
        >
          <div className="flex gap-1">
            <Link href="/customers?tab=all">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === 'all'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm'
                    : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70'
                  }`}
              >
                All Customers
              </motion.button>
            </Link>
            <Link href="/customers?tab=add">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${activeTab === 'add'
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm'
                    : 'bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-white/70 dark:hover:bg-gray-700/70'
                  }`}
              >
                Add Customer
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Add Customer */}
        {activeTab === 'add' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg p-4 shadow-lg space-y-3"
          >
            <h3 className="text-lg font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Add New Customer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Full Name"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                placeholder="Phone"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <select
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              >
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
              </select>
            </div>
            <input
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              placeholder="Address"
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input
                name="tags"
                value={formData.tags.join(',')}
                onChange={handleFormChange}
                placeholder="Tags (comma separated)"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <input
                name="avatar"
                value={formData.avatar}
                onChange={handleFormChange}
                placeholder="Avatar URL (optional)"
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleFormChange}
              placeholder="Notes"
              rows={3}
              className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={addCustomer}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-lg font-medium text-sm shadow-sm transition-all duration-200"
            >
              <UserPlus className="h-4 w-4 inline mr-2" />
              Save Customer
            </motion.button>
          </motion.div>
        )}

        {/* All Customers */}
        {activeTab === 'all' && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg p-3 shadow-lg"
            >
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={14} />
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="pl-9 pr-4 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-lg bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  onChange={(e) => setSortKey(e.target.value as any)}
                  className="text-sm border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-2 bg-white/50 dark:bg-gray-700/50 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                >
                  <option value="name">Sort by Name</option>
                  <option value="loyaltyPoints">Sort by Loyalty Points</option>
                </select>
              </div>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              <AnimatePresence>
                {filteredCustomers.map((c, index) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-200 text-sm space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={c.avatar || 'https://placehold.co/40x40'}
                          alt="avatar"
                          className="w-10 h-10 rounded-full object-cover border-2 border-green-200 dark:border-green-700"
                        />
                        <div>
                          <p className="font-bold text-sm text-gray-800 dark:text-gray-200">{c.name}</p>
                          <p className="text-xs text-green-600 dark:text-green-400 font-medium">{c.type} Customer</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteCustomer(c.id)}
                        title="Delete"
                        className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400">📞 {c.phone}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">📧 {c.email}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">🏠 {c.address}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">🎯 Tags: {Array.isArray(c.tags) ? c.tags.join(', ') : 'None'}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">📝 Notes: {c.notes || '—'}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">⭐ {c.loyaltyPoints} pts</p>
                        <p className="text-xs text-gray-400">Created: {formatDate(c.createdAt)}</p>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-xs text-gray-700 dark:text-gray-300">Sales History:</p>
                      {Array.isArray(c.salesHistory) && c.salesHistory.length > 0 ? (
                        c.salesHistory.slice(0, 2).map((inv) => (
                          <p key={inv.invoiceId} className="text-xs text-gray-600 dark:text-gray-400">🧾 #{inv.invoiceId} – {inv.date} – ${inv.amount}</p>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">No invoices yet</p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Link
                        href={`/sales?saleFor=${c.id}`}
                        className="flex-1"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-2 py-1.5 rounded-lg flex items-center justify-center gap-1 text-xs font-medium shadow-sm transition-all duration-200"
                        >
                          <ArrowRight size={12} /> New Sale
                        </motion.button>
                      </Link>
                      <Link
                        href={`/customers/${c.id}`}
                        className="flex-1"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200"
                        >
                          View Profile
                        </motion.button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredCustomers.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center py-8"
              >
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg p-6 shadow-lg">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">No customers found.</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Try adjusting your search or add a new customer.</p>
                </div>
              </motion.div>
            )}
          </>
        )}
    </motion.div>
    </div>
  );
}
