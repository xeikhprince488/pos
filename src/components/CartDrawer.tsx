"use client";

import { useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/cartStore";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
  } = useCartStore();

  const router = useRouter();
  
  // Memoize total calculation for better performance
  const total = useMemo(() => 
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0), 
    [cart]
  );

  const handleCheckout = useCallback(() => {
    router.push("/checkout");
  }, [router]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20 transition-colors"
        >
          <ShoppingCart className="h-3 w-3 mr-1" />
          Cart ({cart.length})
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[300px] bg-gradient-to-br from-white/98 via-white/95 to-green-50/30 dark:from-gray-900/98 dark:via-gray-900/95 dark:to-green-950/30 backdrop-blur-md border-l border-green-200/30 dark:border-green-800/30 shadow-xl">
         <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-600/20 dark:to-emerald-600/20 -mx-6  px-6 py-3 mb-4 border-b border-green-200/20 dark:border-green-800/20">
           <SheetTitle className="text-sm font-semibold flex items-center gap-2 text-gray-900 dark:text-white">
             <div className="p-1.5 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg shadow-sm">
               <ShoppingCart className="h-3.5 w-3.5 text-white" />
             </div>
             Shopping Cart
           </SheetTitle>
         </div>

        <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-green-300/50 scrollbar-track-transparent">
           {cart.length === 0 && (
             <div className="text-center py-8">
               <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50 rounded-xl p-6 border border-green-100 dark:border-green-900/50 shadow-sm">
                 <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                   <ShoppingCart className="h-5 w-5 text-white" />
                 </div>
                 <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Your cart is empty</p>
                 <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Add products to get started</p>
               </div>
             </div>
           )}
          {cart.map((item) => (
             <div key={item.id} className="bg-gradient-to-r from-white/80 to-white/60 dark:from-gray-800/80 dark:to-gray-800/60 backdrop-blur-sm border border-green-100/50 dark:border-green-800/30 rounded-xl p-2.5 space-y-2 shadow-sm hover:shadow-md transition-all duration-200 group">
               <div className="flex justify-between items-start">
                 <div className="flex-1">
                   <p className="text-xs font-semibold text-gray-900 dark:text-white truncate group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{item.name}</p>
                   <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                     Rs. {item.price.toLocaleString()} × {item.quantity}
                   </p>
                 </div>
                 <Button
                   size="sm"
                   variant="ghost"
                   className="h-5 w-5 p-0 text-red-400 hover:text-white hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 rounded-full transition-all duration-200 opacity-70 group-hover:opacity-100"
                   onClick={() => removeFromCart(item.id)}
                 >
                   <Trash2 className="h-3 w-3" />
                 </Button>
               </div>
               <div className="flex items-center gap-1">
                 <Button 
                   size="sm" 
                   variant="outline"
                   className="h-5 w-5 p-0 border-green-200 text-green-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white hover:border-green-500 dark:border-green-700 dark:text-green-400 rounded-full transition-all duration-200 shadow-sm"
                   onClick={() => decreaseQty(item.id)}
                 >
                   <Minus className="h-2 w-2" />
                 </Button>
                 <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/40 dark:to-emerald-900/40 px-2 py-0.5 rounded-full border border-green-200/50 dark:border-green-700/50 shadow-sm">
                   <span className="text-xs font-bold text-green-700 dark:text-green-300 min-w-[1rem] text-center block">
                     {item.quantity}
                   </span>
                 </div>
                 <Button 
                   size="sm" 
                   variant="outline"
                   className="h-5 w-5 p-0 border-green-200 text-green-600 hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:text-white hover:border-green-500 dark:border-green-700 dark:text-green-400 rounded-full transition-all duration-200 shadow-sm"
                   onClick={() => increaseQty(item.id)}
                 >
                   <Plus className="h-2 w-2" />
                 </Button>
                 <div className="ml-auto bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full shadow-sm">
                   <span className="text-xs font-bold">
                     Rs. {(item.price * item.quantity).toLocaleString()}
                   </span>
                 </div>
               </div>
             </div>
           ))}
        </div>

        {cart.length > 0 && (
           <div className="mt-4 space-y-2 border-t border-green-200/30 dark:border-green-800/30 pt-3">
             <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 shadow-lg">
               <p className="text-white/90 text-xs font-medium text-center mb-1">Total Amount</p>
               <p className="text-white text-sm font-bold text-center">
                 Rs. {total.toLocaleString()}
               </p>
               <p className="text-white/70 text-xs text-center mt-1">
                 {cart.length} item{cart.length > 1 ? 's' : ''}
               </p>
             </div>
             <Button 
               size="sm"
               className="w-full h-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-xs font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]" 
               onClick={handleCheckout}
             >
               <CreditCard className="h-3 w-3 mr-1" />
               Proceed to Checkout
             </Button>
             <Button 
               size="sm"
               variant="outline" 
               className="w-full h-7 border-red-200 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 hover:text-white hover:border-red-500 dark:border-red-700 dark:text-red-400 text-xs transition-all duration-200 shadow-sm" 
               onClick={clearCart}
             >
               <Trash2 className="h-3 w-3 mr-1" />
               Clear Cart
             </Button>
           </div>
         )}
      </SheetContent>
    </Sheet>
  );
}
