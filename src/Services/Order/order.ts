import { setDoc, collection, doc, getDocs,query,
  orderBy,
  limit,
  startAfter,  QueryDocumentSnapshot,
  DocumentData, } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { Product } from '../../Shared/Product';
import { Address } from '../Address/Address';
 
export const addToOrderHistory = async (
  product: Product[],
  address: Address,
  total:number,
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    console.log('user not found');
    return;
  }

  try {
    const orderRef = doc(collection(db, `users/${user.uid}/orders`));
    await setDoc(orderRef, {
      products: product,
      orderedAt: address,
      total:total,
      date: new Date(),
    });
  } catch {
    console.log("can't update orders");
  }
};

interface OrderData {
  id: string;
  products: Product[];
  address: Address;
  total:number
  date: Date;
}



export const fetchOrders = async (pageSize=5,lastDoc: QueryDocumentSnapshot<DocumentData> | null = null): Promise<{ orders:OrderData[];lastDoc: QueryDocumentSnapshot<DocumentData> | null;}> => {
  const user = auth.currentUser;
  if (!user) {
    console.log('User not found');
    return { orders: [], lastDoc: null };
  }
  try {
    const orderRef = collection(db, `users/${user.uid}/orders`);
    const q = query(
      orderRef,
      orderBy('date', 'desc'),
      ...(lastDoc ? [startAfter(lastDoc)] : []),
      limit(pageSize)
    );
 const querySnapshot = await getDocs(q);
 const docs = querySnapshot.docs;

const orders = docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        products: data.products,
        address: data.orderedAt,
        total:data.total,
        date: data.date.toDate ? data.date.toDate() : new Date(data.date),
      };
    });
    const newLastDoc = docs.length > 0 ? docs[docs.length - 1] : null;

    return { orders, lastDoc: newLastDoc };
  } catch (error) {
    console.log('Error fetching paginated orders:', error);
    return { orders: [], lastDoc: null };
  }
};
 
 