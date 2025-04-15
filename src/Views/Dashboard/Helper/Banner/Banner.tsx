import './Banner.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import assets from '../../../../assets';

const images = [
  { src: assets.images.banner1, link: '/shop' },
  { src: assets.images.banner2, link: '/shop' },
  { src: assets.images.banner3, link: '/shop' },
];

export default function Banner() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="banner-container">
      <img
        src={images[currentIndex].src}
        alt="Banner"
        className="banner-image"
      />
      <Link to={images[currentIndex].link} className="shop-now-btn">
        <span>Shop Now</span>
      </Link>

      <div className="dots-container">
        {images?.map((item, index) => (
          <div
            role="button"
            tabIndex={0}
            key={item.src}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
