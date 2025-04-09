// declare global {
//   interface Window {
//     ethereum?: any;
//   }
// }

import './Checkout.scss';
import { useState, useEffect } from 'react';
import { getCartItems } from '../../../../Services/Cart/CartService';
import { Product } from '../../../../Shared/Product';
import { useAuth } from '../../../../Services/UserAuth';
// import { payWithCrypto } from '../../../../Services/Payment/PaymentServices';
import CheckoutForm from './CheckoutForm';
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../../../Shared/Constants';




export default function Checkout() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [coupean,setCoupean] = useState<string>('');
  const [open,setOpen] = useState<boolean>(false);
  //  const [address,setAddress] = useState<string>('');
  
  // const [openForm,setOpenForm]=useState<boolean>(true);

  // const [paymentStatus,setPaymentStatus]=useState<string>('');
  const navigate=useNavigate();
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





  const calculateTotal = ():number =>{
   return cartItems.reduce((total,product)=> total + product.price *(product.quantity??1),0);
  };

  const handleButtonClick = ()=>
  {
   
    if(coupean.trim()==='')
      alert("please enter a valid token");
    else{
      alert("enter a valid token");
    }
    setCoupean('');
  };

  // const handleCryptoPayment = async () => {
  //   try {
  //     setPaymentStatus("Processing payment...");
  //     const total = calculateTotal();
  //     const tx = await payWithCrypto(total.toString()); // ETH value as string
  //     setPaymentStatus('✅ Payment Successful!\nTx Hash: ' + tx.hash);
  //   } catch (err: any) {
  //     setPaymentStatus('❌ Payment Failed: ' + err.message);
  //   }
  // };

  return (
    <div className="checkout-container">
              


      <div className="billing">
        <h1>Billing Details</h1>
       <CheckoutForm/>
         <div >
          {/* <p>user Address:{address}</p> */}
         </div>
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
          
        </div>
        <hr />
        <div className="checkout-shipping">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="checkout-total">
          <p>Total</p>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="checkout-payment">
        {/* <button type="button" onClick={handleCryptoPayment} className="placeorder-btn">
            Pay with MetaMask
          </button> */}
          {/* {paymentStatus && <p className="payment-status">{paymentStatus}</p>} */}
          <div className="coupon-section">
            <input type="text" placeholder="Coupon Code" onChange={(e)=>setCoupean(e.target.value)} value={coupean}/>
            <button type="button" onClick={()=>handleButtonClick()}>Apply Coupon</button>
          </div>
          <button type="button" className="placeorder-btn" onClick={()=>{ /*addProducts ordered and addresses*/setOpen(true); }} >
            Place Order
          </button>
        </div>
      </div>
      {open&&(
        <div className="place-order-container">
          <div className="place-order">
            <h2>Order Placed</h2>
            <p>Your order has been successfully placed!</p>
            <button className="place-order-btn" onClick={()=>{navigate(ROUTES.HOMEPAGE); setOpen(false)}}>Continue Shopping</button> 
          </div>
      </div>)}
    </div>
  );
}

 