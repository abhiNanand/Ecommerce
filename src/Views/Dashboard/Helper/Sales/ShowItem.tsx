

import { Star, Heart } from 'lucide-react';
import { useState,useEffect } from 'react';

import { addToCart } from '../../../../Services/Cart/CartService';
import {
  addToWishlist,
  getWishlistItems

} from '../../../../Services/Wishlist/WishlistService';
import { Product } from '../../../../Shared/Product';

import './ShowItem.scss';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import DeleteFromWishlist from './helper/deleteFromWishlist';

interface SalesItemProps {
  products: Product[];
}

export default function SalesItem({ products }: SalesItemProps) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const navigate = useNavigate();


  useEffect(() => {
    const fetchWishlist = async () => {
      const wishlist = await getWishlistItems();
      const likedProductIds = new Set(wishlist.map((item) => item.id)); // Assuming 'id' is unique
      setLikedItems(likedProductIds);
    };

    fetchWishlist();
  }, []);

  const handleWishlistClick = async (product: Product) => {
    try {
      const isLiked = likedItems.has(product.id);

      if (isLiked) {
      await  DeleteFromWishlist(product);
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
        toast.success('Removed from Wishlist!');
      } else {
        await addToWishlist(product);
        setLikedItems((prev) => new Set([...prev, product.id]));
        toast.success('Added to Wishlist!');
      }
    } catch (wishListError) {
      console.error('Error handling wishlist action:', wishListError);
    }
  };//

  return (
    <>
 <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
   
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
            onClick={(event) => { event.stopPropagation(); addToCart(product); toast.success('Added to Cart!')}}
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
    </>
  );
}
