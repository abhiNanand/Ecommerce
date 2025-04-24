import './Checkout.scss';
import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../Services/firebase/firebase';
import CheckoutForm from './CheckoutForm';
import { getCartItems } from '../../../../Services/Cart/CartService';
import { Product } from '../../../../Shared/Product';
import { useAuth } from '../../../../Services/UserAuth';
import Payment from './Payment';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [coupean, setCoupean] = useState<string>('');
  const [discount, setDiscount] = useState<number>(0);
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const items = await getCartItems();
        setCartItems(items);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, product) => total + product.price * (product.quantity ?? 1),
      0
    );
  };

  const handleButtonClick = () => {
    if (coupean == 'SAVE20') {
      if (isCouponApplied) {
        toast.error('Coupon already applied on this purchase');
         
      }
      else
      {
        toast.success('Congrats 20% OFF');
        const discountAmount=(0.20*calculateTotal()).toFixed(2)
        setDiscount(Number(discountAmount));
        setIsCouponApplied(true);
      }
      
    } else {
      const trimCoupon = coupean.trim();
      if (trimCoupon.length == 0) toast.error('Coupon not found');
      else toast.error('Enter a valid coupon');
    }
    setCoupean('');
  };

  return (
    <div className="checkout-container">
      <div className="billing">
        <h1>Billing Details</h1>
        <CheckoutForm />
        <div />
      </div>
      <div className="checkout-cart-items">
        <div className="show-cart-item">
          {cartItems.map((item) => (
            <div key={item.id} className="checkout-cart-item">
              <div>
                <img
                  src={item.image}
                  alt="productimage"
                  height="30px"
                  width="30px"
                />

                <p
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '30vw',
                  }}
                >
                  {item.title}
                </p>
              </div>

              <p>${item.price * (item?.quantity ?? 1)}</p>
            </div>
          ))}
        </div>
        <div className="checkout-subtotal">
          <p>Subtotal: ${calculateTotal().toFixed(2)}</p>
          {isCouponApplied && (
            <>
             
              <p>Discount: ${discount}</p>
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  setIsCouponApplied(false);
                  setDiscount(0);
                }}
              >
                Remove Coupon
              </button>
            </>
          )}
        </div>
        <hr />
        <div className="checkout-shipping">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="checkout-total">
          <p>Total</p>
          <span>${(calculateTotal() - discount).toFixed(2)}</span>
        </div>
        <div className="checkout-payment">
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Coupon Code"
              onChange={(e) => setCoupean(e.target.value)}
              value={coupean}
              onKeyDown={(e) => e.key === 'Enter' && handleButtonClick()}
            />
            <button type="button" onClick={() => handleButtonClick()}>
              Apply Coupon
            </button>
          </div>
          <Payment
            Items={cartItems}
            deleteCartItems={true}
            total={(calculateTotal() - discount).toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
}
