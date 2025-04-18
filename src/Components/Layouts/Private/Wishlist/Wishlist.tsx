import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth'
import { useSelector, useDispatch } from 'react-redux';
import {  auth } from '../../../../Services/firebase/firebase';
import { Product } from '../../../../Shared/Product';
import {
  getWishlistItems,
  removeFromWishlist,
} from '../../../../Services/Wishlist/WishlistService';
import { addToCart } from '../../../../Services/Cart/CartService';
import { useAuth } from '../../../../Services/UserAuth';
import './Wishlist.scss';

import {
  updateCartItem,
  updateWishlistItem,
} from '../../../../Store/Item/total_item_slice';
import { RootState } from '../../../../Store/index';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
  const wishlistCount = useSelector(
    (state: RootState) => state.item.noOfWishlistItem
  );

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          await currentUser.reload();
          const wishlistItems = await getWishlistItems();
          setWishlistItems(wishlistItems);
        }
        else {
          setWishlistItems([]);
        }
      });
      return ()=>unsubscribe();
    }, [user]);
  

  const handleDelete = async (item: any) => {
    await removeFromWishlist(item.id);
    dispatch(updateWishlistItem(wishlistCount - 1));
    setWishlistItems((prevItems) =>
      prevItems.filter((product) => product.id !== item.id)
    );
  };
  const handleMoveAllToBag = async () => {
    let i = 0;
    await Promise.all(
      wishlistItems.map(async (item) => {
        await addToCart(item);
        await handleDelete(item);
        i++;
      })
    );
    dispatch(updateWishlistItem(wishlistCount - i));
    dispatch(updateCartItem(cartCount + i));
    
  };


  if (!user) {
    return (
      <div className="wishlist">
        <div className="empty-state">
          <h4>Please sign in to view your wishlist</h4>
          <p>Sign in to sync your Wishlist across all devices.</p>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist">
        <div className="empty-state">
          <Heart size={48} />
          <h4>Your wishlist is empty</h4>
          <p>Save items you love in your wishlist and review them anytime.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist-top">
        <h3>My Wishlist ({wishlistItems.length} items)</h3>
        {wishlistItems.length > 0 && (
          <button type="button" onClick={handleMoveAllToBag}>
            Move All to Bag
          </button>
        )}
      </div>

      <div className="wishlist-items">
        {wishlistItems.map((item) => (
          <div
            className="wishlist-item"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/product/${item.id}`)}
            key={item.id}
          >
            <img src={item.image} alt={item.title} />
            <h3 className="title">{item.title}</h3>
            <p className="price">${item.price.toFixed(2)}</p>

            <div className="actions">
              <button
                type="button"
                className="cart-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item);
                  dispatch(updateCartItem(cartCount + 1));
                  handleDelete(item);
                }}
              >
                <ShoppingCart size={20} />
                Move to Bag
              </button>
              <button
                type="button"
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item);
                }}
              >
                <Trash2 size={20} />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
