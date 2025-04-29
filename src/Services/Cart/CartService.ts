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
    const q = query(cartRef, where('id', '==', product.id));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      const existingData = querySnapshot.docs[0].data();
      const newQuantity = (existingData.quantity || 1) + 1;

      await updateDoc(docRef, { quantity: newQuantity });
    } else {
      await setDoc(doc(cartRef), { ...product, quantity: 1 });
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
    const cartRef = collection(db, `users/${user.uid}/cart`);
    const q = query(cartRef, where('id', '==', ProductId));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docRef = querySnapshot.docs[0].ref;
      await deleteDoc(docRef);
    }
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

 
export const getCartItems = async (): Promise<Product[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.error('User not logged in!');
    return [];
  }

  try {
    const cartRef = collection(db, `users/${user.uid}/cart`);
    const querySnapshot = await getDocs(cartRef);

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

/*
1. collection: The collection function in Firebase Firestore is used to get a reference to a collection in a Firestore database.
collection(firestoreInstance, path)

eg.
const cartRef = collection(db, `users/${user.uid}/cart`);


2.doc(cartRef)
doc(cartRef) creates a new document reference inside the cart collection with a randomly generated unique ID.setDoc writes product data into that document.

3.setDoc: setDoc is a Firestore function that writes data to the specified document.If the document exists, it overwrites the existing data. If the document does not exist, it creates a new document.

wait setDoc(doc(cartRef), { ...product, quantity: 1 });
Creates a new document inside the cart collection.

Assigns it a unique auto-generated ID.

Stores all properties of product, plus a quantity field set to 1.

4.query: Creates a Firestore query with optional filters.
const q = query(cartRef, where('id', '==', product.id));
Queries the cart collection to check if a product with the same id already exists.

where:Filters documents based on a condition.


5. getDocs(queryRef)
Fetches all documents that match a given query inside a collection.
6.updateDoc(docRef, data): Updates fields inside an existing Firestore document. 
await updateDoc(docRef, { quantity: newQuantity });
8.add doc and setdoc ka difference dekh lo

*/

 