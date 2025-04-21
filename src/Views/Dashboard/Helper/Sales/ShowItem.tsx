
import { Heart } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import Star from '../Stars/Star';
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from '../../../../Services/Wishlist/WishlistService';
import { Product } from '../../../../Shared/Product';
import { onAuthStateChanged } from 'firebase/auth';
import { getCartItems } from '../../../../Services/Cart/CartService';
import './ShowItem.scss';
import { useAuth } from '../../../../Services/UserAuth';
import { updateWishlistItem } from '../../../../Store/Item/total_item_slice';
import { RootState } from '../../../../Store/index';
import { ROUTES } from '../../../../Shared/Constants';
import { auth } from '../../../../Services/firebase/firebase';
import AddCartButton from './helper/AddCartButton';

interface ShowItemProps {
  products: Product[];
}

const LIMIT = 5;

export default function ShowItem({ products }: ShowItemProps) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<Map<string, number>>(new Map());

  const [index, setIndex] = useState<number>(LIMIT);
  const navigate = useNavigate();
  const { user } = useAuth();

  const wishlistCount = useSelector(
    (state: RootState) => state.item.noOfWishlistItem
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const wishlist = await getWishlistItems();
        const likedProductIds = new Set(wishlist.map((item) => item.id));
        setLikedItems(likedProductIds);

        const cart = await getCartItems();

        const cartProductList = new Map(
          cart.map((items) => [items.id, items.quantity ?? 1])
        );
        setCartItems(cartProductList);
      }
    });

    return () => unsubscribe(); 
  }, [user]);

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
  }; 

  const productsToShow = useMemo(() => {
    if (index === LIMIT) {
      return products.slice(0, LIMIT);
    } else {
      return products;
    }
  }, [products, index]);

  return (
    <>
      <div className="products-grid">
        {productsToShow?.map((product: Product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() =>
              navigate(ROUTES.PRODUCT_DETAILS.replace(':productId', product.id))
            }
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
            <AddCartButton cartItems={cartItems} product={product} />

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
      {index > LIMIT && (
        <button
          type="button"
          className="view-all-btn"
          onClick={() => setIndex(LIMIT)}
        >
          View Less Products
        </button>
      )}

      {index < products.length && (
        <button
          type="button"
          className="view-all-btn"
          onClick={() => setIndex(products.length)}
        >
          View All Products
        </button>
      )}
    </>
  );
}

