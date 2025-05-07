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
import { BREADCRUMB, ROUTES, TEXT } from '../../../Shared/Constants';
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
        const cartItem = await getCartItems();
        setCartItems(cartItem);
        setLoading(false);
      } else {
        setCartItems([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleRemoveItem = async (product: Product) => {
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

  const handleTotalItem = async (product: Product) => {
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
    product: Product,
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
    } catch {
      toast.error('error updating quantity');
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
          <h4>{TEXT.PLEASE_SIGN_IN}</h4>
          <p>{TEXT.SIGN_IN_SYNC}</p>
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
        <NavLink to={ROUTES.HOMEPAGE}>{BREADCRUMB.HOME}</NavLink>
        <NavLink to={ROUTES.CART}>{BREADCRUMB.CART}</NavLink>
      </p>
      <div className="cart-table">
        <div className="cart-header">
          <span>{TEXT.PRODUCT}</span>
          <span>{TEXT.PRICE}</span>
          <span>{TEXT.QUANTITY}</span>
          <span>{TEXT.SUBTOTAL}</span>
          <span>{TEXT.REMOVE}</span>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>{TEXT.NO_ITEMS}</p>
          ) : (
            cartItems.map((product) => (
              <div className="cart-row" key={product.id}>
                <span>
                  <button
                    type="button"
                    className="product-img-btn"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
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
                    {product.quantity === 1 ? (
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
                        type="button"
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
                      type="button"
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
        {TEXT.RETURN_TO_SHOP}
        </button>
        {cartItems.length > 0 && (
          <button type="button" onClick={() => setOpenClearCart(true)}>
            {TEXT.CLEAR_CART}
          </button>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">
            <h3>{TEXT.CART_TOTAL}</h3>
            <p>{TEXT.SUBTOTAL}: ${calculateTotal().toFixed(2)}</p>
            <p>{TEXT.SHIPPING}: {TEXT.SHIPPING_FREE}</p>
            <p>{TEXT.TOTAL}: ${calculateTotal().toFixed(2)}</p>
            {cartItems.length !== 0 && (
              <button type="button" onClick={() => navigate(ROUTES.CHECKOUT)}>
                {TEXT.PROCEED_TO_CHECKOUT}
              </button>
            )}
          </div>
        </div>
      )}
      {openClearCart && (
        <div className="confirmation-container">
          <div>
            <div className="confirm-title-btn">
              <h3>{TEXT.CLEAR_CART_CONFIRMATION}</h3>
              <p>{TEXT.CLEAR_CART_PROMPT}</p>
              <div className="confirm-n-cancel-btn">
                <button
                  type="button"
                  className="confirm-btn"
                  onClick={() => {
                    handleClearCart();
                    setOpenClearCart(false);
                  }}
                >
                  {TEXT.CONFIRM}
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setOpenClearCart(false)}
                >
                  {TEXT.CANCEL}
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
