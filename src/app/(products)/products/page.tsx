"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Barcode,
  Plus,
  Minus,
  Trash2,
  Wallet,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Loader2,
  Package
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import debounce from 'lodash.debounce';
import Image from "next/image";

// Define proper types
type Product = {
  id: number;
  name: string;
  price: number;

  images?: string;
  sku?: string;
  unit?: string;
  category: string;
};

type CartItem = {
  id: number;
  quantity: number;
  product?: Product;
};

// Mock data for professional demo
const mockProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 1200,
    images: "/images/mouse.jpeg",
    sku: "MOU123",
    unit: "piece",
    category: "electronics"
  },
  {
    id: 2,
    name: "Keyboard",
    price: 2500,
    images: "/images/keyboard.jpeg",
    sku: "KEY456",
    unit: "piece",
    category: "electronics"
  },
  {
    id: 3,
    name: "USB Cable",
    price: 500,
    images: "/images/usb.jpeg",
    sku: "USB789",
    unit: "piece",
    category: "electronics"
  },
  {
    id: 4,
    name: "Coffee Beans",
    price: 800,
    images: "/Pos1.png",
    sku: "COF001",
    unit: "kg",
    category: "beverages"
  },
  {
    id: 5,
    name: "Notebook",
    price: 300,
    images: "/Pos1.png",
    sku: "NOT002",
    unit: "piece",
    category: "stationery"
  }
];

const categories = [
  { id: "all", name: "All Products" },
  { id: "electronics", name: "Electronics" },
  { id: "beverages", name: "Beverages" },
  { id: "stationery", name: "Stationery" },
  { id: "accessories", name: "Accessories" }
];

const TAX_RATE = 0.1; // 10% tax

// Shimmer loading component
const ProductSkeleton = () => (
  <Card className="animate-pulse">
    <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
    <CardContent className="p-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-9 bg-gray-200 rounded mt-2"></div>
    </CardContent>
  </Card>
);

export default function POS() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const itemsPerPage = 8;

  // Enhanced search function
  const searchProducts = useMemo(
    () =>
      debounce((query: string) => {
        console.log("Searching for:", query); // optional: remove later
        setSearchLoading(false);
        // You can also trigger a search API call here
      }, 300),
    []
  );

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchLoading(true);
    searchProducts(query);
  };

  // Filter products with enhanced search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === "all" ||
      product.category.toLowerCase() === selectedCategory;

    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.sku && product.sku.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.category.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Initialize with mock data
  useEffect(() => {
    setProducts(mockProducts);
    setIsLoading(false);
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Cart functions with proper typing
  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  // Calculate cart items with products
  const cartItems: CartItem[] = cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return { ...item, product };
  }).filter(item => item.product);

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    return sum + ((item.product?.price || 0) * item.quantity);
  }, 0);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  // Complete order function
  const completeOrder = async () => {
    if (cartItems.length === 0) return;

    try {
      setCart([]);
      alert("Order completed successfully!");
    } catch (error) {
      console.error("Error completing order:", error);
      alert("Failed to complete order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Professional Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl m-6 mb-4 p-6 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <Package className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Point of Sale
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Professional product management system
              </p>
            </div>
          </div>
          <div className="lg:hidden flex items-center gap-2">
            <Button variant="outline" size="icon" className="relative border-green-200 hover:border-green-300">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 pb-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Product Catalog */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Search and Barcode Section */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl p-6 shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 bg-white/50 dark:bg-gray-700/50 border-white/20 dark:border-gray-600/20 focus:border-green-300 dark:focus:border-green-600 transition-all duration-300"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                {searchLoading && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
                )}
              </div>
              <div className="relative">
                <Barcode className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Scan barcode"
                  className="pl-10 bg-white/50 dark:bg-gray-700/50 border-white/20 dark:border-gray-600/20 focus:border-green-300 dark:focus:border-green-600 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl p-6 shadow-xl">
            <div className="overflow-x-auto">
              <div className="flex space-x-2">
                {categories.map(category => (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setPage(1);
                      }}
                      className={`whitespace-nowrap transition-all duration-300 ${selectedCategory === category.id
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg"
                          : "border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                        }`}
                    >
                      {category.name}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 rounded-2xl p-6 shadow-xl">
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {Array.from({ length: itemsPerPage }).map((_, index) => (
                  <ProductSkeleton key={index} />
                ))}
              </div>
            ) : (
              <>
                <AnimatePresence mode="wait">
                  {filteredProducts.length > 0 ? (
                    <motion.div
                      key="products"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
                    >
                      {paginatedProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Card className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 hover:shadow-xl hover:border-green-200 dark:hover:border-green-600 transition-all duration-300 group">
                            <div className="aspect-square relative overflow-hidden rounded-t-lg">
                              <Image
                                src={product?.images || "/Pos1.png"}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            </div>
                            <CardContent className="p-4 space-y-2">
                              <h3 className="font-semibold text-sm line-clamp-1 text-gray-900 dark:text-white">{product.name}</h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                PKR {product.price.toFixed(2)}{product?.unit && `/${product?.unit}`}
                              </p>
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <Button
                                  size="sm"
                                  className="w-full mt-2 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg"
                                  onClick={() => addToCart(product.id)}
                                >
                                  <Plus className="h-4 w-4 mr-1" /> Add to Cart
                                </Button>
                              </motion.div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="no-products"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-8">
                        <Package className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg text-gray-600 dark:text-gray-400">
                          No products found matching your search.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 mt-6 pt-6 border-t border-white/20 dark:border-gray-600/20"
                  >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === 1}
                        onClick={() => setPage(p => Math.max(p - 1, 1))}
                        className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Prev
                      </Button>
                    </motion.div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (page <= 3) {
                          pageNum = i + 1;
                        } else if (page >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = page - 2 + i;
                        }
                        return (
                          <motion.div key={pageNum} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              variant={page === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setPage(pageNum)}
                              className={page === pageNum
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg"
                                : "border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                              }
                            >
                              {pageNum}
                            </Button>
                          </motion.div>
                        );
                      })}
                      {totalPages > 5 && page < totalPages - 2 && (
                        <span className="px-2 text-gray-500">...</span>
                      )}
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={page === totalPages}
                        onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                        className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20 disabled:opacity-50"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </motion.div>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </motion.div>

        {/* Right Column - Cart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] flex flex-col"
        >
          <Card className="flex-1 flex flex-col bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border border-white/20 dark:border-gray-600/20 shadow-xl">
            <CardHeader className="border-b border-white/20 dark:border-gray-600/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Order Summary
                </CardTitle>
                <div className="flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 px-3 py-1 rounded-full">
                  <ShoppingCart className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-sm text-green-700 dark:text-green-300">{cartItems.length} items</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-0">
              {cartItems.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center p-6 text-center"
                >
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-full mb-4">
                    <ShoppingCart className="h-10 w-10 text-green-600" />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-medium">Your cart is empty</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Add products to get started</p>
                </motion.div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {cartItems.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                          <Image
                            src={item.product?.images || "/Pos1.png"}
                            alt={item.product?.name || "Product Image"}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 dark:text-gray-200">{item.product?.name}</h4>
                          <p className="text-sm text-green-600 dark:text-green-400 font-semibold">
                            PKR {item.product?.price.toFixed(2)}
                            {item.product?.unit && `/${item.product?.unit}`}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8 rounded-lg bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700/30 flex items-center justify-center hover:from-red-200 hover:to-pink-200 transition-all duration-200"
                            >
                              <Minus className="h-3 w-3 text-red-600" />
                            </motion.button>
                            <span className="w-8 text-center text-sm font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{item.quantity}</span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8 rounded-lg bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/30 flex items-center justify-center hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
                            >
                              <Plus className="h-3 w-3 text-green-600" />
                            </motion.button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800 dark:text-gray-200">
                            PKR {((item.product?.price || 0) * item.quantity).toFixed(2)}
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 h-8 w-8 rounded-lg bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700/30 flex items-center justify-center hover:from-red-200 hover:to-pink-200 transition-all duration-200"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
            <div className="border-t border-white/20 dark:border-gray-600/20 p-4 space-y-4 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">PKR {subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Tax ({TAX_RATE * 100}%)</span>
                  <span className="font-medium">PKR {tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  <span>Total</span>
                  <span>PKR {total.toFixed(2)}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="h-12 w-full border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20">
                    <Wallet className="h-5 w-5 mr-2" /> Cash
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button variant="outline" className="h-12 w-full border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20">
                    <CreditCard className="h-5 w-5 mr-2" /> Card
                  </Button>
                </motion.div>
              </div>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={completeOrder}
                  disabled={cartItems.length === 0}
                >
                  Complete Order
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}