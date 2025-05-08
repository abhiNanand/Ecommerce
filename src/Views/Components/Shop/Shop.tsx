/* eslint-disable jsx-a11y/label-has-associated-control */
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { useState, useEffect } from 'react';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from '../../../Shared/Product';
import Star from '../ShowItem/Star';
import './Shop.scss';

import {
  SpinnerLoader,
  RippleLoader,
} from '../../Dashboard/Helper/Loaders/Loaders';
import ShowItem from '../ShowItem/ShowItem';
import { TEXT } from '../../../Shared/Constants';

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

  if (error) return <h2>{TEXT.ERROR_LOADING}</h2>;
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
          <h3>{TEXT.CATEGORIES}</h3>
          <form>
            <div className="filter-product-category">
              <input
                type="checkbox"
                id="women"
                onChange={() => handleCategoryChange("women's clothing")}
              />
              <label htmlFor="women">{TEXT.WOMENS_FASHION}</label>
            </div>
            <div className="filter-product-category">
              <input
                type="checkbox"
                id="men"
                onChange={() => handleCategoryChange("men's clothing")}
              />
              <label htmlFor="men">{TEXT.MENS_FASHION}</label>
            </div>
            <div className="filter-product-category">
              <input
                type="checkbox"
                id="electronics"
                onChange={() => handleCategoryChange('electronics')}
              />
              <label htmlFor="electronics">{TEXT.ELECTRONICS}</label>{' '}
            </div>
            <div className="filter-product-category">
              {' '}
              <input
                type="checkbox"
                id="jewelery"
                onChange={() => handleCategoryChange('jewelery')}
              />
              <label htmlFor="jewelery">{TEXT.JEWELLERY}</label>
            </div>
          </form>
        </div>
        <div className="rating-filter-container">
          <h3>{TEXT.CUSTOMER_REVIEWS}</h3>
          <div className="filter-product-category">
            <input
              type="checkbox"
              id="rating"
              onChange={() => handleRatingChange(4)}
            />
            <label htmlFor="rating">
              {' '}
              <Star rating={4} productId="rating-filter" />{TEXT.AND_ABOVE}
            </label>
          </div>
        </div>

        <div className="range-slider">
          <h3>{TEXT.PRICE}</h3>
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
            <p>{TEXT.MIN}: ${range[0]}</p>
            <p>{TEXT.MAX}: ${range[1]}</p>
          </div>
        </div>
      </div>

      <div className="filtered-products">
        {!loading && filteredProducts?.length === 0 && (
          <p>{TEXT.NO_PRODUCTS_MATCH}</p>
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
