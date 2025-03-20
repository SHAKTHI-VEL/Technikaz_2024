import { supabase } from "@/integrations/supabase/client";
import type { MobileProductData, LaptopProductData } from "@/components/admin/types/productTypes";

export function useProductData() {
  const insertProduct = async (
    table: string,
    data: MobileProductData | LaptopProductData,
    productType: 'mobile' | 'laptop'
  ) => {
    try {
      // Remove laptop-specific fields when inserting a mobile product
      if (productType === 'mobile') {
        const {
          os_type,
          graphics,
          graphics_memory,
          clock_speed,
          cache,
          ram_type,
          ram_speed,
          memory_slots,
          expandable_memory,
          ssd_capacity,
          battery_cell,
          battery_type,
          power_supply,
          battery_life,
          wifi_version,
          bluetooth_version,
          hdmi_ports,
          usb_type_c,
          ethernet_ports,
          headphone_jack,
          microphone_jack,
          webcam,
          video_recording,
          audio_solution,
          microphone,
          backlit_keyboard,
          face_recognition,
          warranty,
          sales_package,
          ...mobileData
        } = data as any;
        
        const { data: result, error } = await supabase
          .from(table)
          .insert(mobileData)
          .select()
          .single();

        if (error) throw error;
        return result;
      }

      // For laptops, use the data as is
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (error: any) {
      console.error('Error inserting product:', error);
      throw error;
    }
  };

  const updateProduct = async (
    table: string,
    id: string,
    data: Partial<MobileProductData | LaptopProductData>,
    productType: 'mobile' | 'laptop'
  ) => {
    try {
      // Remove laptop-specific fields when updating a mobile product
      if (productType === 'mobile') {
        const {
          os_type,
          graphics,
          graphics_memory,
          clock_speed,
          cache,
          ram_type,
          ram_speed,
          memory_slots,
          expandable_memory,
          ssd_capacity,
          battery_cell,
          battery_type,
          power_supply,
          battery_life,
          wifi_version,
          bluetooth_version,
          hdmi_ports,
          usb_type_c,
          ethernet_ports,
          headphone_jack,
          microphone_jack,
          webcam,
          video_recording,
          audio_solution,
          microphone,
          backlit_keyboard,
          face_recognition,
          warranty,
          sales_package,
          ...mobileData
        } = data as any;

        const { data: result, error } = await supabase
          .from(table)
          .update(mobileData)
          .eq('id', id)
          .select()
          .single();

        if (error) throw error;
        return result;
      }

      // For laptops, use the data as is
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return result;
    } catch (error: any) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  return {
    insertProduct,
    updateProduct,
  };
}
