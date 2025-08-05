'use client';

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  Warehouse,
  BarChart3,
  Settings,
  UserCog
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Pacifico } from 'next/font/google';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});
 
const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: ShoppingCart, label: "POS Sales", href: "/sales" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Users, label: "Customers", href: "/customers" },
  { icon: Warehouse, label: "Inventory", href: "/inventory" },
  { icon: BarChart3, label: "Reports", href: "/reports" },
  { icon: Settings, label: "Settings", href: "/settings" },
  { icon: UserCog, label: "Users", href: "/users" },
];



interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const [, setOpenMenu] = useState<string | null>(null);
  const pathname = usePathname();

  const handleNavigation = (href: string) => {
    // Handle navigation logic here
    window.location.href = href;
  };

  // Helper function to check if a menu item is active
  const isMenuItemActive = (href: string) => {
    // Handle exact matches and sub-routes
    if (href === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname.startsWith(href);
  };

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-50 flex flex-col h-[95vh] m-2 sidebar-transition hw-accelerate",
        "shadow-lg dark:shadow-xl",
        collapsed ? "w-[54px]" : "w-[176px]"
      )}
    >
      {/* Simplified Background */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        {/* Simple Gradient Border */}
        <div className="absolute inset-0 p-[1px] rounded-2xl bg-gradient-to-br from-green-400/20 via-white/10 to-emerald-400/20 dark:from-green-400/15 dark:via-white/5 dark:to-emerald-400/15">
          {/* Simple Background */}
          <div className="absolute inset-0 bg-white/95 dark:bg-black/85 rounded-2xl" />
        </div>
      </div>


      {/* Content Container */}
      <div className="relative z-10 flex flex-col h-full px-2 py-6 items-center">
        {/* Logo */}
        <div className="flex-shrink-0 flex items-center justify-center py-4 mb-4 mx-auto">
          <span
            className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-500 dark:from-green-400 dark:to-emerald-400 text-center",
              collapsed ? "text-base" : "text-lg",
              pacifico.className
            )}
          >
            {collapsed ? "L" : "Largify POS"}
          </span>
        </div>

        {/* Navigation */}
        <div className="overflow-y-auto pr-1 flex-1 space-y-1 w-full">
          <nav className="flex flex-col space-y-1.5">
            {navItems.map(({ icon: Icon, label, href }, index) => {
              const isActive = isMenuItemActive(href);

              return (
                <div key={index}>
                    <div
                      onClick={() => handleNavigation(href)}
                      className={cn(
                        "flex items-center px-2.5 py-1.5 rounded-xl cursor-pointer transition-colors duration-100",
                        collapsed && "justify-center",
                        isActive
                          ? "bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400"
                          : "hover:bg-green-500/10 dark:hover:bg-green-500/20"
                      )}
                    >
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center justify-center">
                            <Icon className={cn(
                              "w-3.5 h-3.5",
                              isActive
                                ? "text-green-600 dark:text-green-400"
                                : "text-gray-700 dark:text-gray-300"
                            )} />
                          </div>
                        </TooltipTrigger>
                        {collapsed && (
                          <TooltipContent side="right" className="bg-white dark:bg-gray-900 border border-green-500/20">
                            <span>{label}</span>
                          </TooltipContent>
                        )}
                      </Tooltip>

                      {!collapsed && (
                        <div className="flex items-center justify-between w-full ml-3">
                          <span className={cn(
                            "text-[10px] font-medium",
                            isActive
                              ? "text-green-600 dark:text-green-400"
                              : "text-gray-700 dark:text-gray-300"
                          )}>
                            {label}
                          </span>
                        </div>
                      )}
                    </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Simple Decorative Element */}
        <div className="mt-4 flex justify-center">
          <div className="w-12 h-0.5 bg-green-500/30 rounded-full" />
        </div>
      </div>
    </div>
  );
}