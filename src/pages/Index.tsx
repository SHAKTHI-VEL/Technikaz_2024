import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FeaturedArticlesGrid } from "@/components/FeaturedArticlesGrid";
import { CarouselSection } from "@/components/CarouselSection";
import { ArticleTabs } from "@/components/ArticleTabs";
import { BlogSidebar } from "@/components/BlogSidebar";
import { PopularMobiles } from "@/components/product/PopularMobiles";
import type { BlogFormData } from "@/types/blog";

export default function Index() {
  const [activeTab, setActiveTab] = useState("popular");

  const { data: featuredArticles = [] } = useQuery({
    queryKey: ['featured-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('featured', true)
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: popularArticles = [] } = useQuery({
    queryKey: ['popular-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('popular', true)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data || [];
    }
  });

  const { data: recentArticles = [] } = useQuery({
    queryKey: ['recent-articles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);
      
      if (error) throw error;
      return data || [];
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="py-2 sm:py-4">
        <div className="px-4 sm:container sm:mx-auto">
          <FeaturedArticlesGrid articles={featuredArticles} />
        </div>

        <div className="mt-4 sm:mt-6">
          <div className="w-full h-[120px] sm:h-[200px] bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Advertisement</span>
          </div>
        </div>

        <div className="px-4 sm:container sm:mx-auto mt-4 sm:mt-6">
          <CarouselSection 
            title="Tech Deals" 
            linkTo="/tech" 
            articles={popularArticles.filter(article => article.category === 'TECH')} 
          />

          <div className="mt-4 sm:mt-6">
            <PopularMobiles />
          </div>

          {/* Advertisement above popular/recent tabs */}
          <div className="mt-4 sm:mt-6">
            <div className="w-full h-[120px] sm:h-[200px] bg-gray-200 flex items-center justify-center rounded-lg">
              <span className="text-gray-500">Advertisement</span>
            </div>
          </div>

          <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            <div className="lg:col-span-8">
              <ArticleTabs
                popularArticles={popularArticles}
                recentArticles={recentArticles}
                onTabChange={setActiveTab}
                category="HOME"
              />
            </div>

            <div className="lg:col-span-4">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}