import {
  collection,
  setDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { Product } from '../../Shared/Product';

// 1. add to cart in firestore
export const addToCart = async (product: Product) => {
  const user = auth.currentUser;  
  if (!user) {
    console.log('In cart section- User not logged in ');
    return;
  }
  try {
    const cartRef = collection(db, `users/${user.uid}/cart`);
    const q = query(
      cartRef,
      where('id', '==', product.id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();
      const newQuantity = (existingData.quantity || 1) + 1;

      await updateDoc(docRef, { quantity: newQuantity });
    } else {
      const newCartItem={...product,quantity:1,};
      const newCartRef=doc(cartRef);
      await setDoc(newCartRef,newCartItem);
    }
  } catch (error) {
    console.error('error adding to the cart:', error);
  }
};

// 2. delete from cart
export const removeFromCart = async (ProductId: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User not logged in!');
    return;
  }

  try {

    const cartRef =  collection(db,`users/${user.uid}/cart`);
    const q= query(cartRef,where('id','==',ProductId));
    const querySnapshot = await getDocs(q);

    if(!querySnapshot.empty)
    {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
    }

  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// 3. Fetch only the logged-in user's cart items
export const getCartItems = async (): Promise<Product[]> => {
  const user = auth.currentUser;  
  if (!user) {
    console.error('User not logged in!');
    return [];
  }

  try {
    const cartRef =  collection(db,`users/${user.uid}/cart`);
    const querySnapshot=await getDocs(cartRef);

    return querySnapshot.docs.map((cartDoc) => {
      const data = cartDoc.data() as Product;

      return {
        id: data.id,
        title: data.title ?? '',
        image: data.image ?? '',
        price: data.price ?? 0,
        quantity: data.quantity ?? 1,
        description: data.description ?? '',
        category: data.category ?? '',
      };
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

// The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
