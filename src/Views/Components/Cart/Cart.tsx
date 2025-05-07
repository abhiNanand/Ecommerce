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
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
import { db, auth } from '../../../Services/firebase/firebase';
import {
  getCartItems,
  removeFromCart,
} from '../../../Services/Cart/CartService';
import { Product } from '../../../Shared/Product';
import { useAuth } from '../../../Shared/CustomHooks/userAuth';
import { ROUTES } from '../../../Shared/Constants';
import './Cart.scss';

import { updateCartItem } from '../../../Store/Item/total_item_slice';
import { RootState } from '../../../Store';
import { RippleLoader } from '../../Dashboard/Helper/Loaders/Loaders';

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
  const [loading, setLoading] = useState<boolean>(true);
  const [cartBtnLoading, setCartBtnLoading] = useState<boolean>(false);
  const [openClearCart, setOpenClearCart] = useState<boolean>(false);

  useEffect(() => {
    if (openClearCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [openClearCart]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const cartItems = await getCartItems();
        setCartItems(cartItems);
        setLoading(false);
      } else {
        setCartItems([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleRemoveItem = async (product: any) => {
    if (cartBtnLoading) return;
    setCartBtnLoading(true);

    try {
      await removeFromCart(product.id);
      dispatch(updateCartItem(cartCount - 1));
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== product.id)
      );
    } catch {
      toast.error('Failed to remove Item');
    } finally {
      setCartBtnLoading(false);
    }
  };

  const handleTotalItem = async (product: any) => {
    await removeFromCart(product.id);
    dispatch(updateCartItem(cartCount - (product.quantity ?? 1)));
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const handleClearCart = async () => {
    await Promise.all(cartItems.map(async (item) => handleRemoveItem(item)));
    dispatch(updateCartItem(0));
  };

  const handleQuantityChange = async (
    product: any,
    newQuantity: number,
    totalCartCount: number
  ) => {
    if (cartBtnLoading) return;
    setCartBtnLoading(true);

    const user = auth.currentUser;
    const cartRef = collection(db, `users/${user?.uid}/cart`);
    try {
      const q = query(cartRef, where('id', '==', product.id));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { quantity: newQuantity });
        dispatch(updateCartItem(totalCartCount));
      }
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error('error updating quantity', error);
    } finally {
      setCartBtnLoading(false);
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
  if (loading) {
    return (
      <div className="loader">
        <RippleLoader />
      </div>
    );
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
          <span>Remove</span>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>No items in the cart</p>
          ) : (
            cartItems.map((product) => (
              <div className="cart-row" key={product.id}>
                <span>
                  <button className="product-img-btn" onClick={() => navigate(`/product/${product.id}`)}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className="cart-image"
                    />
                  </button>
                  <p
                    style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      maxWidth: '200px',
                    }}
                  >
                    {product.title}
                  </p>
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
                            (product.quantity ?? 1) - 1,
                            cartCount - 1
                          );
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
                          (product.quantity ?? 1) + 1,
                          cartCount + 1
                        );
                      }}
                    >
                      +
                    </button>
                  </span>
                </div>

                <span>
                  ${(product.price * (product.quantity ?? 1)).toFixed(2)}
                </span>
                <span>
                  <button
                    type="button"
                    className="cart-delete-button"
                    onClick={() => {
                      handleTotalItem(product);
                    }}
                  >
                    <Trash size={15} />
                  </button>
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
        {cartItems.length > 0 && (
          <button onClick={() => setOpenClearCart(true)}>Clear Cart</button>
        )}
      </div>

      {cartItems.length > 0 && (
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
      )}
      {openClearCart && (
        <div className="confirmation-container">
          <div>
            <div className="confirm-title-btn">
              <h3>Clear Cart Confirmation</h3>
              <p>Are you sure you want to clear cart?</p>
              <div className="confirm-n-cancel-btn">
                <button
                  className="confirm-btn"
                  onClick={() => {
                    handleClearCart();
                    setOpenClearCart(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setOpenClearCart(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// warning you're getting is because <div> is a non-interactive element, but you're using onClick on it. This makes it inaccessible for keyboard users, as they won't be able to activate it using the Enter or Space keys.
// solution add role="button" and tabIndex="0":
// tabIndex="0" allows an element to be focusable using the Tab key, making it accessible for keyboard navigation.
