import {  useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getCartItems, removeFromCart } from "../../../../Services/Cart/CartService";
import { auth ,db} from "../../../../Services/firebase/firebase";
import {updateDoc,doc} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import { Trash } from 'lucide-react';
import { Product } from '../../../../Shared/Product';
import './Cart.scss';

export default function Cart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);
    const [user, setUser] = useState<User | null>(auth.currentUser);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

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

    const handleRemoveItem = async (productId: string) => {
        await removeFromCart(productId);
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
    };

    const handleQuantityChange = async(productId: string, newQuantity: number) => {


        if(newQuantity<=0)
        {
            await removeFromCart(productId);
              setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId));
        }
        else
        {
            const productRef =  doc (db,"cart",productId);
            await updateDoc(productRef,{quantity:newQuantity});

            setCartItems((prevItems)=>prevItems.map((item)=>item.id === productId?{...item,quantity:newQuantity}:item));

        }

         
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, product) => total + (product.price * (product.quantity ?? 1)), 0);
    };

    const navigate = useNavigate();
    const returnHome = () => navigate('/');

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>

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
                            <div className="cart-row" key={product.id}>
                                <span>
                                    <img src={product.image} alt={product.title} className="cart-image" />
                                </span>
                                <span>₹{product.price}</span>
                                <span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={product.quantity}
                                        onChange={(e) => handleQuantityChange(product.id, Number(e.target.value))}
                                    />
                                </span>
                                <span>₹{(product.price * (product.quantity ?? 1)).toFixed(2)}</span>
                                <span>
                                    <button className="delete-btn" onClick={() => handleRemoveItem(product.id)}>
                                        <Trash size={20} />
                                    </button>
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="cart-actions">
                <button onClick={returnHome}>Return to Shop</button>
                <button>Update Cart</button>
            </div>

            <div className="cart-summary">
                <div className="coupon-section">
                    <input type="text" placeholder="Coupon Code" />
                    <button>Apply Coupon</button>
                </div>
                <div className="cart-total">
                    <h3>Cart Total</h3>
                    <p>Subtotal: ₹{calculateTotal().toFixed(2)}</p>
                    <p>Shipping: Free</p>
                    <p>Total: ₹{calculateTotal().toFixed(2)}</p>
                    <button>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}
