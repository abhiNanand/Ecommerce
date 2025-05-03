// npm install rc-slider

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useState, useEffect } from 'react';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from '../../../Shared/Product';
import Star from '../../Dashboard/Helper/Stars/Star';
import './Shop.scss';

import {
  SpinnerLoader,
  RippleLoader,
} from '../../Dashboard/Helper/Loaders/Loaders';
import ShowItem from '../ShowItem/ShowItem';

export default function Shop() {
  const { data: products, error, isLoading } = useGetProductQuery(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const minPrice = 0;
  const maxPrice = 1000;
  const [range, setRange] = useState<number[]>([minPrice, maxPrice]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [selectedCategories, selectedRatings, range]);

  if (error) return <h2>Error loading products</h2>;
  if (isLoading) {
    return (
      <div className="loader">
        <SpinnerLoader />
      </div>
    );
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  const filteredProducts = products?.filter((product: Product) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);

    const matchesRating =
      selectedRatings.length === 0 ||
      selectedRatings.includes(Math.floor(product.rating?.rate ?? 0));

    const matchRange = product.price >= range[0] && product.price <= range[1];
    return matchesCategory && matchesRating && matchRange;
  });

  return (
    <div className="shop-container">
      <div className="filters">
        <div className="category-filter-container">
          <h3>Category</h3>
          <form>
            <div className="filter-product-category">
              {' '}
              <input
                type="checkbox"
                id="women"
                onChange={() => handleCategoryChange("women's clothing")}
              />
              <label htmlFor="women">Women's Fashion</label>
            </div>
            <div className="filter-product-category">
              {' '}
              <input
                type="checkbox"
                id="men"
                onChange={() => handleCategoryChange("men's clothing")}
              />
              <label htmlFor="men">Men's Fashion</label>
            </div>
            <div className="filter-product-category">
              {' '}
              <input
                type="checkbox"
                id="electronics"
                onChange={() => handleCategoryChange('electronics')}
              />
              <label htmlFor="electronics">Electronics</label>{' '}
            </div>
            <div className="filter-product-category">
              {' '}
              <input
                type="checkbox"
                id="jewelery"
                onChange={() => handleCategoryChange('jewelery')}
              />
              <label htmlFor="jewelery">Jewellery</label>
            </div>
          </form>
        </div>
        <div className="rating-filter-container">
          <h3>Customer Reviews</h3>
          <div className="filter-product-category">
            <input
              type="checkbox"
              id="rating"
              onChange={() => handleRatingChange(4)}
            />
            <label htmlFor="rating">
              {' '}
              <Star rating={4} productId="rating-filter" />& above
            </label>
          </div>
        </div>

        <div className="range-slider">
          <h3>Price</h3>
          <Slider
            range
            min={minPrice}
            max={maxPrice}
            value={range}
            onChange={(value) => {
              setRange(value as number[]);
            }}
          />
          <div>
            <p>Min: ${range[0]}</p>
            <p>Max: ${range[1]}</p>
          </div>
        </div>
      </div>

      <div className="filtered-products">
        {!loading && filteredProducts?.length === 0 && (
          <p>No products match the selected filters.</p>
        )}
        {loading ? (
          <div className="loader">
            <RippleLoader />
          </div>
        ) : (
          <ShowItem products={filteredProducts} />
        )}
      </div>
    </div>
  );
}
