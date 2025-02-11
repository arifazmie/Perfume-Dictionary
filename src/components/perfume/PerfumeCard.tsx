import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface PerfumeCardProps {
  image?: string;
  name?: string;
  brand?: string;
  year?: number;
  rating?: number;
  gender?: string;
  status?: string[];
}

const PerfumeCard = ({
  image = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=400&fit=crop",
  name = "Enchanted Evening",
  brand = "Luxury Scents",
  year = 2024,
  rating = 4.5,
  gender = "Unisex",
  status = ["NEW", "LIMITED"],
}: PerfumeCardProps) => {
  return (
    <Card className="w-[340px] h-[420px] bg-white hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      <CardHeader className="p-0 h-[250px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-lg truncate">{name}</h3>
              <p className="text-muted-foreground text-sm">{brand}</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{year}</span>
            <span>•</span>
            <span>{gender}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-2">
          {status.map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PerfumeCard;
