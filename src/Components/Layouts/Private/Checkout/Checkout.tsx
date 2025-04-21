import './Checkout.scss';
import { useState, useEffect } from 'react';
import { getCartItems } from '../../../../Services/Cart/CartService';
import { Product } from '../../../../Shared/Product';
import { useAuth } from '../../../../Services/UserAuth';
import { toast } from 'react-toastify';
import CheckoutForm from './CheckoutForm';

import Payment from './Payment';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [coupean, setCoupean] = useState<string>('');
  const [discount,setDiscount]=useState<number>(0);
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false); 

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
    setTimeout(()=>fetchCartItems(),500);
  }, [user]);

  const calculateTotal = (): number => {
    return cartItems.reduce(
      (total, product) => total + product.price * (product.quantity ?? 1),
      0
    );
  };

  const handleButtonClick = () => {

    if (coupean== 'SAVE20')
    {
      if(isCouponApplied)
      {
        toast.error("coupean already applied on this purchase");
        return;
      }
      toast.success("Congrats $20 OFF");
      setDiscount(20);
      setIsCouponApplied(true);
    }
    else {
      toast.error('Coupean not found');
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
              <img
                src={item.image}
                alt="productimage"
                height="30px"
                width="30px"
              />
              <p>${item.price * (item?.quantity ?? 1)}</p>
            </div>
          ))}
        </div>
        <div className="checkout-subtotal">
          <p>Subtotal: ${calculateTotal().toFixed(2)}</p>
          {isCouponApplied&&(<> <p>discount:${discount}</p> <button type="button" onClick={()=>{setIsCouponApplied(false);setDiscount(0);}}>Remove</button></>)}
        </div>
        <hr />
        <div className="checkout-shipping">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="checkout-total">
          <p>Total</p>
          <span>${(calculateTotal() - discount).toFixed(2) }</span>
        </div>
        <div className="checkout-payment">
          <div className="coupon-section">
            <input
              type="text"
              placeholder="Coupon Code"
              onChange={(e) => setCoupean(e.target.value)}
              value={coupean}
            />
            <button type="button" onClick={() => handleButtonClick()}>
              Apply Coupon
            </button>
          </div>
          <Payment Items={cartItems} deleteCartItems={true} />
        </div>
      </div>
    </div>
  );
}