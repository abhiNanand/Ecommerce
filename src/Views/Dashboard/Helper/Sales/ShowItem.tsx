

import { Star, Heart } from 'lucide-react';
import { useState } from 'react';
 
import { addToCart } from '../../../../Services/Cart/CartService';
import {
  addToWishlist,
  removeFromWishlist,

} from '../../../../Services/Wishlist/WishlistService';
import { Product } from '../../../../Shared/Product';

import './ShowItem.scss';
import { useNavigate } from 'react-router-dom';

interface SalesItemProps {
  products: Product[]; // Expecting an array of Product
}

export default function SalesItem({products}:SalesItemProps) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
 
  const navigate = useNavigate();



  const handleWishlistClick = async (product: Product) => {
    try {
      const isLiked = likedItems.has(product.id);

      if (isLiked) {
        await removeFromWishlist(product.id);
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      } else {
        await addToWishlist(product);
        setLikedItems((prev) => new Set([...prev, product.id]));
      }
    } catch (wishListError) {
      console.error('Error handling wishlist action:', wishListError);
    }
  };//

  return (
    <div className="products-grid">
      {products?.map((product: Product) => (
        <div key={product.id} className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
          <button
            type="button"
            className="add-wishlist-btn"
            onClick={(event) => { event.stopPropagation(); handleWishlistClick(product); }}
          >
            <Heart
              color={likedItems.has(product.id) ? 'red' : 'black'}
              fill={likedItems.has(product.id) ? 'red' : 'none'}
              size={24}
            />
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <button
            className="cart-btn"
            type="button"
            onClick={(event) => { event.stopPropagation(); addToCart(product); }}
          >
            Add to Cart
          </button>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={`${product.id}-${i}`}
                size={16}
                className={
                  i < Math.round(product.rating?.rate ?? 0)
                    ? 'star filled'
                    : 'star'
                }
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              ({product.rating?.count ?? 0})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
