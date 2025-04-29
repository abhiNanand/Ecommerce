import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Star from '../../Dashboard/Helper/Stars/Star';
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from '../../../Services/Wishlist/WishlistService';
import { Product } from '../../../Shared/Product';
import { getCartItems } from '../../../Services/Cart/CartService';
import './ShowItem.scss';
import { useAuth } from '../../../Services/UserAuth';
import { updateWishlistItem } from '../../../Store/Item/total_item_slice';
import { RootState } from '../../../Store/index';
import { ROUTES } from '../../../Shared/Constants';
import { auth } from '../../../Services/firebase/firebase';
import AddCartButton from './AddCartButton';
 

interface ShowItemProps {
  products: Product[];
  wishlistUpdated?: boolean;
}

export default function ShowItem({ products, wishlistUpdated }: ShowItemProps) {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const [cartItems, setCartItems] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);

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
  }, [user, wishlistUpdated]);

  const handleWishlistClick = async (product: Product) => {
    try {
      if (!user) {
        toast.error('Please Login To Add Item To Wishlist!');
        navigate(ROUTES.LOGIN);
        return;
      }
      if (loading) return;
      setLoading(true);
      const isLiked = likedItems.has(product.id);

      if (isLiked) {
        await removeFromWishlist(product.id);
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
        toast.info('Item removed from wishlist', {
          position: 'top-right',
        });
        dispatch(updateWishlistItem(wishlistCount - 1));
      } else {
        await addToWishlist(product);
        setLikedItems((prev) => new Set([...prev, product.id]));
        toast.success('Item added to wishlist');
        dispatch(updateWishlistItem(wishlistCount + 1));
      }
    } catch (wishListError) {
      console.error('Error handling wishlist action:', wishListError);
    } finally {
      setLoading(false);
    }
  };


 

  return (
    <div className={products && products.length > 4 ? 'products-grid-greater' : 'products-grid-lesser'}>
      {products.map((product: Product) => (
        <div
          key={product.id}
          className="product-card"
          onClick={() =>
            navigate(ROUTES.PRODUCT_DETAILS.replace(':productId', product.id))
          }
        >
          <button
            type="button"
            disabled={loading}
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
          <div
            className="cart-btn-div"
            onClick={(event) => event.stopPropagation()}
          >
            <AddCartButton cartItems={cartItems} product={product} />
          </div>

          <div className="rating">
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Star rating={product.rating?.rate} productId={product.id} />
            <p className="rating-count">({product.rating?.count ?? 0})</p>
          </div>
        </div>
      ))}
    </div>
  );
}