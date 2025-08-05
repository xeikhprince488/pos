"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Scan, AlertCircle } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  sku: string;
}

interface Props {
  products: Product[];
  onScan: (product: Product) => void;
}

export default function BarcodeScanner({ products, onScan }: Props) {
  const [barcode, setBarcode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleScan = useCallback(() => {
    if (!barcode.trim()) {
      setErrorMessage("Please enter a barcode");
      return;
    }
    
    const matched = products.find((p) => p.sku === barcode.trim());
    if (matched) {
      onScan(matched);
      setBarcode("");
      setErrorMessage("");
    } else {
      setErrorMessage("Product not found for this barcode");
    }
  }, [barcode, products, onScan]);
  
  const handleBarcodeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setBarcode(e.target.value);
    if (errorMessage) setErrorMessage(""); // Clear error when typing
  }, [errorMessage]);
  
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleScan();
    }
  }, [handleScan]);

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex items-center gap-1">
        <Input
          placeholder="Scan barcode..."
          value={barcode}
          onChange={handleBarcodeChange}
          onKeyDown={handleKeyDown}
          className="w-32 h-8 text-xs bg-white/50 dark:bg-gray-700/50 border-white/20 dark:border-gray-600/20 focus:border-green-300 dark:focus:border-green-600 transition-colors"
        />
        <Button 
          size="sm"
          variant="outline" 
          onClick={handleScan}
          className="h-8 px-2 border-green-200 hover:border-green-300 hover:bg-green-50 dark:border-green-800 dark:hover:bg-green-900/20 transition-colors"
        >
          <Scan className="h-3 w-3 mr-1" />
          Scan
        </Button>
      </div>

      {/* Error message UI */}
      {errorMessage && (
        <div className="flex items-center gap-1 mt-1">
          <AlertCircle className="h-3 w-3 text-red-500" />
          <p className="text-red-500 text-xs">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
