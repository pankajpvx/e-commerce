import "../style/starRating.css";
import { StarSvg } from "../svgs/StarSvg";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  totalRatings?: number;
}

export function StarRating({
  rating,
  maxRating = 5,
  totalRatings,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const partialStar = rating % 1;
  const emptyStars = maxRating - fullStars - (partialStar > 0 ? 1 : 0);

  return (
    <div className="flex product-rating-container">
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <StarSvg key={`full-${i}`} className="star fullStar" />
        ))}
        {partialStar > 0 && (
          <div className="partialStarContainer">
            <StarSvg className="star emptyStar" />
            <div
              className="partialStarOverlay"
              style={{ width: `${partialStar * 100}%` }}
            >
              <StarSvg className="star fullstar" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <StarSvg key={`empty-${i}`} className="star emptyStar" />
        ))}
      </div>
      <span className="ratingText">{rating.toFixed(1)}</span>
      {totalRatings !== undefined && (
        <>
          <span className="totalRatings">
            ({totalRatings.toLocaleString()})
          </span>
          <span>Ratings</span>
        </>
      )}
    </div>
  );
}
