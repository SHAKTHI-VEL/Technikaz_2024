import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Search, X } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { DialogTitle } from "@/components/ui/dialog";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  created_at: string;
  slug: string;
}

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Reset search when dialog closes
  useEffect(() => {
    if (!open) {
      setSearchQuery("");
    }
  }, [open]);

  // Query for search results
  const { data: searchResults = [], isLoading } = useQuery({
    queryKey: ['search-articles', searchQuery],
    queryFn: async ({ queryKey }) => {
      const [_key, query] = queryKey;
      if (!query || query.length < 2) return [];
      
      try {
        const searchTerm = query.trim();
        
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, category, created_at, slug')
          .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          console.error('Search error:', error);
          return [];
        }

        return data || [];
      } catch (err) {
        console.error('Unexpected error during search:', err);
        return [];
      }
    },
    enabled: searchQuery.length >= 2,
  });

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
  };

  const handleSelectArticle = (slug: string) => {
    navigate(`/article/${slug}`);
    setOpen(false);
  };

  return (
    <div className={isMobile ? "relative" : "relative w-full max-w-[250px] sm:max-w-[350px]"}>
      {isMobile ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          className="h-8 w-8 p-0"
        >
          <Search className="h-4 w-4" />
        </Button>
      ) : (
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-start text-muted-foreground"
          onClick={() => setOpen(true)}
        >
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          Search articles...
        </Button>
      )}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Search Articles</DialogTitle>
        <div className="flex items-center justify-between p-2 border-b">
          <DialogTitle className="text-lg font-semibold">Search Articles</DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Type to search articles..."
            value={searchQuery}
            onValueChange={handleSearchInput}
            autoFocus
          />
          <CommandList className="max-h-[50vh] overflow-y-auto">
            {searchQuery.length < 2 ? (
              <CommandEmpty>
                Type at least 2 characters to search...
              </CommandEmpty>
            ) : isLoading ? (
              <CommandEmpty>
                Searching...
              </CommandEmpty>
            ) : searchResults.length > 0 ? (
              <CommandGroup heading="Search Results">
                {searchResults.map((article) => (
                  <CommandItem
                    key={article.id}
                    value={article.title}
                    onSelect={() => handleSelectArticle(article.slug)}
                    className="flex items-center gap-2 p-2 cursor-pointer"
                  >
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <div className="flex flex-col">
                      <span className="font-medium line-clamp-1">{article.title}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {article.category} • {new Date(article.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>
                No matching articles found. Try different keywords.
              </CommandEmpty>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}