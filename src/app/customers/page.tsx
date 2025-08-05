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
        className="p-6 space-y-6"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl p-6 shadow-xl"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Users className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Customers
              </h1>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => alert('PDF Export coming soon...')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 transition-all duration-200"
            >
              <Download size={16} /> Export PDF
            </motion.button>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl p-2 shadow-xl"
        >
          <div className="flex gap-2">
            <Link href="/customers?tab=all">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'all' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
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
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'add' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4">
          <h3 className="text-lg font-semibold">Add New Customer</h3>
          <input name="name" value={formData.name} onChange={handleFormChange} placeholder="Full Name" className="w-full px-3 py-2 border rounded" />
          <input name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone" className="w-full px-3 py-2 border rounded" />
          <input name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" className="w-full px-3 py-2 border rounded" />
          <input name="address" value={formData.address} onChange={handleFormChange} placeholder="Address" className="w-full px-3 py-2 border rounded" />
          <select name="type" value={formData.type} onChange={handleFormChange} className="w-full px-3 py-2 border rounded">
            <option value="Retail">Retail</option>
            <option value="Wholesale">Wholesale</option>
          </select>
          <input name="tags" value={formData.tags.join(',')} onChange={handleFormChange} placeholder="Tags (comma separated)" className="w-full px-3 py-2 border rounded" />
          <input name="avatar" value={formData.avatar} onChange={handleFormChange} placeholder="Avatar URL (optional)" className="w-full px-3 py-2 border rounded" />
          <textarea name="notes" value={formData.notes} onChange={handleFormChange} placeholder="Notes" className="w-full px-3 py-2 border rounded" />
          <button onClick={addCustomer} className="bg-primary text-white px-4 py-2 rounded w-full">Save Customer</button>
        </div>
      )}

      {/* All Customers */}
      {activeTab === 'all' && (
        <>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2 top-2.5 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-8 pr-4 py-2 text-sm border rounded w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              onChange={(e) => setSortKey(e.target.value as any)}
              className="text-sm border rounded px-2 py-1"
            >
              <option value="name">Sort by Name</option>
              <option value="loyaltyPoints">Sort by Loyalty Points</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCustomers.map((c) => (
              <div key={c.id} className="bg-white dark:bg-gray-800 p-4 rounded shadow text-sm space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={c.avatar || 'https://placehold.co/48x48'}
                      alt="avatar"
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-bold">{c.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{c.type} Customer</p>
                    </div>
                  </div>
                  <button onClick={() => deleteCustomer(c.id)} title="Delete" className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div>
                  <p>📞 {c.phone}</p>
                  <p>📧 {c.email}</p>
                  <p>🏠 {c.address}</p>
                  <p>🎯 Tags: {Array.isArray(c.tags) ? c.tags.join(', ') : 'None'}</p>
                  <p>📝 Notes: {c.notes || '—'}</p>
                  <p>⭐ Loyalty: {c.loyaltyPoints} pts</p>
                  <p className="text-xs text-gray-400">Created: {formatDate(c.createdAt)}</p>
                </div>
                <div className="space-y-1">
                  <p className="font-semibold mt-2">Sales History:</p>
                  {Array.isArray(c.salesHistory) && c.salesHistory.length > 0 ? (
                    c.salesHistory.map((inv) => (
                      <p key={inv.invoiceId}>🧾 #{inv.invoiceId} – {inv.date} – ${inv.amount}</p>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500 italic">No invoices yet</p>
                  )}
                </div>
                <div className="flex gap-2 mt-2 text-xs">
                  <Link
                    href={`/sales?saleFor=${c.id}`}
                    className="bg-primary text-white px-2 py-1 rounded flex items-center gap-1"
                  >
                    <ArrowRight size={14} /> New Sale
                  </Link>
                  <Link
                    href={`/customers/${c.id}`}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-2 py-1 rounded"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredCustomers.length === 0 && (
            <div className="text-center text-gray-500 mt-6">No customers found.</div>
          )}
        </>
      )}
    </div>
  );
}
