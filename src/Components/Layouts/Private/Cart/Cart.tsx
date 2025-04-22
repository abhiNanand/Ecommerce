import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { Trash } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { db, auth } from '../../../../Services/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth'
import {
  getCartItems,
  removeFromCart,
} from '../../../../Services/Cart/CartService';
import { Product } from '../../../../Shared/Product';
import { useAuth } from '../../../../Services/UserAuth';
import { ROUTES } from '../../../../Shared/Constants';
import './Cart.scss';

import { updateCartItem } from '../../../../Store/Item/total_item_slice';
import { RootState } from '../../../../Store';
import { RippleLoader } from '../../../../Views/Dashboard/Loaders/Loaders';

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
  const [loading,setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const cartItems = await getCartItems();
        setCartItems(cartItems);
        setLoading(false);
      }
      else {
        setCartItems([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleRemoveItem = async (product: any) => {
    await removeFromCart(product.id);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const handleQuantityChange = async (product: any, newQuantity: number) => {
    const user = auth.currentUser;
    const cartRef = collection(db, `users/${user?.uid}/cart`);
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
    } catch (error) {
      console.error('error updating quantity', error);
    }
  };

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, product) => total + product.price * (product.quantity ?? 1),
      0
    );
  };

  const navigate = useNavigate();
  const returnHome = () => navigate(ROUTES.HOMEPAGE);


  if (!user) {
    return (
      <div className="wishlist">
        <div className="empty-state">
          <h4>Please sign in to view your cart</h4>
          <p>Sign in to sync your across all devices.</p>
        </div>
      </div>
    );
  }
  if(loading)
  {
        return  (<div className="loader">
            <RippleLoader />
          </div>)
  }

  return (
    <div className="cart-container">
      <p className="breadcrumb">
        <NavLink to={ROUTES.HOMEPAGE}>Home /</NavLink>
        <NavLink to={ROUTES.CART}> Cart</NavLink>
      </p>
      <div className="cart-table">
        <div className="cart-header">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            cartItems.map((product) => (
              <div className="cart-row" key={product.id}>
                <span>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart-image"
                    onClick={() => navigate(`/product/${product.id}`)}
                  />
                  <p style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '200px'  
                  }}>{product.title}</p>
                </span>
                <span>${product.price}</span>
                <div className="cart-quantity-controls">
                  <span>
                    {product.quantity == 1 ? (
                      <button
                        type="button"
                        className="cart-delete-button"
                        onClick={() => {
                          handleRemoveItem(product);
                          dispatch(updateCartItem(cartCount - 1));
                        }}
                      >
                        <Trash size={15} />
                      </button>
                    ) : (
                      <button
                        className="cart-minus-btn"
                        onClick={() => {
                          handleQuantityChange(
                            product,
                            (product.quantity ?? 1) - 1
                          );
                          dispatch(updateCartItem(cartCount - 1));
                        }}
                      >
                        -
                      </button>
                    )}

                    <input

                      type="number"
                      min="1"
                      value={product.quantity}
                      disabled
                    />
                    <button
                      className="cart-plus-btn"
                      onClick={() => {
                        handleQuantityChange(
                          product,
                          (product.quantity ?? 1) + 1
                        );
                        dispatch(updateCartItem(cartCount + 1));
                      }}
                    >
                      +
                    </button>
                  </span>
                </div>

                <span>
                  ${(product.price * (product.quantity ?? 1)).toFixed(2)}
                </span>
                <span />
              </div>
            ))
          )}
        </div>
      </div>

      <div className="cart-actions">
        <button type="button" onClick={returnHome}>
          Return to Shop
        </button>
      </div>

      <div className="cart-summary">
        <div className="cart-total">
          <h3>Cart Total</h3>
          <p>Subtotal: ${calculateTotal().toFixed(2)}</p>
          <p>Shipping: Free</p>
          <p>Total: ${calculateTotal().toFixed(2)}</p>
          {cartItems.length != 0 && (
            <button type="button" onClick={() => navigate(ROUTES.CHECKOUT)}>
              Proceed to Checkout
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// warning you're getting is because <div> is a non-interactive element, but you're using onClick on it. This makes it inaccessible for keyboard users, as they won't be able to activate it using the Enter or Space keys.
// solution add role="button" and tabIndex="0":
// tabIndex="0" allows an element to be focusable using the Tab key, making it accessible for keyboard navigation.
