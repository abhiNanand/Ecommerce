import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import Star from '../ShowItem/Star';
import {
  addToWishlist,
  getWishlistItems,
  removeFromWishlist,
} from '../../../Services/Wishlist/WishlistService';
import { Product } from '../../../Shared/Product';
import { getCartItems } from '../../../Services/Cart/CartService';
import '../../Dashboard/Helper/Sales/helper/SalesItem.scss';
import { useAuth } from '../../../Shared/CustomHooks/userAuth';
import { updateWishlistItem } from '../../../Store/Item/total_item_slice';
import { RootState } from '../../../Store/index';
import { ROUTES } from '../../../Shared/Constants';
import { auth } from '../../../Services/firebase/firebase';
import AddCartButton from '../ShowItem/AddCartButton';

interface ShowItemProps {
  products: Product[];
}

export default function ProductList({ products }: Readonly<ShowItemProps>) {
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
  }, [user]);

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
    } catch {
      toast.error('Error handling wishlist action:');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {products.map((product: Product) => (
        <button
          type="button"
          key={product.id}
          className="sales-product-card"
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
          <button
            type="button"
            className="cart-btn-div"
            onClick={(event) => event.stopPropagation()}
          >
            <AddCartButton cartItems={cartItems} product={product} />
          </button>

          <div className="rating">
            <p className="product-price">${product.price.toFixed(2)}</p>
            <Star rating={product.rating?.rate} productId={product.id} />
            <p className="rating-count">({product.rating?.count ?? 0})</p>
          </div>
        </button>
      ))}
    </>
  );
}
