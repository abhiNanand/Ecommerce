import '../Private/Checkout/Checkout.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../Services/Api/module/demoApi';
import CheckoutForm from '../Private/Checkout/CheckoutForm';
import {toast} from 'react-toastify';

import Payment from '../Private/Checkout/Payment';

export default function BuyNow() {
  const [coupean, setCoupean] = useState<string>('');
  const { productId } = useParams();
  const [discount,setDiscount]=useState<number>(0);
  const [isCouponApplied, setIsCouponApplied] = useState<boolean>(false); 

  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useGetProductByIdQuery(productId);

  if (productError) {
    return <h1>Error loading product</h1>;
  }

  if (productLoading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <p>No product data available.</p>;
  }

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
      toast.error('enter a valid token');
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
          <div key={product.id} className="checkout-cart-item">
            <img
              src={product.image}
              alt="productimage"
              height="30px"
              width="30px"
            />
            <p>${product.price}</p>
          </div>
        </div>
        <div className="checkout-subtotal">
          <p>Subtotal: ${(product.price).toFixed(2)}</p>
        </div>
        <hr />
        <div className="checkout-shipping">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="checkout-total">
          <p>Total</p>
          <span>${(product.price - discount).toFixed(2)}</span>
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
          <Payment Items={[product]} deleteCartItems={false}/>
        </div>
      </div>
    </div>
  );
}
