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

// 1. add to wishlist in firestore
export const addToWishlist = async (product: Product) => {
  const user = auth.currentUser;
  if (!user) {
    
    return;
  }
  try {
    const wishlistRef = collection(db, `users/${user.uid}/wishlist`);
    const q = query(wishlistRef, where('id', '==', product.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();
      const newQuantity = (existingData.quantity || 1) + 1;

      await updateDoc(docRef, { quantity: newQuantity });
    } else {
      await setDoc(doc(wishlistRef), { ...product, quantity: 1 });
    }
  } catch (error) {
    console.error('error adding to the wishlist:', error);
  }
};

// 2. delete from wishlist
export const removeFromWishlist = async (ProductId: string) => {
  const user = auth.currentUser;

  if (!user) {
    console.error('User not logged in!');
    return;
  }

  try {
    const wishlistRef = collection(db, `users/${user.uid}/wishlist`);
    const q = query(wishlistRef, where('id', '==', ProductId));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
      
    }
  } catch (error) {
    console.error('Error removing item from wishlist:', error);
  }
};

// 3. Fetch only the logged-in user's wishlist items
export const getWishlistItems = async (): Promise<Product[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.error('User not logged in!');
    return [];
  }

  try {
    const wishlistRef = collection(db, `users/${user.uid}/wishlist`);
    const querySnapshot = await getDocs(wishlistRef);

    return querySnapshot.docs.map((wishlistDoc) => {
      const data = wishlistDoc.data() as Product;

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
    console.error('Error fetching wishlist items:', error);
    return [];
  }
};

// The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.



// export const checkIfInWishlist = async (ProductId:any): Promise<boolean> => {
//   const user = auth.currentUser;

//   if (!user) {
//     console.error('User not logged in!');
//     return false;
//   }

//   try {
//     const wishlistRef = collection(db, `users/${user.uid}/wishlist`);
//     const q = query(wishlistRef, where('id', '==', ProductId));
//     const querySnapshot = await getDocs(q);
//     if (!querySnapshot.empty) {
//      return true;
//     }
//     else
//     return false;
//   } catch {
//      return false;
//   }
// };