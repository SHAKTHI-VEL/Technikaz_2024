import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { type BlogFormData } from "@/types/blog";
import { useNavigate } from "react-router-dom";
import { FormFields } from "./FormFields";

interface BlogFormProps {
  initialData?: BlogFormData;
  mode?: 'create' | 'edit';
}

export function BlogForm({ initialData, mode = 'create' }: BlogFormProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialData?.category || "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const form = useForm<BlogFormData>({
    defaultValues: initialData || {
      title: "",
      content: "",
      category: "",
      subcategories: [],
      author: "",
      image_url: "",
      slug: "",
      featured: false,
      popular: false,
      meta_title: "",
      meta_description: "",
      meta_keywords: "",
      is_draft: true,
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const generateSlug = async (title: string) => {
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const timestamp = new Date().getTime();
    const uniqueSlug = `${baseSlug}-${timestamp}`;
    
    const { data: existingPost } = await supabase
      .from('blogs')
      .select('slug')
      .eq('slug', uniqueSlug)
      .maybeSingle();

    if (existingPost) {
      return `${uniqueSlug}-${Math.floor(Math.random() * 1000)}`;
    }

    return uniqueSlug;
  };

  const handleSave = async (data: BlogFormData, isDraft: boolean) => {
    try {
      setIsLoading(true);
      
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user?.email) {
        throw new Error('User email not found');
      }

      if (mode === 'create') {
        data.slug = await generateSlug(data.title);
      }

      if (imageFile) {
        const fileExt = imageFile.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("blog-images")
          .upload(filePath, imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("blog-images")
          .getPublicUrl(filePath);

        data.image_url = publicUrlData.publicUrl;
      }

      if (!data.category && selectedCategory) {
        data.category = selectedCategory;
      }

      // Set draft status
      data.is_draft = isDraft;
      data.draft_at = new Date().toISOString();
      if (!isDraft) {
        data.published_at = new Date().toISOString();
      }

      if (mode === 'edit' && initialData?.id) {
        const { error } = await supabase
          .from("blogs")
          .update(data)
          .eq('id', initialData.id);

        if (error) throw error;

        await supabase.from('admin_logs').insert({
          user_email: session.user.email,
          action_type: 'update',
          entity_type: 'blog',
          entity_id: initialData.id,
          entity_name: data.title,
          details: `Updated blog post "${data.title}" (${isDraft ? 'Draft' : 'Published'})`
        });

        toast({
          title: "Success",
          description: `Blog post ${isDraft ? 'saved as draft' : 'published'} successfully`,
        });

        navigate('/admin');
      } else {
        const { error } = await supabase
          .from("blogs")
          .insert([data]);

        if (error) throw error;

        const { data: newBlog, error: fetchError } = await supabase
          .from("blogs")
          .select("id")
          .eq("slug", data.slug)
          .single();

        if (fetchError) throw fetchError;

        await supabase.from('admin_logs').insert({
          user_email: session.user.email,
          action_type: 'create',
          entity_type: 'blog',
          entity_id: newBlog.id,
          entity_name: data.title,
          details: `Created new blog post "${data.title}" (${isDraft ? 'Draft' : 'Published'})`
        });

        toast({
          title: "Success",
          description: `Blog post ${isDraft ? 'saved as draft' : 'published'} successfully`,
        });

        form.reset();
        setImageFile(null);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormFields
          form={form}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onImageChange={handleImageChange}
        />
        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => handleSave(form.getValues(), true)}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save as Draft"}
          </Button>
          <Button 
            type="button"
            onClick={() => handleSave(form.getValues(), false)}
            disabled={isLoading}
          >
            {isLoading ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </form>
    </Form>
  );
}