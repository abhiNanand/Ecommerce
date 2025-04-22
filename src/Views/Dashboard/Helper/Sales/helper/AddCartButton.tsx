import { Trash } from "lucide-react";
import { toast } from 'react-toastify';
import { useAuth } from "../../../../../Services/UserAuth";
import { Product } from "../../../../../Shared/Product";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from "../../../../../Store/index";
import { updateCartItem } from "../../../../../Store/Item/total_item_slice";
import { addToCart, removeFromCart } from "../../../../../Services/Cart/CartService";
import { updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../../../../Services/firebase/firebase';
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import {ROUTES} from '../../../../../Shared/Constants';
import '../ShowItem.scss';
interface CartButtonProps {
  cartItems: Map<string, number>;
  product: Product;
}

export default function AddCartButton({ cartItems, product }: CartButtonProps) {
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
  const { user } = useAuth();
  const navigate=useNavigate();

  useEffect(() => {
    setTotal(cartItems.get(product.id) ?? 0);
  }, [cartItems, product.id]);

  const handleQuantityChange = async (product: Product, newQuantity: number) => {
    if (!user) return;
    
    try {
      const user = auth.currentUser;
      const cartRef = collection(db, `users/${user?.uid}/cart`);
      const q = query(cartRef, where('id', '==', product.id));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, { quantity: newQuantity });
        cartItems.set(product.id, newQuantity);
        setTotal(newQuantity);
      }
    } catch (error) {
      console.error('Error updating quantity', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (product: Product) => {
    try {
      await removeFromCart(product.id);
      cartItems.delete(product.id);
      setTotal(0);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item', error);
      toast.error('Failed to remove item');
    }
  };

  const handleAddToCart = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) {
      toast.error('Please Login to Add Item to Cart');
      navigate(ROUTES.LOGIN);
      return;
    }
    
    try {
      await addToCart(product);
      cartItems.set(product.id, 1);
      setTotal(1);
      dispatch(updateCartItem(cartCount + 1));
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart', error);
      toast.error('Failed to add to cart');
    }
  };

  return (
    <>
      {total > 0 ? (
  <div className="cart-quantity-controls">
    {total === 1 ? (
      <button
        type="button"
        className="cart-delete-btn"
        onClick={(event) => {
          event.stopPropagation();
          handleRemoveItem(product);
          dispatch(updateCartItem(cartCount - 1));
        }}
      >
        <Trash size={20} />
      </button>
    ) : (
      <button
        className="cart-btn-minus"
        onClick={(event) => {
          event.stopPropagation();
          handleQuantityChange(product, total - 1);
          dispatch(updateCartItem(cartCount - 1));
        }}
      >
        -
      </button>
    )}

    <input
      id="cart-quantity"
      className="cart-quantity-display"
      value={total}
      readOnly
    />

    <button
    type="button"
      className="cart-btn-plus"
      onClick={(event) => {
        event.stopPropagation();
        handleQuantityChange(product, total + 1);
        dispatch(updateCartItem(cartCount + 1));
      }}
    >
      +
    </button>
  </div>
) : (
  <button
    className="cart-add-btn"
    type="button"
    onClick={handleAddToCart}
  >
    Add to Cart
  </button>
)}
   </>
  );
}