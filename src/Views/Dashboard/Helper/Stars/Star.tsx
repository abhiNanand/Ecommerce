import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './Star.scss';

interface StarProps {
  rating: number | undefined;
  productId: string;
}

export default function Star({ rating, productId }: StarProps) {
  if (rating === undefined) return null;
  const totalStars = 5;

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        if (rating >= starValue) {
          return <FaStar key={`${productId}-star-${index}`} />;
        }
        if (rating >= starValue - 0.5) {
          return <FaStarHalfAlt key={`${productId}-star-${index}`} />;
        }
        return <FaRegStar key={`${productId}-star-${index}`} />;
      })}
    </div>
  );
}
