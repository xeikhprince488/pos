'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import CartDrawer from "@/components/CartDrawer";
import BarcodeScanner from "@/components/BarcodeScanner";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/lib/cartStore";
import { Button } from "@/components/ui/button";
import { Search, ShoppingCart, BarChart3 } from "lucide-react";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 1200,
    image: "/images/mouse.jpeg",
    sku: "MOU123",
  },
  {
    id: 2,
    name: "Keyboard",
    price: 2500,
    image: "/images/keyboard.jpeg",
    sku: "KEY456",
  },
  {
    id: 3,
    name: "USB Cable",
    price: 500,
    image: "/images/usb.jpeg",
    sku: "USB789",
  },
];

export default function SalesPage() {
  const { addToCart } = useCartStore();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "new";

  const [search, setSearch] = useState("");
  
  // Memoize filtered products for better performance
  const filteredProducts = useMemo(() => {
    if (!search.trim()) return mockProducts;
    return mockProducts.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);
  
  // Memoize search handler to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  if (tab === "report") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-3 max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-4 shadow-lg"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Sales Report
              </h2>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-3 mb-3"
            >
              <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
                📊 Coming soon: Comprehensive graphs and detailed sale summaries will be displayed here.
              </p>
            </motion.div>
            
            <Link href="/sales?tab=new">
              <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-md">
                ← Back to New Sale
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-3 space-y-3"
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <ShoppingCart className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                New Sale
              </h2>
            </div>
            <Link href="/sales?tab=report">
              <Button 
                size="sm"
                variant="outline" 
                className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20 transition-colors"
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                View Sales Report
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Search and Actions Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-3 shadow-lg"
        >
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={handleSearchChange}
                className="pl-8 h-8 text-sm bg-white/50 dark:bg-gray-700/50 border-white/20 dark:border-gray-600/20 focus:border-green-300 dark:focus:border-green-600 transition-colors"
              />
            </div>

            <div className="flex items-center gap-2">
              <BarcodeScanner
                products={mockProducts}
                onScan={(product) => addToCart(product)}
              />
              <CartDrawer />
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-3 shadow-lg"
        >
          <AnimatePresence mode="wait">
            {filteredProducts.length > 0 ? (
              <motion.div 
                key="products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="no-products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-center py-6"
              >
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    No products found matching your search.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
