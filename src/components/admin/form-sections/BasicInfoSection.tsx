import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";
import { CurrencySelect, currencies, CurrencyCode } from "@/components/ui/currency-select";
import React, { useState, useEffect } from "react";

interface BasicInfoSectionProps {
  form: UseFormReturn<ProductFormData>;
}

export function BasicInfoSection({ form }: BasicInfoSectionProps) {
  // Initialize currency from form data or default to INR
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>(
    (form.getValues().currency as CurrencyCode) || "INR"
  );
  
  // Update form's currency field when component mounts
  useEffect(() => {
    if (!form.getValues().currency) {
      form.setValue('currency', selectedCurrency);
    }
  }, []);
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Main General Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., MacBook Pro 16" {...field} />
              </FormControl>
              <FormDescription>Enter the full product name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="series"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Series</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Pro" {...field} />
              </FormControl>
              <FormDescription>Enter the product series</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Apple" {...field} />
              </FormControl>
              <FormDescription>Enter the manufacturer's brand name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., A2485" {...field} />
              </FormControl>
              <FormDescription>Enter the specific model identifier</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thickness"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thickness</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 16.8 mm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dimensions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dimensions</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 355.7 x 248.1 x 16.8 mm" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 2.16 kg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Space Black" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="os"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Operating System</FormLabel>
              <FormControl>
                <Input placeholder="e.g., macOS Sonoma" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="os_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OS Type</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 64-bit" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <div className="flex space-x-2">
                <div className="w-32">
                  <CurrencySelect 
                    value={selectedCurrency} 
                    onValueChange={(currency) => {
                      setSelectedCurrency(currency);
                      // Update the currency in the form
                      form.setValue('currency', currency);
                    }}
                  />
                </div>
                <div className="flex-1">
                  <FormControl>
                    <Input 
                      type="currency"
                      currencySymbol={currencies[selectedCurrency].symbol}
                      placeholder={`Enter price in ${selectedCurrency}`}
                      {...field}
                      onChange={(e) => {
                        // Convert formatted string to number before updating form
                        const value = parseInt(e.target.value.replace(/,/g, ''), 10) || 0;
                        field.onChange(value);
                      }}
                      value={field.value ? field.value.toLocaleString('en-IN') : ''}
                    />
                  </FormControl>
                </div>
              </div>
              <FormDescription>Enter the price in {selectedCurrency}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="buy_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buy Now Link</FormLabel>
              <FormControl>
                <Input placeholder="e.g., https://store.com/product" {...field} />
              </FormControl>
              <FormDescription>Enter the product purchase link</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}