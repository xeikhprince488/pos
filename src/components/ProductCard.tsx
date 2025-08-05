"use client";

import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";
import { ShoppingCart } from "lucide-react";

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  sku: string;
};

function ProductCard({ product }: { product: Product }) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const handleAddToCart = useCallback(() => {
    addToCart(product);
  }, [addToCart, product]);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col justify-between bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/30 dark:border-gray-600/30 shadow-md hover:shadow-lg transition-shadow">
        <CardContent className="p-2">
          <div className="relative overflow-hidden rounded-lg mb-2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-20 object-contain bg-gray-50 dark:bg-gray-700 rounded-lg"
              loading="lazy"
            />
          </div>
          <h4 className="text-xs font-medium text-gray-900 dark:text-white truncate" title={product.name}>
            {product.name}
          </h4>
          <p className="text-xs text-green-600 dark:text-green-400 font-semibold mt-1">
            Rs. {product.price.toLocaleString()}
          </p>
        </CardContent>
        <CardFooter className="p-2 pt-0">
          <Button 
            onClick={handleAddToCart} 
            size="sm"
            className="w-full h-7 text-xs bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 border-0 shadow-sm"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default memo(ProductCard);
