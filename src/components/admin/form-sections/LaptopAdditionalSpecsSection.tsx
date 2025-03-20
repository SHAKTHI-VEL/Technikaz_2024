import * as React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/schemas/productSchemas";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

interface LaptopAdditionalSpecsSectionProps {
  form: UseFormReturn<ProductFormData>;
  productType: 'mobile' | 'laptop';
}

export function LaptopAdditionalSpecsSection({ form, productType }: LaptopAdditionalSpecsSectionProps) {
  if (productType !== 'laptop') {
    return null;
  }

  return (
    <div className="space-y-6 text-left">
      {/* Connectivity Section */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Connectivity</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="wlan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>WLAN</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Wi-Fi 6" {...field} />
                </FormControl>
                <FormDescription>Wireless connectivity standard</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="wifi_version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wi-Fi Version</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 802.11ax" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bluetooth_version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bluetooth Version</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 5.2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Ports & Slots */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Ports & Slots</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="hdmi_ports"
            render={({ field }) => (
              <FormItem>
                <FormLabel>HDMI Ports</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 x HDMI 2.0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="usb_type_c"
            render={({ field }) => (
              <FormItem>
                <FormLabel>USB Type-C</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 x USB 3.2 Gen 2 Type-C" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ethernet_ports"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ethernet Ports</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 x RJ45" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="headphone_jack"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Headphone Jack</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="microphone_jack"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Microphone Jack</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Multimedia */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Multimedia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="webcam"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Webcam</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="video_recording"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video Recording</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., HD 720p" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="audio_solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Audio Solution</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Dolby Audio" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="microphone"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel>Microphone</FormLabel>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Additional Features */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Additional Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="backlit_keyboard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Backlit Keyboard</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., RGB Backlit" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="face_recognition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Face Recognition</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Windows Hello" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      {/* Warranty & Package */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Warranty & Package</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="warranty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Warranty</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 1 Year Manufacturer Warranty" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="sales_package"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sales Package</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Laptop, Power Adapter, User Guide" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
