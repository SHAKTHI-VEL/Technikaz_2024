import { Button } from "@/components/ui/button";
import { Facebook, Youtube, Instagram } from "lucide-react";

export function SocialLinks() {
  return (
    <div className="flex gap-1 sm:gap-2">
      <a href="https://www.facebook.com/technikaz" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
          <Facebook className="h-4 w-4" />
        </Button>
      </a>
      <a href="https://youtube.com/@technikaz" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
          <Youtube className="h-4 w-4" />
        </Button>
      </a>
      <a href="https://www.instagram.com/technikazofficial" target="_blank" rel="noopener noreferrer">
        <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-primary">
          <Instagram className="h-4 w-4" />
        </Button>
      </a>
    </div>
  );
}