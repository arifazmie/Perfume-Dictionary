import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Search, Heart, ShoppingBag } from "lucide-react";
import UserMenu from "@/components/auth/UserMenu";

interface NavbarProps {
  onSearch?: (query: string) => void;
  categories?: string[];
}

const Navbar = ({
  onSearch = () => {},
  categories = ["Perfumes", "Brands", "Notes", "New Arrivals", "Top Rated"],
}: NavbarProps) => {
  return (
    <nav className="w-full h-16 px-4 bg-white border-b flex items-center justify-between fixed top-0 z-50">
      <div className="flex items-center gap-8">
        <div className="text-xl font-bold">Crafting Dreams</div>

        <NavigationMenu>
          <NavigationMenuList>
            {categories.map((category) => (
              <NavigationMenuItem key={category}>
                <NavigationMenuTrigger className="text-sm">
                  {category}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] p-4">
                    <div className="text-sm">
                      Category content for {category}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative w-64">
          <Input
            type="search"
            placeholder="Search fragrances..."
            className="pr-8"
            onChange={(e) => onSearch(e.target.value)}
          />
          <Search className="absolute right-2 top-2.5 h-4 w-4 text-muted-foreground" />
        </div>

        <Button variant="ghost" size="icon">
          <Heart className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <ShoppingBag className="h-5 w-5" />
        </Button>

        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;
