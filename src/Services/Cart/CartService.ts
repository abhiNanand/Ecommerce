import {
  collection,
  addDoc,
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
  const user = auth.currentUser; // get current user
  if (!user) {
    console.log('In cart section- User not logged in ');
    return;
  }
  try {
    const cartRef = collection(db, 'cart');
    const q = query(
      cartRef,
      where('userEmail', '==', user.email),
      where('id', '==', product.id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();
      const newQuantity = (existingData.quantity || 1) + 1;

      await updateDoc(docRef, { quantity: newQuantity });
    } else {
      await addDoc(cartRef, { userEmail: user.email, ...product, quantity: 1 });
    }
  } catch (error) {
    console.error('error adding to the cart:', error);
  }
};

// 2. delete from cart
export const removeFromCart = async (firebaseId: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User not logged in!');
    return;
  }

  try {
    await deleteDoc(doc(db, 'cart', firebaseId)); // delete item by its Firestore ID
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// 3. Fetch only the logged-in user's cart items
export const getCartItems = async (): Promise<Product[]> => {
  const user = auth.currentUser; // Get current user
  //  console.log("hi")
  if (!user) {
    console.error('User not logged in!');
    return [];
  }

  try {
    const q = query(
      collection(db, 'cart'),
      where('userEmail', '==', user.email)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((cartDoc) => {
      const data = cartDoc.data() as Product;

      return {
        id: data.id,
        firebaseId: cartDoc.id,
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
