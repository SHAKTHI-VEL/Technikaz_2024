import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface CategoryHeaderProps {
  title: string;
  subcategories: readonly string[];
  selectedSubcategory: string;
  onSubcategoryChange: (subcategory: string) => void;
}

export function CategoryHeader({
  title,
  subcategories,
  selectedSubcategory,
  onSubcategoryChange,
}: CategoryHeaderProps) {
  return (
    <div className="border-b mb-1">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center py-1 gap-2">
          {/* Title on the left */}
          <h1 className="text-xl sm:text-2xl font-bold text-left sm:w-32 sm:flex-shrink-0">{title}</h1>
          
          {/* Subcategories centered */}
          <div className="flex gap-2 sm:gap-4 overflow-x-auto pb-1 sm:pb-0 sm:justify-center flex-1 sm:px-32">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() => onSubcategoryChange(sub)}
                className={cn(
                  "text-sm font-medium whitespace-nowrap hover:text-primary transition-colors hover:border-b-2 hover:border-primary px-2",
                  selectedSubcategory === sub && "text-primary border-b-2 border-primary"
                )}
              >
                {sub}
              </button>
            ))}
          </div>
          
          {/* Add a matching width spacer on the right for better centering */}
          <div className="hidden sm:block sm:w-32 sm:flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}