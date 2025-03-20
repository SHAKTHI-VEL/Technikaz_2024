import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { MobileProductData, LaptopProductData } from "../types/productTypes";

interface MobileSpecsSectionProps {
  form: UseFormReturn<MobileProductData | LaptopProductData>;
  productType: 'mobile' | 'laptop';
}

export function MobileSpecsSection({ form, productType }: MobileSpecsSectionProps) {
  if (productType !== 'mobile') {
    return null;
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Core Mobile Specifications</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Display Specs */}
        <FormField
          control={form.control}
          name="display_specs"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Specifications</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 6.7-inch Super Retina XDR OLED" {...field} />
              </FormControl>
              <FormDescription>Full display specifications</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Processor */}
        <FormField
          control={form.control}
          name="processor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Processor</FormLabel>
              <FormControl>
                <Input placeholder="e.g., A17 Pro" {...field} />
              </FormControl>
              <FormDescription>Main processor name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* RAM */}
        <FormField
          control={form.control}
          name="ram"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RAM</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 8GB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Storage */}
        <FormField
          control={form.control}
          name="storage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Storage</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 256GB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Battery */}
        <FormField
          control={form.control}
          name="battery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Battery</FormLabel>
              <FormControl>
                <Input placeholder="e.g., 4422 mAh" {...field} />
              </FormControl>
              <FormDescription>Battery capacity and type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
