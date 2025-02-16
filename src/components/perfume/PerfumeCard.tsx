import React from "react";
import { Link } from "react-router-dom";
import { Star, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PerfumeCardProps {
  id?: string;
  image?: string;
  name?: string;
  brand?: string;
  year?: number;
  rating?: number;
  gender?: string;
  status?: string[];
}

const PerfumeCard = ({
  id = "1",
  image = "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&h=400&fit=crop",
  name = "Enchanted Evening",
  brand = "Luxury Scents",
  year = 2024,
  rating = 4.5,
  gender = "Unisex",
  status = ["NEW", "LIMITED"],
}: PerfumeCardProps) => {
  return (
    <Link to={`/perfume/${id}`} className="block w-[340px]">
      <div className="group relative bg-white rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
        {/* Image Container */}
        <div className="relative h-[340px] overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Status Tags */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {status.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black/80 text-white border-0 text-xs font-medium"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Favorite Button */}
          <button
            className="absolute top-3 right-3 p-2 rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/90"
            onClick={(e) => {
              e.preventDefault();
              // Add to favorites logic here
            }}
          >
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3 bg-white">
          {/* Title and Rating */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-medium text-base leading-tight line-clamp-1">
                {name}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">{brand}</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/5 px-2 py-1 rounded-full">
              <Star className="w-3.5 h-3.5 fill-primary text-primary" />
              <span className="text-xs font-medium text-primary">{rating}</span>
            </div>
          </div>

          {/* Year and Gender */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{year}</span>
            <span>•</span>
            <span>{gender}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PerfumeCard;
