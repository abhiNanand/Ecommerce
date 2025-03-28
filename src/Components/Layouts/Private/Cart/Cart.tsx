import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import { Trash } from 'lucide-react';
import {db} from '../../../../Services/firebase/firebase';
import {
  getCartItems,
  removeFromCart,
} from '../../../../Services/Cart/CartService';
import { Product } from '../../../../Shared/Product';
import {useAuth} from '../../../../Services/UserAuth';
import {ROUTES} from '../../../../Shared/Constants'
import './Cart.scss';

 

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const {user}=useAuth();
 
 
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

  const handleRemoveItem = async (product:any) => {
    await removeFromCart(product.firebase_id);
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== product.id)
    );
  };

  const handleQuantityChange = async (
    product: any,
    newQuantity: number
  ) => {
    if (newQuantity <= 0) {
      await removeFromCart(product.firebaseId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id !== product.id)
      );
    } else {
      const productRef = doc(db, 'cart', product.firebaseId);
      await updateDoc(productRef, { quantity: newQuantity });

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, product) => total + product.price * (product.quantity ?? 1),
      0
    );
  };

  const navigate = useNavigate();
  const location = useLocation();
  const returnHome = () => navigate(ROUTES.HOMEPAGE);

  return (
    <div className="cart-container">
      <p>Home{location.pathname}</p>

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
             
              <div className="cart-row" key={product.id} onClick={()=>navigate(`/products/${product.id}`)}>
                 <p>{product.id}</p>
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
                    onClick={(event)=>event.stopPropagation()}
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
                    onClick={(event) => {event.stopPropagation();handleRemoveItem(product)}}
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
          <button type="button">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}
