"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, DollarSign, ShoppingCart } from "lucide-react";

const salesData = [
  { date: "2025-07-29", branch: "Main Street", payment: "Credit Card", total: 5000, items: 100, avg: 50 },
  { date: "2025-07-29", branch: "Main Street", payment: "Cash", total: 3200, items: 80, avg: 40 },
  { date: "2025-07-29", branch: "Downtown", payment: "Credit Card", total: 6000, items: 120, avg: 50 },
  { date: "2025-07-29", branch: "Downtown", payment: "Cash", total: 3500, items: 90, avg: 38.89 },
];

export default function SalesReportPage() {
  const [branch, setBranch] = useState("all");
  const [payment, setPayment] = useState("all");

  const filtered = salesData.filter(row =>
    (branch === "all" || row.branch === branch) &&
    (payment === "all" || row.payment === payment)
  );

  const totalSales = filtered.reduce((sum, row) => sum + row.total, 0);
  const totalItems = filtered.reduce((sum, row) => sum + row.items, 0);
  const avgOrderValue = totalItems > 0 ? totalSales / totalItems : 0;

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20 p-4 rounded-xl border border-green-200/50 dark:border-green-800/50">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-5 w-5 text-green-600 dark:text-green-400" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">Sales Report</h1>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">Analyze sales performance by date, branch, and payment method</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg">
                <DollarSign className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Sales</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Rs. {totalSales.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
                <ShoppingCart className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Items Sold</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">{totalItems.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Avg Order Value</p>
                <p className="text-lg font-bold text-gray-900 dark:text-gray-100">Rs. {avgOrderValue.toFixed(2)}</p>
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
            <div className="flex-1">
              <Select value={payment} onValueChange={setPayment}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="All Payment Methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payment Methods</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Data Table */}
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/20 dark:border-gray-600/20 shadow-lg">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">Sales Data</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-gray-200 dark:border-gray-700">
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Date</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Branch</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Payment Method</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Total Sales</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Items Sold</TableHead>
                  <TableHead className="text-xs font-semibold text-gray-700 dark:text-gray-300 py-2">Avg Order Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row, i) => (
                  <TableRow key={i} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <TableCell className="text-sm text-gray-900 dark:text-gray-100 py-2">{row.date}</TableCell>
                    <TableCell className="text-sm text-gray-700 dark:text-gray-300 py-2">{row.branch}</TableCell>
                    <TableCell className="py-2">
                      <Badge 
                        className={`text-xs px-2 py-1 ${
                          row.payment === 'Credit Card' 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' 
                            : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                        }`}
                      >
                        {row.payment}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm font-semibold text-green-600 dark:text-green-400 py-2">
                      Rs. {row.total.toLocaleString()}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700 dark:text-gray-300 py-2">{row.items}</TableCell>
                    <TableCell className="text-sm font-medium text-gray-900 dark:text-gray-100 py-2">
                      Rs. {row.avg.toFixed(2)}
                    </TableCell>
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