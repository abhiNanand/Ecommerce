

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import { addToCart } from '../../../Services/Cart/CartService';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from '../../../Shared/Product';
import  Star  from '../../../Views/Dashboard/Helper/Stars/Star';
import './Shop.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartItem } from '../../../Store/Item/total_item_slice';
import { RootState } from '../../../Store/index';
import { useAuth } from '../../../Services/UserAuth';
import { SpinnerLoader } from '../../../Views/Dashboard/Loaders/Loaders';

export default function Shop() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
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

  // Handlers
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
          
        </form>

        <h3>Customer Reviews</h3>
        <button  onClick={() => handleRatingChange(4)}> <Star rating={4} productId='rating-filter'/> & up
        </button>
       
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
        <div className="products-grid">
          {filteredProducts?.length === 0 && (
            <p>No products match the selected filters.</p>
          )}
          {filteredProducts?.map((product: Product) => (
            <div
              key={product.id}
              className="product-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <button
                className="cart-btn"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  if (user) {
                    addToCart(product);
                    toast.success('Added to Cart!');
                    dispatch(updateCartItem(cartCount + 1));
                  } else toast.error('Please Login!');
                }}
              >
                Add to Cart
              </button>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="rating">
                <Star rating={product.rating?.rate} productId={product.id} />
                <span className="text-sm text-gray-500 ml-2">
                  ({product.rating?.count ?? 0})
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
