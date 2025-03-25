import { useEffect, useState } from 'react';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../../../../Services/firebase/firebase';
import { Product } from '../../../../Shared/Product';
import {
  getWishlistItems,
  removeFromWishlist,
} from '../../../../Services/Wishlist/WishlistService';
import { addToCart } from '../../../../Services/Cart/CartService';
import './Wishlist.scss';

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (!user) {
        setWishlistItems([]);
        return;
      }
      const items = await getWishlistItems();
      setWishlistItems(items);
    };
    fetchWishlistItems();
  }, [user]);

  const handleDelete = async (itemId: string) => {
    await removeFromWishlist(itemId);
    setWishlistItems((prevItems) =>
      prevItems.filter((product) => product.id !== itemId)
    );
  };
  const handleMoveAllToBag = async () => {
    await Promise.all(
      wishlistItems.map(async (item) => {
        await addToCart(item);
        await handleDelete(item.id);
      })
    );
  };
  // avoid using await inside loop . performance issue is there.
  //   const handleMoveAllToBag = async () => {
  //     for (const item of wishlistItems) {
  //       await addToCart(item);
  //       await handleDelete(item.id);
  //     }
  //   };

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
          <div className="wishlist-item" key={item.id}>
            <img src={item.image} alt={item.title} />
            <h3 className="title">{item.title}</h3>
            <p className="price">${item.price.toFixed(2)}</p>

            <div className="actions">
              <button
                type="button"
                className="cart-btn"
                onClick={() => {
                  addToCart(item);
                  handleDelete(item.id);
                }}
              >
                <ShoppingCart size={20} />
                Move to Bag
              </button>
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleDelete(item.id)}
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
