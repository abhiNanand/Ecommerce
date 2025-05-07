import {
  collection,
  setDoc,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { toast } from 'react-toastify';
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
      const newQuantity = (existingData.quantity ?? 1) + 1;

      await updateDoc(docRef, { quantity: newQuantity });
    } else {
      await setDoc(doc(wishlistRef), { ...product, quantity: 1 });
    }
  } catch {
    toast.error('error adding to the wishlist:');
  }
};

// 2. delete from wishlist
export const removeFromWishlist = async (ProductId: string) => {
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  try {
    const wishlistRef = collection(db, `users/${user.uid}/wishlist`);
    const q = query(wishlistRef, where('id', '==', ProductId));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
    }
  } catch {
    toast.error('Error removing item from wishlist:');
  }
};

// 3. Fetch only the logged-in user's wishlist items
export const getWishlistItems = async () => {
  const user = auth.currentUser;
  if (!user) {
    return [];
  }

  try {
    const wishlistRef = collection(db, `users/${user.uid}/wishlist`);
    const querySnapshot = await getDocs(wishlistRef);

    return querySnapshot.docs.map((wishlistDoc) => {
      const data = wishlistDoc.data();

      return {
        id: data.id,
      };
    });
  } catch {
    toast.error('Error fetching wishlist items:');
    return [];
  }
};

export const getPaginatedWishlistItems = async (
  pageSize = 5,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{
  products: Product[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
  hasMore: boolean;
}> => {
  const user = auth.currentUser;
  if (!user) {
    return { products: [], lastDoc: null, hasMore: false };
  }

  try {
    const wishlistRef = collection(db, `users/${user.uid}/wishlist`);

    const q = query(
      wishlistRef,
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(pageSize)
    );

    const querySnapshot = await getDocs(q);
    const { docs } = querySnapshot;

    let hasMore = false;
    if (docs.length === pageSize) {
      const nextQ = query(
        wishlistRef,
        startAfter(docs[docs.length - 1]),
        limit(1)
      );
      const nextSnapshot = await getDocs(nextQ);
      hasMore = !nextSnapshot.empty;
    }

    const products: Product[] = docs.map((doc) => {
      const data = doc.data() as Product;
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

    const newLastDoc = docs.length > 0 ? docs[docs.length - 1] : null;
    return { products, lastDoc: newLastDoc, hasMore };
  } catch {
    return { products: [], lastDoc: null, hasMore: false };
  }
};
