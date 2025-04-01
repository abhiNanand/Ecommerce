import './Checkout.scss';
import { getCartItems } from '../../../../Services/Cart/CartService';
import { useState, useEffect } from 'react';
import { Product } from '../../../../Shared/Product';
import { useAuth } from '../../../../Services/UserAuth';
export default function Checkout() {

    const [cartItems, setCartItems] = useState<Product[]>([]);
  //  const subtotal=0;
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

    return (<>
<div className="checkout-container">
    <div className="billing">
        <h1>Billing Details</h1>
        <div className="billing-form">
<form>
    <label htmlFor="firstname">First Name<sup>*</sup></label><br/>
    <input type="text" id="firstname"/>
    <br/>
    <label htmlFor="companyname">Company Name<sup>*</sup></label><br/>
    <input type="text" id="companyname"/>
    <br/>
    <label htmlFor="streetaddress">streetaddress<sup>*</sup></label><br/>
    <input type="text" id="streetaddress"/>
    <br/>
    <label htmlFor="apartment">Apartment,floor,etc.(optional)</label><br/>
    <input type="text" id="apartment"/>
    <br/>
    <label htmlFor="towncity">Town/City<sup>*</sup></label><br/>
    <input type="text" id="towncity"/>
    <br/>
    <label htmlFor="phonenumber">Phone Number<sup>*</sup></label><br/>
    <input type="text" id="phonenumber"/>
    <br/>
    <label htmlFor="emailaddress">Email Address<sup>*</sup></label><br/>
    <input type="text" id="emailaddress"/>
    <br/>
</form>
        </div>
        <form>
            <input type="checkbox" id="billing-checkbox"/>
            <label htmlFor="billing-checkbox">save this information for faster check-out next time</label>
        </form>
    </div>
    <div className="checkout-cart-items">
        <div className="show-cart-item">
            {cartItems.map((item)=>(<div className="checkout-cart-item">
                <img src={item.image} height="30px" width="30px"/>
                <p>${item.price* ((item?.quantity) ?? 1)  }</p>
            </div>))}
        </div>
        <div className="checkout-subtotal">
            <p>Subtotal:</p>
            <span>$total</span>
            
        </div>
        <hr/>
        <div className="checkout-shipping">
        <p>Shipping:</p>
        <span>Free</span>
        
        </div>
        <hr/>
        <div className="checkout-total">
            <p>Total</p>
            <span>$total</span>
        </div>
        <div className="checkout-payment">
            <form>
            <input id="radio" type="radio" value="Bank"/>
            <label htmlFor='radio'>Bank</label>
<br/>
            <input id="cash" type="radio" value="cash"/>
            <label htmlFor="cash"> Cash on delivery</label>
            </form>
            <div className="coupon-section">
          <input type="text" placeholder="Coupon Code" />
          <button type="button">Apply Coupon</button>
        </div>
       <button type="button" className="placeorder-btn">Place Order</button>
        </div>
    </div>
</div>
    </>);
}