"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, TrendingUp, TrendingDown, ArrowUpDown } from "lucide-react";

const inventoryData = [
  { product: "Organic Apples", sku: "APL-001", qty: 100, purchase: 50, sales: 30, transferIn: 10, transferOut: 5, closing: 125, branch: "Main Street" },
  { product: "Wheat Bread", sku: "BRD-002", qty: 80, purchase: 40, sales: 20, transferIn: 5, transferOut: 2, closing: 103, branch: "Downtown" },
  { product: "Almond Milk", sku: "MLK-003", qty: 60, purchase: 30, sales: 15, transferIn: 8, transferOut: 3, closing: 80, branch: "Main Street" },
  { product: "Cheddar Cheese", sku: "CHS-004", qty: 90, purchase: 45, sales: 25, transferIn: 7, transferOut: 4, closing: 113, branch: "Downtown" },
];

export default function InventoryReportPage() {
  const [branch, setBranch] = useState("all");

  // Filter by branch
  const filtered = branch === "all" ? inventoryData : inventoryData.filter(row => row.branch === branch);

  const totalOpeningStock = filtered.reduce((sum, row) => sum + row.qty, 0);
  const totalPurchases = filtered.reduce((sum, row) => sum + row.purchase, 0);
  const totalSales = filtered.reduce((sum, row) => sum + row.sales, 0);
  const totalClosingStock = filtered.reduce((sum, row) => sum + row.closing, 0);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 p-4 rounded-xl border border-blue-200/50 dark:border-blue-800/50">
        <div className="flex items-center gap-2 mb-1">
          <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Inventory Movement Report</h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Track inventory movement, purchases, sales, and stock levels</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg">
                <Package className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Opening Stock</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalOpeningStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Purchases</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalPurchases}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg">
                <TrendingDown className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Sales</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalSales}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
                <ArrowUpDown className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Closing Stock</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalClosingStock}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Filters</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex gap-4">
            <div className="flex-1">
              <Select value={branch} onValueChange={setBranch}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Branches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="Main Street">Main Street</SelectItem>
                  <SelectItem value="Downtown">Downtown</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Data Table */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Inventory Movement Data</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Product</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">SKU</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Opening Stock</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Purchase</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Sales</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Transfer In</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Transfer Out</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Closing Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row, i) => (
                  <TableRow key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-100 py-2">{row.product}</TableCell>
                    <TableCell className="py-2">
                      <Badge className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-xs px-2 py-1">
                        {row.sku}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 dark:text-gray-300 py-2">{row.qty}</TableCell>
                    <TableCell className="text-sm font-semibold text-green-600 dark:text-green-400 py-2">+{row.purchase}</TableCell>
                    <TableCell className="text-sm font-semibold text-red-600 dark:text-red-400 py-2">-{row.sales}</TableCell>
                    <TableCell className="text-sm font-semibold text-blue-600 dark:text-blue-400 py-2">+{row.transferIn}</TableCell>
                    <TableCell className="text-sm font-semibold text-orange-600 dark:text-orange-400 py-2">-{row.transferOut}</TableCell>
                    <TableCell className="text-sm font-bold text-purple-600 dark:text-purple-400 py-2">{row.closing}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}