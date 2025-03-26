import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { auth, db } from '../firebase/firebase';
import { Product } from '../../Shared/Product';

// add to wishlist in firestore
export const addToWishlist = async (product: Product) => {
  const user = auth.currentUser; // get current user

  // console.log('addToWishlist:', typeof product.id);
  if (!user) {
    // console.log('User not logged in ');
    return;
  }
  try {
    const wishlistRef = collection(db, 'wishlist');
    await addDoc(wishlistRef, { userEmail: user.email, ...product, quantity: 1 });
  } catch (error) {
    console.error('error adding to the cart:', error);
  }
};
// delete wishlist in Firestore
export const removeFromWishlist = async (productId: string) => {
  const user = auth.currentUser;
  // console.log('removeFromWishlist:', typeof productId);
  if (!user) {
    console.error('User not logged in!');
    return;
  }
  try {
    await deleteDoc(doc(db, 'wishlist', productId)); // delete item by its Firestore ID
    // console.log('deleted');
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
  }
};

// Fetch wishlist on login
export const getWishlistItems = async (): Promise<Product[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.error('user not logged in!');
    return [];
  }

  try {
    const q = query(
      collection(db, 'wishlist'),
      where('userEmail', '==', user.email)
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data() as Product;
      return {
        id: doc.id, // Ensure id is a string
        title: data.title ?? '', // Use Nullish Coalescing (??) instead of ||
        image: data.image ?? '',
        price: data.price ?? 0,
        quantity: data.quantity ?? 1,
      };
    });
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    return [];
  }
};
