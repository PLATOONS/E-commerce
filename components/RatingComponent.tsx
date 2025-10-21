import React from "react";

interface RatingProps{
    rate: number;
    reviews: number|null;
};

const Rating: React.FC<RatingProps> = ({rate, reviews}) => {
    const roundRate = Math.round(rate*2)/2;
    const fullStars = Math.floor(roundRate);
    const halfstars = roundRate % 1 !== 0;
    const emptystars = 5 - fullStars -(halfstars? 1:0);

    return (
    <div className="flex items-center gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <span key={`llena-${index}`} className="text-black-400 text-lg">
          ★
        </span>
      ))}
      {halfstars && (
        <span className="text-black-400 text-lg">½</span>
      )}
      {[...Array(emptystars)].map((_, index) => (
        <span key={`vacia-${index}`} className="text-gray-300 text-lg">
          ☆
        </span>
      ))}
      {reviews !== null && (
        <span className="ml-2 text-sm text-gray-600">
          ({reviews} {reviews === 1 ? 'reseña' : 'reseñas'})
        </span>
      )}
    </div>
  );
};

export default Rating;