

import { useState } from 'react';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from '../../../Shared/Product';
import  Star  from '../../../Views/Dashboard/Helper/Stars/Star';
import './Shop.scss';

import { SpinnerLoader } from '../../../Views/Dashboard/Loaders/Loaders';
import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';

export default function Shop() {

  const { data: products, error, isLoading } = useGetProductQuery(null);

  // Filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);

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

    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;

    return matchesCategory && matchesRating && matchesPrice;
  });

  return (
    <div className="shop-container">
      <div className="filters">
        <h3>Category</h3>
        <form>
          <input
            type="checkbox"
            id="women"
            onChange={() => handleCategoryChange("women's clothing")}
          />
          <label htmlFor="women">Women's Fashion</label>
          <br />
          <input
            type="checkbox"
            id="men"
            onChange={() => handleCategoryChange("men's clothing")}
          />
          <label htmlFor="men">Men's Fashion</label>
          <br />
          <input
            type="checkbox"
            id="electronics"
            onChange={() => handleCategoryChange('electronics')}
          />
          <label htmlFor="electronics">Electronics</label>
          <br/>

          <input
            type="checkbox"
            id="jewelery"
            onChange={() => handleCategoryChange('jewelery')}
          />
          <label htmlFor="jewelery">Jewelery</label>
          <br/>
          
        </form>

        <h3>Customer Reviews</h3>
        <input type="checkbox" id="rating" onChange={()=>handleRatingChange(4)}/>
        <label htmlFor='rating'> <Star rating={4} productId='rating-filter'/> & above </label>
        
        
       
        <h3>Price</h3>
        <form>
          <label htmlFor="min">Min:</label>
          <input
            type="number"
            id="min"
            onChange={(e) => setMinPrice(Number(e.target.value) || 0)}
            placeholder="0"
          />
          <br />
          <label htmlFor="max">Max:</label>
          <input
            type="number"
            id="max"
            onChange={(e) => setMaxPrice(Number(e.target.value) || Infinity)}
            placeholder="No limit"
          />
        </form>
      </div>

      <div className="filtered-products">
          {filteredProducts?.length === 0 && (
            <p>No products match the selected filters.</p>
          )}
          <ShowItem products={filteredProducts}/>
      </div>
    </div>
  );
}
