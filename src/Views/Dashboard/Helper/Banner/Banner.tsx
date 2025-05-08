import './Banner.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {TEXT} from '../../../../Shared/Constants';
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
        <span>{TEXT.SHOW_NOW}</span>
      </Link>

      <div className="dots-container">
        {images?.map((item, index) => (
          <button
            type="button"
            key={item.src}
            className={`dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
