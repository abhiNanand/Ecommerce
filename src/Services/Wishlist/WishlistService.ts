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
  if (!user) {
    return;
  }
  try {
    const wishlistRef = collection(db, 'wishlist');
    await addDoc(wishlistRef, {
      userEmail: user.email,
      ...product,
      quantity: 1,
    });
  } catch (error) {
    console.error('error adding to the wishlist:', error);
  }
};
// delete wishlist in Firestore
export const removeFromWishlist = async (productId: string) => {
  const user = auth.currentUser;
  if (!user) {
    console.error('User not logged in!');
    return;
  }
  try {
    console.log(productId);
    await deleteDoc(doc(db, 'wishlist', productId));
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
        id: data.id,
        firebaseId: doc.id,
        title: data.title ?? '',
        image: data.image ?? '',
        price: data.price ?? 0,
        quantity: data.quantity ?? 1,
        description: data.description ?? '',
        category: data.category ?? '',
      };
    });
  } catch (error) {
    console.error('Error fetching wishlist items:', error);
    return [];
  }
};
