import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArticleCard } from "./ArticleCard";
import { BlogFormData } from "@/types/blog";
import { Link } from "react-router-dom";

interface CarouselSectionProps {
  title: string;
  linkTo: string;
  articles: BlogFormData[];
}

export function CarouselSection({ title, linkTo, articles }: CarouselSectionProps) {
  if (!articles.length) {
    return (
      <div className="text-center py-4 bg-gray-100 rounded-xl">
        <p className="text-gray-500">No articles available at the moment</p>
      </div>
    );
  }

  return (
    <section className="mb-4 sm:mb-6">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-primary uppercase">{title}</h2>
          <Link 
            to={linkTo} 
            className="text-sm text-gray-600 hover:text-primary"
          >
            • See All
          </Link>
        </div>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full relative group"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {articles.map((article) => (
            <CarouselItem
              key={article.slug}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
            >
              <ArticleCard
                title={article.title}
                image={article.image_url || ""}
                category={article.category}
                slug={article.slug}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious 
          className="absolute -left-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white opacity-70 hover:opacity-100 transition-opacity"
        />
        <CarouselNext 
          className="absolute -right-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white opacity-70 hover:opacity-100 transition-opacity"
        />
      </Carousel>
    </section>
  );
}