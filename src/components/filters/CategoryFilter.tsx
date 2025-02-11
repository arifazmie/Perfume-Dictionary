import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface FilterOption {
  id: string;
  label: string;
  count: number;
}

interface CategoryFilterProps {
  categories?: FilterOption[];
  brands?: FilterOption[];
  notes?: FilterOption[];
  genders?: FilterOption[];
  onFilterChange?: (category: string, id: string, checked: boolean) => void;
}

const CategoryFilter = ({
  categories = [
    { id: "floral", label: "Floral", count: 156 },
    { id: "woody", label: "Woody", count: 98 },
    { id: "oriental", label: "Oriental", count: 87 },
  ],
  brands = [
    { id: "chanel", label: "Chanel", count: 45 },
    { id: "dior", label: "Dior", count: 38 },
    { id: "gucci", label: "Gucci", count: 32 },
  ],
  notes = [
    { id: "vanilla", label: "Vanilla", count: 89 },
    { id: "rose", label: "Rose", count: 76 },
    { id: "oud", label: "Oud", count: 54 },
  ],
  genders = [
    { id: "unisex", label: "Unisex", count: 245 },
    { id: "feminine", label: "Feminine", count: 189 },
    { id: "masculine", label: "Masculine", count: 167 },
  ],
  onFilterChange = () => {},
}: CategoryFilterProps) => {
  return (
    <div className="w-[280px] h-[850px] bg-white border-r p-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <ScrollArea className="h-[calc(100%-2rem)]">
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem value="categories">
            <AccordionTrigger>Categories</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id={`category-${category.id}`}
                      onCheckedChange={(checked) =>
                        onFilterChange(
                          "category",
                          category.id,
                          checked as boolean,
                        )
                      }
                    />
                    <Label
                      htmlFor={`category-${category.id}`}
                      className="flex-1"
                    >
                      {category.label}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      ({category.count})
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="brands">
            <AccordionTrigger>Brands</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand.id}`}
                      onCheckedChange={(checked) =>
                        onFilterChange("brand", brand.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={`brand-${brand.id}`} className="flex-1">
                      {brand.label}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      ({brand.count})
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="notes">
            <AccordionTrigger>Notes</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {notes.map((note) => (
                  <div key={note.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`note-${note.id}`}
                      onCheckedChange={(checked) =>
                        onFilterChange("note", note.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={`note-${note.id}`} className="flex-1">
                      {note.label}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      ({note.count})
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <Separator />

          <AccordionItem value="gender">
            <AccordionTrigger>Gender</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {genders.map((gender) => (
                  <div key={gender.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`gender-${gender.id}`}
                      onCheckedChange={(checked) =>
                        onFilterChange("gender", gender.id, checked as boolean)
                      }
                    />
                    <Label htmlFor={`gender-${gender.id}`} className="flex-1">
                      {gender.label}
                    </Label>
                    <span className="text-sm text-muted-foreground">
                      ({gender.count})
                    </span>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </ScrollArea>
    </div>
  );
};

export default CategoryFilter;
