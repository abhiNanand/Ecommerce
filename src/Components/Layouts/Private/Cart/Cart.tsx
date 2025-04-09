import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Trash } from 'lucide-react';
import { db, auth } from '../../../../Services/firebase/firebase';
import {
  getCartItems,
  removeFromCart,
} from '../../../../Services/Cart/CartService';
import { Product } from '../../../../Shared/Product';
import { useAuth } from '../../../../Services/UserAuth';
import { ROUTES } from '../../../../Shared/Constants';
import './Cart.scss';
import assets from '../../../../assets';
export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user) {
        setCartItems([]);
        return;
      }
      const items = await getCartItems();

      setCartItems(items);
    };

    fetchCartItems();
  }, [user]);

  const handleRemoveItem = async (product: any) => {
    await removeFromCart(product.id);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const handleQuantityChange = async (product: any, newQuantity: number) => {

    const user = auth.currentUser;
    if (!user) {
      console.error('User not logged in!');
      return;
    }
    const cartRef = collection(db, `users/${user.uid}/cart`);
    if (newQuantity <= 0) {
      await removeFromCart(product.id);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== product.id)
      );
    } else {

      try {
        const q = query(cartRef, where('id', '==', product.id));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref;
          await updateDoc(docRef, { quantity: newQuantity });
        }
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id ? { ...item, quantity: newQuantity } : item
          )
        );
      }
      catch (error) {
        console.error('error updating quantity', error);
      }
    }
  };

  const calculateTotal = (): number => {
    return cartItems.reduce((total, product) => total + product.price * (product.quantity ?? 1), 0);
  };

  const navigate = useNavigate();

  const returnHome = () => navigate(ROUTES.HOMEPAGE);

  return (
    <div className="cart-container">
      <p className="breadcrumb">

        <NavLink to={ROUTES.HOMEPAGE}>Home /</NavLink>
        <NavLink to={ROUTES.ACCOUNT}> Account</NavLink>
      </p>
      <img src={assets.icon.mastercard} alt="payment" width="37px" height="37px" />
      <img src={assets.icon.visa} alt="payment" width="37px" height="37px" />
      <img src={assets.icon.nagad} alt="payment" width="37px" height="37px" />
      <img src={assets.icon.rupay} alt="payment" width="37px" height="37px" />

      <div className="cart-table">
        <div className="cart-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
          <span>Remove</span>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            cartItems.map((product) => (
              <div
                className="cart-row"
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <span>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart-image"
                  />
                </span>
                <span>₹{product.price}</span>
                <span>
                  <input
                    type="number"
                    min="1"
                    value={product.quantity}
                    onClick={(event) => event.stopPropagation()}
                    onChange={(e) =>
                      handleQuantityChange(product, Number(e.target.value))
                    }
                  />
                </span>
                <span>
                  ₹{(product.price * (product.quantity ?? 1)).toFixed(2)}
                </span>
                <span>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleRemoveItem(product);
                    }}
                  >
                    <Trash size={20} />
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="cart-actions">
        <button type="button" onClick={returnHome}>
          Return to Shop
        </button>
        <button>Update Cart</button>
      </div>

      <div className="cart-summary">
        <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" />
          <button type="button">Apply Coupon</button>
        </div>
        <div className="cart-total">
          <h3>Cart Total</h3>
          <p>Subtotal: ₹{calculateTotal().toFixed(2)}</p>
          <p>Shipping: Free</p>
          <p>Total: ₹{calculateTotal().toFixed(2)}</p>
          <button type="button" onClick={() => navigate(ROUTES.CHECKOUT)}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

// warning you're getting is because <div> is a non-interactive element, but you're using onClick on it. This makes it inaccessible for keyboard users, as they won't be able to activate it using the Enter or Space keys.
// solution add role="button" and tabIndex="0":
// tabIndex="0" allows an element to be focusable using the Tab key, making it accessible for keyboard navigation.
