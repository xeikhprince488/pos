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
                <Package className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Point of Sale
              </h2>
            </div>
            <div className="lg:hidden flex items-center gap-2">
              <Button variant="outline" size="sm" className="relative border-green-200 hover:border-green-300">
                <ShoppingCart className="h-4 w-4" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {/* Left Column - Product Catalog */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-3"
          >
            {/* Search and Barcode Section */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-3 shadow-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    placeholder="Search products..."
                    className="pl-8 h-8 text-sm bg-white/50 dark:bg-gray-700/50 border-white/20 dark:border-gray-600/20 focus:border-green-300 dark:focus:border-green-600 transition-colors"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  {searchLoading && (
                    <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400 animate-spin" />
                  )}
                </div>
                <div className="relative">
                  <Barcode className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-gray-400" />
                  <Input
                    placeholder="Scan barcode"
                    className="pl-8 h-8 text-sm bg-white/50 dark:bg-gray-700/50 border-white/20 dark:border-gray-600/20 focus:border-green-300 dark:focus:border-green-600 transition-colors"
                  />
                </div>
              </div>
            </motion.div>

            {/* Category Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-3 shadow-lg"
            >
              <div className="overflow-x-auto">
                <div className="flex space-x-2">
                  {categories.map(category => (
                    <motion.div
                      key={category.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
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
            </motion.div>


            {/* Product Grid */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 rounded-xl p-3 shadow-lg"
            >
              {isLoading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
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
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2"
                      >
                        {paginatedProducts.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card className="bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 hover:shadow-md hover:border-green-200 dark:hover:border-green-600 transition-all duration-200 group">
                              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                                <Image
                                  src={product?.images || "/Pos1.png"}
                                  alt={product.name}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-200"
                                  sizes="(max-width: 768px) 100vw, 20vw"
                                />
                              </div>
                              <CardContent className="p-2 space-y-1">
                                <h3 className="font-medium text-xs line-clamp-1 text-gray-900 dark:text-white">{product.name}</h3>
                                <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                                  PKR {product.price.toFixed(2)}{product?.unit && `/${product?.unit}`}
                                </p>
                                <Button
                                  size="sm"
                                  className="w-full h-7 text-xs bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-sm"
                                  onClick={() => addToCart(product.id)}
                                >
                                  <Plus className="h-3 w-3 mr-1" /> Add
                                </Button>
                              </CardContent>
                            </Card>
                          </motion.div>
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

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-white/20 dark:border-gray-600/20"
                    >
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page === 1}
                          onClick={() => setPage(p => Math.max(p - 1, 1))}
                          className="h-8 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20 disabled:opacity-50"
                        >
                          <ChevronLeft className="h-3 w-3 mr-1" /> Prev
                        </Button>
                      </motion.div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 3) {
                            pageNum = i + 1;
                          } else if (page <= 2) {
                            pageNum = i + 1;
                          } else if (page >= totalPages - 1) {
                            pageNum = totalPages - 2 + i;
                          } else {
                            pageNum = page - 1 + i;
                          }
                          return (
                            <motion.div key={pageNum} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button
                                variant={page === pageNum ? "default" : "outline"}
                                size="sm"
                                onClick={() => setPage(pageNum)}
                                className={`h-8 w-8 p-0 ${page === pageNum
                                  ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-sm"
                                  : "border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20"
                                  }`}
                              >
                                {pageNum}
                              </Button>
                            </motion.div>
                          );
                        })}
                      </div>
                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={page === totalPages}
                          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                          className="h-8 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20 disabled:opacity-50"
                        >
                          Next <ChevronRight className="h-3 w-3 ml-1" />
                        </Button>
                      </motion.div>
                    </motion.div>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column - Cart */}
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)] flex flex-col"
          >
            <Card className="flex-1 flex flex-col bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 shadow-lg">
              <CardHeader className="border-b border-white/20 dark:border-gray-600/20 p-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    Order Summary
                  </CardTitle>
                  <div className="flex items-center gap-1 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 px-2 py-1 rounded-full">
                    <ShoppingCart className="h-3 w-3 text-green-600" />
                    <span className="font-medium text-xs text-green-700 dark:text-green-300">{cartItems.length}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-0">
                {cartItems.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center p-3 text-center"
                  >
                    <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-3 rounded-full mb-2">
                      <ShoppingCart className="h-6 w-6 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">Your cart is empty</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Add products to get started</p>
                  </motion.div>
                ) : (
                  <div className="p-2 space-y-2">
                    <AnimatePresence>
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -50 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-start gap-2 p-2 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                            <Image
                              src={item.product?.images || "/Pos1.png"}
                              alt={item.product?.name || "Product Image"}
                              width={48}
                              height={48}
                              className="object-cover w-full h-full"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-xs text-gray-800 dark:text-gray-200 line-clamp-1">{item.product?.name}</h4>
                            <p className="text-xs text-green-600 dark:text-green-400 font-semibold">
                              PKR {item.product?.price.toFixed(2)}
                              {item.product?.unit && `/${item.product?.unit}`}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-6 w-6 rounded bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700/30 flex items-center justify-center hover:from-red-200 hover:to-pink-200 transition-all duration-200"
                              >
                                <Minus className="h-2 w-2 text-red-600" />
                              </motion.button>
                              <span className="w-6 text-center text-xs font-medium bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-6 w-6 rounded bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700/30 flex items-center justify-center hover:from-green-200 hover:to-emerald-200 transition-all duration-200"
                              >
                                <Plus className="h-2 w-2 text-green-600" />
                              </motion.button>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xs text-gray-800 dark:text-gray-200">
                              PKR {((item.product?.price || 0) * item.quantity).toFixed(2)}
                            </p>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeFromCart(item.id)}
                              className="mt-1 h-6 w-6 rounded bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/20 dark:to-pink-900/20 border border-red-200 dark:border-red-700/30 flex items-center justify-center hover:from-red-200 hover:to-pink-200 transition-all duration-200"
                            >
                              <Trash2 className="h-3 w-3 text-red-600" />
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </CardContent>
              <div className="border-t border-white/20 dark:border-gray-600/20 p-3 space-y-3 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium">PKR {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-400">Tax ({TAX_RATE * 100}%)</span>
                    <span className="font-medium">PKR {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-sm bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent border-t border-green-200 dark:border-green-700/30 pt-2">
                    <span>Total</span>
                    <span>PKR {total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="h-8 w-full text-xs border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20">
                      <Wallet className="h-3 w-3 mr-1" /> Cash
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button variant="outline" className="h-8 w-full text-xs border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20">
                      <CreditCard className="h-3 w-3 mr-1" /> Card
                    </Button>
                  </motion.div>
                </div>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full h-8 text-xs bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white border-0 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
      </motion.div>
    </div>
  );
}