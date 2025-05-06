import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export const getMessage = async (): Promise<Message[]> => {
  try {
    const messageRef = collection(db, 'message');
    const q = query(messageRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        createdAt: data.createdAt ?? null,
      };
    });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return [];
  }
};

export default getMessage;
