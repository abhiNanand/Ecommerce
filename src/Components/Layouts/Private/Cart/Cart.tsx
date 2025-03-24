

import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getCartItems, removeFromCart } from "../../../../Services/Cart/CartService";
import { auth } from "../../../../Services/firebase/firebase"; // Firebase auth for user check
import { onAuthStateChanged, User } from "firebase/auth"; // Import auth listener
import { Trash } from 'lucide-react';
import './Cart.scss';
export default function Cart() {

    interface Product {
        id: string;
        title: string;
        price: number;
        image: string;
    }
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [user, setUser] = useState<User | null>(auth.currentUser); // Track user

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Update user when login/logout happens
        });
        return () => unsubscribe(); // Cleanup listener on unmount
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (!user) {
                setCartItems([]); // Clear cart when user logs out
                return;
            }
            const items = await getCartItems();
            setCartItems(items);
        };
        fetchCartItems();
    }, [user]); // Fetch cart whenever user changes

    const handleRemoveItem = async (productId: string) => {
        await removeFromCart(productId);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId)); // Update UI state
    };

    const location = useLocation(); //getting current path
    const navigate = useNavigate();
    const quantity = 1;

    const returnHome = () => navigate('/');
    return (
        <>
            <div className="cart">
                <p>Home{location.pathname}</p>
                <div className="cartHeader">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span>Subtotal</span>
                    <span>Remove</span>
                </div>
                <div className="cartItems">
                    {cartItems.length === 0 ? (<p>No items in the cart</p>) : (cartItems?.map((product) => (
                        <div className="list-items">
                            <span><img src={product.image} height="30px" width="30px" /></span>
                            <span>{product.price}</span>
                            <span>{quantity}</span>
                            <span>{product.price * quantity}</span>
                            <span> <button type="button" className="dlt-item-btn" onClick={() => handleRemoveItem(product.id)}> <Trash size={24} /></button>
                            </span>
                        </div>
                    )))}
                </div>

                <div className="cart-shop-btn">
                    <button onClick={returnHome}>Return to Shop</button>
                    <button>Update Cart</button>


                </div>
                <div className="couponCode-cartTotal">
                    <div className="coupon">
                        <input type="text" placeholder="Coupon Code" />
                        <button>Apply Coupon</button>
                    </div>
                    <div className="cartTotal">
                        <h3>Cart Total</h3>
                        <p>Subtotal:</p>
                        <p>Shipping:</p>
                        <p>Total:</p>
                        <button>Process to checkout</button>
                    </div>
                </div>
            </div>

        </>
    );
}

