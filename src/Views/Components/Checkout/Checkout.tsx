import './Checkout.scss';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../Services/firebase/firebase';
import { getCartItems } from '../../../Services/Cart/CartService';
import { Product } from '../../../Shared/Product';
import BuyProduct from '../BuyProduct/BuyProduct';
import { useAuth } from '../../../Shared/CustomHooks/userAuth';

export default function Checkout() {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const items = await getCartItems();
        setCartItems(items);
      }
    });
    return () => unsubscribe();
  }, [user]);
  return <BuyProduct products={cartItems} />;
}
