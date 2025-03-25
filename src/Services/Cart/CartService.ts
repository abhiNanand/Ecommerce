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
 
//add to cart in firestore
export const addToCart = async (product: Product) => {
  const user = auth.currentUser; //get current user
  console.log("addToCart:",typeof product.id);
  if (!user) {
    console.log('User not logged in ');
    return;
  }
  try {
    const cartRef = collection(db, 'cart');
    const q = query(
      cartRef,
      where('userId', '==', user.uid),
      where('id', '==', product.id)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();
      const newQuantity = (existingData.quantity || 1) + 1;

      await updateDoc(docRef, { quantity: newQuantity });
      console.log('Updated quantity:', newQuantity);
    } else {
      await addDoc(cartRef, { userId: user.uid, ...product, quantity: 1 });
      
    }
  } catch (error) {
    console.error('error adding to the cart:', error);
  }
};

//delete from cart
export const removeFromCart = async (productId: string) => {
  const user = auth.currentUser;
  console.log("removeFromCart:",typeof productId);
console.log(typeof productId);
  if (!user) {
    console.error('User not logged in!');
    return;
  }

  try {
    await deleteDoc(doc(db, 'cart', productId)); //delete item by its Firestore ID
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Fetch only the logged-in user's cart items
export const getCartItems = async (): Promise<Product[]> => {
  const user = auth.currentUser; // Get current user
  if (!user) {
    console.error('User not logged in!');
    return [];
  }

  try {
    const q = query(collection(db, 'cart'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Product; // Explicitly cast data to Product
      return {
        id: doc.id, // Ensure id is a string
        title: data.title ?? '', // Use Nullish Coalescing (??) instead of ||
        image: data.image ?? '',
        price: data.price ?? 0,
        quantity:data.quantity??1,
      };
    });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};
