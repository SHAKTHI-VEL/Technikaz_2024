import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export function useImageUpload() {
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [galleryImageFiles, setGalleryImageFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Only JPEG, PNG and WebP images are allowed",
      });
      return false;
    }

    return true;
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setMainImageFile(file);
      } else {
        e.target.value = ''; // Reset input
      }
    }
  };

  const handleGalleryImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const validFiles = files.filter(file => validateFile(file));
      
      if (validFiles.length !== files.length) {
        e.target.value = ''; // Reset input if any files were invalid
      }
      
      setGalleryImageFiles(validFiles);
    }
  };

  const handleRemoveGalleryImage = (index: number, form: any) => {
    const currentImages = form.getValues().gallery_images || [];
    const updatedImages = [...currentImages];
    updatedImages.splice(index, 1);
    form.setValue('gallery_images', updatedImages);
  };


  const uploadImage = async (file: File, folder: string): Promise<string> => {
    if (!validateFile(file)) {
      throw new Error('Invalid file');
    }

    try {
      const fileExt = file.name.split(".").pop() || 'jpg';
      const fileName = `${folder}/${Math.random()}.${fileExt}`;

      // Upload with retries
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          const { error: uploadError } = await supabase.storage
            .from("blog-images")
            .upload(fileName, file, {
              cacheControl: '3600',
              upsert: true,
              contentType: file.type
            });

          if (uploadError) {
            if (uploadError.message && (uploadError.message.includes('413') || uploadError.message.includes('too large'))) {
              throw new Error('Image file is too large. Please use a smaller image.');
            }
            throw uploadError;
          }

          const { data: publicUrlData } = supabase.storage
            .from("blog-images")
            .getPublicUrl(fileName);

          if (!publicUrlData || !publicUrlData.publicUrl) {
            throw new Error('Failed to get public URL for uploaded image');
          }

          return publicUrlData.publicUrl;
        } catch (error: any) {
          attempts++;
          
          if (attempts === maxAttempts || 
              (error.message && (error.message.includes('too large') || error.message.includes('413')))) {
            throw error;
          }
          
          // Simple delay before retrying
          await new Promise(resolve => setTimeout(resolve, 1000 * attempts));
        }
      }
      
      throw new Error('Failed to upload image after multiple attempts');
    } catch (error: any) {
      console.error('Error uploading image:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  };

  return {
    mainImageFile,
    galleryImageFiles,
    handleMainImageChange,
    handleGalleryImagesChange,
    handleRemoveGalleryImage,
    uploadImage,
  };
}