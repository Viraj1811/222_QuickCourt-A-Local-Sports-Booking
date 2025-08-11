"use client";

import { useState } from "react";
import StarIcon from "@/components/icons/StarIcon";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  className?: string;
  size?: "sm" | "md" | "lg";
};

export default function StarRating({
  rating,
  onRatingChange,
  className,
  size = "md",
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const starSize = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const handleClick = (index: number) => {
    if (onRatingChange) {
      onRatingChange(index);
    }
  };

  const handleMouseEnter = (index: number) => {
    if (onRatingChange) {
      setHoverRating(index);
    }
  };

  const handleMouseLeave = () => {
    if (onRatingChange) {
      setHoverRating(0);
    }
  };

  const displayRating = onRatingChange ? hoverRating || rating : rating;

  return (
    <div className={cn("flex items-center", className)}>
      {[1, 2, 3, 4, 5].map((index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          disabled={!onRatingChange}
          className={cn(
            "p-0 bg-transparent border-none",
            onRatingChange && "cursor-pointer"
          )}
          aria-label={`Rate ${index} star${index > 1 ? 's' : ''}`}
        >
          <StarIcon
            className={starSize[size]}
            filled={index <= displayRating}
          />
        </button>
      ))}
    </div>
  );
}
