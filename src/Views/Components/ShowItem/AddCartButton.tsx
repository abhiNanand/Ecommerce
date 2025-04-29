import { Trash, ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Services/UserAuth';
import { Product } from '../../../Shared/Product';
import { RootState } from '../../../Store/index';
import { updateCartItem } from '../../../Store/Item/total_item_slice';
import {
  addToCart,
  removeFromCart,
} from '../../../Services/Cart/CartService';
import { auth, db } from '../../../Services/firebase/firebase';
import { ROUTES } from '../../../Shared/Constants';
import './ShowItem.scss';

interface CartButtonProps {
  cartItems: Map<string, number>;
  product: Product;
}

export default function AddCartButton({ cartItems, product }: CartButtonProps) {
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch();
  const cartCount = useSelector((state: RootState) => state.item.noOfCartItem);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTotal(cartItems.get(product.id) ?? 0);
  }, [cartItems, product.id]);

  const handleQuantityChange = async (
    product: Product,
    newQuantity: number,
    totCartCount: number
  ) => {
    if (!user) return;

    if (isLoading) return;
    setIsLoading(true);

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
        dispatch(updateCartItem(totCartCount));
      }
    } catch (error) {
      console.error('Error updating quantity', error);
      toast.error('Failed to update quantity');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveItem = async (product: Product) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await removeFromCart(product.id);
      cartItems.delete(product.id);
      setTotal(0);
      toast.info('Item removed from cart');
      dispatch(updateCartItem(cartCount - 1));
    } catch (error) {
      console.error('Error removing item', error);
      toast.error('Failed to remove item');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please Login to Add Item to Cart');
      navigate(ROUTES.LOGIN);
      return;
    }
    if (isLoading) return;
    setIsLoading(true);
    try {
      await addToCart(product);
      cartItems.set(product.id, 1);
      setTotal(1);
      dispatch(updateCartItem(cartCount + 1));
      toast.success('Item added to cart');
    } catch (error) {
      console.error('Error adding to cart', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
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
              onClick={() => {
                handleRemoveItem(product);
              }}
            >
              <Trash size={20} />
            </button>
          ) : (
            <button
              disabled={isLoading}
              className="cart-btn-minus"
              onClick={() => {
                handleQuantityChange(product, total - 1, cartCount - 1);
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
            disabled={isLoading}
            className="cart-btn-plus"
            onClick={() => {
              handleQuantityChange(product, total + 1, cartCount + 1);
            }}
          >
            +
          </button>
        </div>
      ) : (
        <button
          disabled={isLoading}
          className="cart-add-btn"
          type="button"
          onClick={handleAddToCart}
        >
          <ShoppingCart />
          Add to Cart
        </button>
      )}
    </>
  );
}
