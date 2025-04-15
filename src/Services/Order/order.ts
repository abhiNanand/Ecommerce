import { setDoc, collection, doc, getDocs } from 'firebase/firestore';
import { db, auth } from '../firebase/firebase';
import { Product } from '../../Shared/Product';
import { Address } from '../Address/Address';
// add order history

export const addToOrderHistory = async (
  product: Product[],
  address: Address
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
      date: new Date(),
    });
  } catch {
    console.log("can't update orders");
  }
};

// fetch order history

interface OrderData {
  id: string;
  products: Product[];
  address: Address;
  date: Date;
}

export const fetchOrders = async (): Promise<OrderData[]> => {
  const user = auth.currentUser;
  if (!user) {
    console.log('User not found');
    return [];
  }

  try {
    const orderRef = collection(db, `users/${user.uid}/orders`);
    const querySnapshot = await getDocs(orderRef);

    return querySnapshot.docs.map((orderDoc) => {
      const data = orderDoc.data();
      return {
        id: orderDoc.id,
        products: data.products,
        address: data.orderedAt,
        date: data.date.toDate ? data.date.toDate() : new Date(data.date),
      };
    });
  } catch (error) {
    console.log('Error fetching orders:', error);
    return [];
  }
};
