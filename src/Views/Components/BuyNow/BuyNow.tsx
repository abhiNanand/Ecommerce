import '../Checkout/Checkout.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetProductByIdQuery } from '../../../Services/Api/module/demoApi';
import CheckoutForm from '../Checkout/CheckoutForm';
import { RippleLoader } from '../../Dashboard/Helper/Loaders/Loaders';
import Payment from '../Checkout/Payment';

export default function BuyNow() {
  const [coupean, setCoupean] = useState<string>('');
  const { productId } = useParams();
  const [discount, setDiscount] = useState<number>(0);
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
   return (
         <div className="loader">
           <RippleLoader />
         </div>
       );
  }

  if (!product) {
    return <p>No product data available.</p>;
  }

  const handleButtonClick = () => {
    if (coupean == 'SAVE20') {
      if (isCouponApplied) {
        toast.error('Coupon already applied on this purchase');
      } else {
        toast.success('Congrats 20% OFF');
        setDiscount(0.8);
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
          <div key={product.id} className="checkout-cart-item">
            <div>
              <img
                src={product.image}
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
                {product.title}
              </p>
            </div>
            <p>${product.price}</p>
          </div>
        </div>
        <div className="checkout-subtotal">
          <p>Subtotal:</p>
          <p> ${product.price.toFixed(2)}</p>
      
        </div>
        <hr />

        {isCouponApplied && (
            <>
             <div className="applied-coupon">
              <p>Coupon: <button
                type="button"
                className="remove-btn">SAVE20</button></p>
              <button
                type="button"
                className="remove-btn"
                onClick={() => {
                  setIsCouponApplied(false);
                  setDiscount(1);
                }}
              >
                -${discount} [Remove]
              </button>
              </div>
              <hr/>
            </>
          )}
      
        <div className="checkout-shipping">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="checkout-total">
          <p>Total:</p>
          <span>${(product.price * discount).toFixed(2)}</span>
        </div>
        <hr/>
        <div className="ETH">
          <p>ETH:</p>
          <p>{((product.price - discount) * 0.00001).toFixed(4)}</p>
        </div>
        <hr/>
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
            Items={[product]}
            deleteCartItems={false}
            total={(product.price - discount).toFixed(2)}
          />
        </div>
      </div>
    </div>
  );
}
