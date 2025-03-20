import './Banner.scss';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import bannerImg1 from './bannerImg1.png';
import bannerImg2 from './bannerImg2.jpg';
import bannerImg3 from './bannerImg3.jpg';

const images = [
    { src: bannerImg1, link: '/shop' },
    { src: bannerImg2, link: '/shop' },
    { src: bannerImg3, link: '/shop' }
];

export default function Banner() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="banner-container">
            <img src={images[currentIndex].src} alt="Banner" className="banner-image" />
            <Link to={images[currentIndex].link} className="shop-now-btn">
                <span>Shop Now</span>
            </Link>

            <div className="dots-container">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`dot ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}
