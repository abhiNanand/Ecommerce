import './Checkout.scss';
import { useState, useEffect } from 'react';
import { getCartItems } from '../../../../Services/Cart/CartService';
import { Product } from '../../../../Shared/Product';
import { useAuth } from '../../../../Services/UserAuth';
// import assets from '../../../../assets/index';

export default function Checkout() {
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

  return (
    <div className="checkout-container">
              {/* <img src={assets.icon.mastercard}  alt="payment" width="37px" height="37px"/>
              <img src={assets.icon.visa} alt="payment"  width="37px" height="37px"/>
              <img src={assets.icon.nagad} alt="payment" width="37px" height="37px"/>
              <img src={assets.icon.rupay} alt="payment" width="37px" height="37px"/> */}


      <div className="billing">
        <h1>Billing Details</h1>
        <div className="billing-form">
          <form>
            <label htmlFor="firstname">
              First Name<sup>*</sup>
            </label>
            <br />
            <input type="text" id="firstname" />
            <br />
            <label htmlFor="companyname">
              Company Name<sup>*</sup>
            </label>
            <br />
            <input type="text" id="companyname" />
            <br />
            <label htmlFor="streetaddress">
              streetaddress<sup>*</sup>
            </label>
            <br />
            <input type="text" id="streetaddress" />
            <br />
            <label htmlFor="apartment">Apartment,floor,etc.(optional)</label>
            <br />
            <input type="text" id="apartment" />
            <br />
            <label htmlFor="towncity">
              Town/City<sup>*</sup>
            </label>
            <br />
            <input type="text" id="towncity" />
            <br />
            <label htmlFor="phonenumber">
              Phone Number<sup>*</sup>
            </label>
            <br />
            <input type="text" id="phonenumber" />
            <br />
            <label htmlFor="emailaddress">
              Email Address<sup>*</sup>
            </label>
            <br />
            <input type="text" id="emailaddress" />
            <br />
          </form>
        </div>
        <form>
          <input type="checkbox" id="billing-checkbox" />
          <label htmlFor="billing-checkbox">
            save this information for faster check-out next time
          </label>
        </form>
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
          <p>Subtotal:</p>
          <span>$total</span>
        </div>
        <hr />
        <div className="checkout-shipping">
          <p>Shipping:</p>
          <span>Free</span>
        </div>
        <hr />
        <div className="checkout-total">
          <p>Total</p>
          <span>$total</span>
        </div>
        <div className="checkout-payment">
          <form>
            <input id="bank" type="radio"  name="payment" value="Bank" />
            <label htmlFor="bank">Bank </label> 
             
            <input id="cash" type="radio" name="payment" value="cash" />
            <label htmlFor="cash"> Cash on delivery</label>
          </form>
          <div className="coupon-section">
            <input type="text" placeholder="Coupon Code" />
            <button type="button">Apply Coupon</button>
          </div>
          <button type="button" className="placeorder-btn">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
