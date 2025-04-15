import { Star, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../../../Services/Cart/CartService';
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from '../../../../Services/Wishlist/WishlistService';
import { Product } from '../../../../Shared/Product';

import './ShowItem.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../../../Services/UserAuth';
import {
  updateCartItem,
  updateWishlistItem,
} from '../../../../Store/Item/total_item_slice';
import { RootState } from '../../../../Store/index';

interface SalesItemProps {
  products: Product[];
}

export default function SalesItem({ products }: SalesItemProps) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [index, setIndex] = useState<number>(5);
  const navigate = useNavigate();
  const { user } = useAuth();

  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
  const wishlistCount = useSelector(
    (state: RootState) => state.item.noOfWishlistItem
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWishlist = async () => {
      const wishlist = await getWishlistItems();
      const likedProductIds = new Set(wishlist.map((item) => item.id));
      setLikedItems(likedProductIds);
    };

    if (user) fetchWishlist();
  }, []);

  const handleWishlistClick = async (product: Product) => {
    try {
      if (!user) {
        toast.error('Please Login!');
        return;
      }
      const isLiked = likedItems.has(product.id);

      if (isLiked) {
        await removeFromWishlist(product.id);
        dispatch(updateWishlistItem(wishlistCount - 1));
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });

        toast.success('Removed from Wishlist!', {
          position: 'top-right',
        });
      } else {
        await addToWishlist(product);
        dispatch(updateWishlistItem(wishlistCount + 1));
        setLikedItems((prev) => new Set([...prev, product.id]));

        toast.success('Added to Wishlist!');
      }
    } catch (wishListError) {
      console.error('Error handling wishlist action:', wishListError);
    }
  }; //

  return (
    <>
      <div className="products-grid">
        {products.slice(0, index)?.map((product: Product) => (
          <div
            key={product.id}
            className="product-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <button
              type="button"
              className="add-wishlist-btn"
              onClick={(event) => {
                event.stopPropagation();
                handleWishlistClick(product);
              }}
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
      {index === products.length ? (
        <button
          type="button"
          className="view-all-btn"
          onClick={() => setIndex(5)}
        >
          View Less Products
        </button>
      ) : (
        <button
          className="view-all-btn"
          onClick={() => setIndex(products.length)}
        >
          View All Products
        </button>
      )}
    </>
  );
}
