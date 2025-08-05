/**
 * @description: Enhanced Header with professional styling and theme toggle for POS
 * @version: 2.0.0
 * @date: 2025-01-27
 */

"use client";
import { useState, useEffect } from "react";
import { Menu, Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-pacifico",
});

type HeaderProps = {
    onToggle?: () => void;
    collapsed?: boolean;
};

export default function Header({ onToggle, collapsed }: HeaderProps) {
    const [scrolled, setScrolled] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount] = useState(2);


    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.23, 0.86, 0.39, 0.96] }}
            className={cn(
                "relative z-40 flex items-center justify-between mx-2 mt-3 mr-2 px-3 py-2 rounded-xl transition-all duration-400 ease-[cubic-bezier(0.7,-0.15,0.25,1.15)] will-change-transform ",
                "shadow-[0_8px_30px_rgb(34,197,94,0.15)] dark:shadow-[0_8px_30px_rgb(34,197,94,0.07)]",
                "hover:shadow-[0_15px_50px_rgb(34,197,94,0.25)] dark:hover:shadow-[0_15px_50px_rgb(34,197,94,0.15)]",
                scrolled ? "shadow-[0_12px_40px_rgb(34,197,94,0.25)] dark:shadow-[0_12px_40px_rgb(34,197,94,0.12)]" : ""
            )}
        >
            {/* Elegant Glass Background with Gradient Border */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 dark:from-green-500/10 dark:via-transparent dark:to-green-500/10 rounded-xl blur-xl" />

                {/* Gradient Border Effect */}
                <div className="absolute inset-0 p-[1px] rounded-xl bg-gradient-to-br from-green-500/30 via-white/20 to-emerald-500/30 dark:from-green-500/20 dark:via-white/10 dark:to-emerald-500/20">
                    {/* Glass Background */}
                    <div className="absolute inset-0 bg-white/90 dark:bg-black/80 backdrop-blur-md rounded-xl" />
                </div>

                {/* Subtle Background Patterns */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.4),transparent_70%)]" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(16,185,129,0.4),transparent_70%)]" />
                </div>
            </div>

            {/* Left Section */}
            <div className="relative z-10 flex items-center space-x-4">
                {onToggle && (
                    <button
                        onClick={onToggle}
                        className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 hover:from-green-500/20 hover:to-green-500/10 dark:hover:from-green-500/30 dark:hover:to-green-500/20 transition-all duration-300 shadow-sm hover:shadow-md border border-green-500/10 dark:border-green-500/20 active:scale-95"
                        title="Toggle Sidebar"
                        type="button"
                    >
                        <Menu className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                    </button>
                )}

                <div className="flex flex-col">
                    <h1 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                        POS Dashboard
                    </h1>
                    <div className="text-[10px] text-gray-600 dark:text-gray-400">
                        Welcome back to <span className="relative inline-block group">
                            {/* Text shadow for depth */}
                            <span className="absolute inset-0 bg-gradient-to-r from-green-600 via-green-500 to-green-600 dark:from-green-400 dark:via-green-300 dark:to-green-400 bg-clip-text text-transparent blur-sm opacity-50"></span>
                            <span className={cn(
                                "relative bg-gradient-to-r from-green-600 via-green-500 to-green-600 dark:from-green-400 dark:via-green-300 dark:to-green-400 bg-clip-text text-transparent transition-all duration-300 ease-out",
                                pacifico.className
                            )}>
                                Largify POS
                            </span>
                            {/* Subtle shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out opacity-0 group-hover:opacity-100" />
                        </span>
                    </div>
                </div>
            </div>



            {/* Right Section */}
            <div className="relative z-10 flex items-center space-x-3">


                {/* Notifications */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="p-2 rounded-lg bg-gradient-to-r from-green-500/10 to-green-500/5 dark:from-green-500/20 dark:to-green-500/10 hover:from-green-500/20 hover:to-green-500/10 dark:hover:from-green-500/30 dark:hover:to-green-500/20 transition-all duration-300 shadow-sm hover:shadow-md border border-green-500/10 dark:border-green-500/20"
                    >
                        <Bell className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                        {notificationCount > 0 && (
                            <span className="absolute top-0 right-0 flex h-5 w-5 -mt-1 -mr-1">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 text-[10px] text-white font-medium justify-center items-center">
                                    {notificationCount}
                                </span>
                            </span>
                        )}
                    </motion.button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-80 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl shadow-lg border border-green-200/30 dark:border-green-800/30 z-50"
                        >
                            <div className="p-4 border-b border-green-200/30 dark:border-green-800/30">
                                <h3 className="text-sm font-medium text-gray-800 dark:text-gray-200">Notifications</h3>
                            </div>
                            <div className="max-h-64 overflow-y-auto">
                                <div className="p-3 hover:bg-green-500/10 transition-colors duration-200 border-b border-green-200/20 dark:border-green-800/20">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">New sale completed</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Order #1234 has been processed successfully</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">2 minutes ago</p>
                                </div>
                                <div className="p-3 hover:bg-green-500/10 transition-colors duration-200">
                                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Low stock alert</p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Product 'Coffee Beans' is running low</p>
                                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">15 minutes ago</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-3">


                    <div className="relative group">
                        <Avatar className="h-7 w-7 border-2 border-green-200/50 dark:border-green-800/30 group-hover:border-green-500/50 dark:group-hover:border-green-500/30 transition-all duration-300">
                            <AvatarImage src="/avatar.jpg" alt="User" />
                            <AvatarFallback className="bg-gradient-to-br from-green-500/80 to-green-600/80 dark:from-green-500/60 dark:to-green-600/60 text-white text-xs">SM</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    </div>

                    <ChevronDown className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                </div>
            </div>
        </motion.header>
    );
}