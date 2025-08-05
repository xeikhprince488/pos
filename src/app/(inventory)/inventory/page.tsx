"use client";

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Sparkles, Download, Brain, Search, ArrowUpDown, Loader2, BarChart2, Package, PackageCheck, PackageX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface InventoryItem {
  id: number;
  dateTime: string;
  user: string;
  type: 'In' | 'Out';
  quantity: string;
  remarks: string;
}

function AIChatModal({
  open,
  onClose,
  inventory
}: {
  open: boolean;
  onClose: () => void;
  inventory: InventoryItem[];
}) {
  const [query, setQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChat = async () => {
    if (!query.trim()) return;

    setChatResponse('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/generate-fields-from-image/analize-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: query,
          inventoryData: JSON.stringify(inventory)
        }),
      });

      if (!res.body) throw new Error('No response body');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunk = decoder.decode(value);
        setChatResponse((prev) => prev + chunk);
      }
    } catch (err) {
      setChatResponse('⚠️ Error talking to AI. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Inventory Assistant
          </DialogTitle>
          <DialogDescription>
            Ask natural language questions about your inventory data
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto mb-4">
          {chatResponse ? (
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8 mt-0.5">
                  <AvatarImage src="/ai-avatar.png" />
                  <AvatarFallback className="bg-purple-500 text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                    {chatResponse}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-8">
              <div>
                <div className="mx-auto w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium mb-2">Drop Your Query</h3>
                <p className="text-sm text-muted-foreground">
                  What items need restocking? or Show me recent outbound items
                </p>

              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Type your question..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleChat()}
            className="flex-1"
          />
          <Button onClick={handleChat} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="h-4 w-4" />
            )}
            <span className="ml-2">Ask</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [filteredInventory, setFilteredInventory] = useState<InventoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState<{ key: keyof InventoryItem; direction: 'asc' | 'desc' } | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'transactions'>('dashboard');
  const [showChat, setShowChat] = useState(false);

  // Mock inventory data
  const mockInventoryData: InventoryItem[] = [
    {
      id: 1,
      dateTime: '2024-01-15T10:30:00Z',
      user: 'John Smith',
      type: 'In',
      quantity: '50 units',
      remarks: 'New stock arrival - Electronics'
    },
    {
      id: 2,
      dateTime: '2024-01-15T14:20:00Z',
      user: 'Sarah Johnson',
      type: 'Out',
      quantity: '25 units',
      remarks: 'Sale to customer - Mobile phones'
    },
    {
      id: 3,
      dateTime: '2024-01-16T09:15:00Z',
      user: 'Mike Wilson',
      type: 'In',
      quantity: '100 units',
      remarks: 'Restocking - Office supplies'
    },
    {
      id: 4,
      dateTime: '2024-01-16T16:45:00Z',
      user: 'Emily Davis',
      type: 'Out',
      quantity: '15 units',
      remarks: 'Bulk order fulfillment'
    }
  ];

  // Initialize with mock data
  useEffect(() => {
    setIsDataLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setInventory(mockInventoryData);
      setFilteredInventory(mockInventoryData);
      setIsDataLoading(false);
    }, 1000);
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const filtered = inventory.filter(
      (item) =>
        item.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.remarks.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredInventory(filtered);
  }, [searchQuery, inventory]);

  // Sorting functionality
  const sortedInventory = React.useMemo(() => {
    const sortableItems = [...filteredInventory];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredInventory, sortConfig]);

  const requestSort = (key: keyof InventoryItem) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Export to CSV
  const handleExport = () => {
    try {
      const csvContent = [
        ['ID', 'DateTime', 'User', 'Type', 'Quantity', 'Remarks'],
        ...sortedInventory.map((item) => [
          item.id,
          item.dateTime,
          item.user,
          item.type,
          item.quantity,
          item.remarks,
        ]),
      ]
        .map((row) => row.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `inventory_export_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Data exported successfully!");
    } catch (error) {
      toast.error("Failed to export data.");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Stats for dashboard
  const stats = {
    totalTransactions: inventory.length,
    inbound: inventory.filter(i => i.type === 'In').length,
    outbound: inventory.filter(i => i.type === 'Out').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-emerald-900/20">
      <div className="p-4 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-xl p-4 shadow-lg"
          >
            <h1 className="text-xl font-bold flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-2 rounded-lg">
                <Package className="h-4 w-4 text-green-600" />
              </div>
              Inventory Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1 text-sm">
              Professional inventory tracking and management system
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 w-full sm:w-auto"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleExport}
                className="flex items-center gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 text-gray-700 dark:text-gray-200 hover:bg-white/90 dark:hover:bg-gray-700/90 px-3 py-2 rounded-lg shadow-sm transition-all duration-200 text-sm"
              >
                <Download className="h-3 w-3" />
                <span className="hidden sm:inline font-medium">Export</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={() => setShowChat(true)}
                className="relative gap-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm border-0 text-sm"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Brain className="h-3 w-3 text-white" />
                </motion.div>
                <span className="hidden sm:inline">
                  AI Insights
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* AI Chat Modal */}
        <AIChatModal
          open={showChat}
          onClose={() => setShowChat(false)}
          inventory={inventory}
        />

        {/* Rest of your component remains the same */}

        {/* ... (keep all your existing navigation tabs, search bar, and content sections) ... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-xl p-1 shadow-sm"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 font-medium flex items-center gap-1 rounded-lg transition-all duration-200 text-sm ${activeTab === 'dashboard'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            onClick={() => setActiveTab('dashboard')}
          >
            <BarChart2 className="h-3 w-3" />
            Dashboard
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`px-4 py-2 font-medium flex items-center gap-1 rounded-lg transition-all duration-200 text-sm ${activeTab === 'transactions'
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
              }`}
            onClick={() => setActiveTab('transactions')}
          >
            <Package className="h-3 w-3" />
            Transactions
          </motion.button>
        </motion.div>



        {/* Main Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' ? (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Total Transactions</p>
                          {isDataLoading ? (
                            <Skeleton className="h-6 w-20 mt-1 rounded-md" />
                          ) : (
                            <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {stats.totalTransactions}
                              <span className="ml-1 text-xs font-normal text-green-600">+12%</span>
                            </p>
                          )}
                        </div>
                        <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                          <BarChart2 className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl group">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Inbound Items</p>
                          {isDataLoading ? (
                            <Skeleton className="h-6 w-20 mt-1 rounded-md" />
                          ) : (
                            <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                              {stats.inbound}
                              <span className="ml-1 text-xs font-normal text-green-600">+5.2%</span>
                            </p>
                          )}
                        </div>
                        <div className="p-2 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
                          <PackageCheck className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Card className="relative overflow-hidden bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl group">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    <CardContent className="p-4 relative z-10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Outbound Items</p>
                          {isDataLoading ? (
                            <Skeleton className="h-6 w-16 mt-1 rounded-md" />
                          ) : (
                            <p className="text-2xl font-bold mt-1 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                              {stats.outbound}
                              <span className="ml-1 text-xs font-normal text-red-600">-3.8%</span>
                            </p>
                          )}
                        </div>
                        <div className="p-2 rounded-lg bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30">
                          <PackageX className="h-4 w-4 text-red-600" />
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full w-3/4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg rounded-xl">
                  <CardHeader className="p-4">
                    <CardTitle className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                      Last {Math.min(5, sortedInventory.length)} inventory transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {isDataLoading ? (
                      <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                          <Skeleton key={i} className="h-12 w-full" />
                        ))}
                      </div>
                    ) : sortedInventory.length > 0 ? (
                      <div className="space-y-3">
                        {sortedInventory.slice(0, 5).map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8 + index * 0.1 }}
                            className="flex items-center justify-between p-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg hover:bg-white/70 dark:hover:bg-gray-700/70 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${item.type === 'In'
                                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30'
                                  : 'bg-gradient-to-br from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30'
                                }`}>
                                {item.type === 'In' ? (
                                  <PackageCheck className="h-4 w-4 text-green-600" />
                                ) : (
                                  <PackageX className="h-4 w-4 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 dark:text-gray-200 text-sm">{item.remarks}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  {formatDate(item.dateTime)} • {item.user}
                                </p>
                              </div>
                            </div>
                            <Badge
                              variant={item.type === 'In' ? 'default' : 'destructive'}
                              className={`px-2 py-1 text-xs font-medium ${item.type === 'In'
                                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0'
                                  : 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0'
                                }`}
                            >
                              {item.type} {item.quantity}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 text-center"
                      >
                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4 rounded-full mx-auto w-fit mb-3">
                          <Package className="h-8 w-8 text-gray-500" />
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                          No inventory transactions found
                        </p>
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Transactions Table */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg rounded-xl">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Transaction History
                  </CardTitle>
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-sm">
                    All inventory movements with detailed information
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  {isDataLoading ? (
                    <div className="space-y-2">
                      <Skeleton className="h-10 w-full" />
                      {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} className="h-12 w-full" />
                      ))}
                    </div>
                  ) : (
                    <ScrollArea className="h-[400px]">
                      <Table>
                        <TableHeader className="sticky top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm z-10">
                          <TableRow className="border-b border-white/20 dark:border-gray-600/20">
                            <TableHead
                              className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 rounded-lg font-semibold text-gray-700 dark:text-gray-300 text-xs py-2"
                              onClick={() => requestSort('id')}
                            >
                              <div className="flex items-center gap-1">
                                ID
                                {sortConfig?.key === 'id' && (
                                  sortConfig.direction === 'asc' ? (
                                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                                  ) : (
                                    <ArrowUpDown className="h-3 w-3 opacity-50 rotate-180" />
                                  )
                                )}
                              </div>
                            </TableHead>
                            <TableHead
                              className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 rounded-lg font-semibold text-gray-700 dark:text-gray-300 text-xs py-2"
                              onClick={() => requestSort('dateTime')}
                            >
                              <div className="flex items-center gap-1">
                                Date/Time
                                {sortConfig?.key === 'dateTime' && (
                                  sortConfig.direction === 'asc' ? (
                                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                                  ) : (
                                    <ArrowUpDown className="h-3 w-3 opacity-50 rotate-180" />
                                  )
                                )}
                              </div>
                            </TableHead>
                            <TableHead
                              className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 rounded-lg font-semibold text-gray-700 dark:text-gray-300 text-xs py-2"
                              onClick={() => requestSort('user')}
                            >
                              <div className="flex items-center gap-1">
                                User
                                {sortConfig?.key === 'user' && (
                                  sortConfig.direction === 'asc' ? (
                                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                                  ) : (
                                    <ArrowUpDown className="h-3 w-3 opacity-50 rotate-180" />
                                  )
                                )}
                              </div>
                            </TableHead>
                            <TableHead
                              className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 rounded-lg font-semibold text-gray-700 dark:text-gray-300 text-xs py-2"
                              onClick={() => requestSort('type')}
                            >
                              <div className="flex items-center gap-1">
                                Type
                                {sortConfig?.key === 'type' && (
                                  sortConfig.direction === 'asc' ? (
                                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                                  ) : (
                                    <ArrowUpDown className="h-3 w-3 opacity-50 rotate-180" />
                                  )
                                )}
                              </div>
                            </TableHead>
                            <TableHead
                              className="cursor-pointer hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 rounded-lg font-semibold text-gray-700 dark:text-gray-300 text-xs py-2"
                              onClick={() => requestSort('quantity')}
                            >
                              <div className="flex items-center gap-1">
                                Quantity
                                {sortConfig?.key === 'quantity' && (
                                  sortConfig.direction === 'asc' ? (
                                    <ArrowUpDown className="h-3 w-3 opacity-50" />
                                  ) : (
                                    <ArrowUpDown className="h-3 w-3 opacity-50 rotate-180" />
                                  )
                                )}
                              </div>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700 dark:text-gray-300 text-xs py-2">Remarks</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {sortedInventory.length > 0 ? (
                            sortedInventory.map((item, index) => (
                              <motion.tr
                                key={item.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b border-white/10 dark:border-gray-600/10 hover:bg-white/30 dark:hover:bg-gray-700/30 transition-all duration-200"
                              >
                                <TableCell className="font-medium text-gray-800 dark:text-gray-200 py-2 text-sm">{item.id}</TableCell>
                                <TableCell className="text-gray-700 dark:text-gray-300 py-2 text-sm">{formatDate(item.dateTime)}</TableCell>
                                <TableCell className="py-2">
                                  <div className="flex items-center gap-2">
                                    <Avatar className="h-5 w-5">
                                      <AvatarFallback className="text-xs bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-600 dark:text-green-400">
                                        {item.user
                                          .split(' ')
                                          .map((n) => n[0])
                                          .join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-gray-700 dark:text-gray-300 text-sm">{item.user}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-2">
                                  <Badge
                                    variant={item.type === 'In' ? 'default' : 'destructive'}
                                    className={`min-w-[50px] justify-center font-medium text-xs ${item.type === 'In'
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0'
                                        : 'bg-gradient-to-r from-red-500 to-pink-500 text-white border-0'
                                      }`}
                                  >
                                    {item.type}
                                  </Badge>
                                </TableCell>
                                <TableCell
                                  className={`font-semibold py-2 text-sm ${item.type === 'In'
                                      ? 'text-green-600 dark:text-green-400'
                                      : 'text-red-600 dark:text-red-400'
                                    }`}
                                >
                                  {item.quantity}
                                </TableCell>
                                <TableCell className="text-gray-600 dark:text-gray-400 py-2 text-sm">
                                  {item.remarks}
                                </TableCell>
                              </motion.tr>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={6}
                                className="h-[300px] text-center"
                              >
                                <motion.div
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="flex flex-col items-center justify-center py-8"
                                >
                                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4 rounded-full mb-3">
                                    <Package className="h-8 w-8 text-gray-500" />
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">
                                    No inventory transactions found
                                  </p>
                                </motion.div>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

     
      </div>
  )
}
