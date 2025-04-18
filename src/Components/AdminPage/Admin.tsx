import { useEffect, useState } from 'react';
import { db, auth } from '../../Services/firebase/firebase';

import {
  collection,
  getDocs,
  orderBy,
  query,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import './Admin.scss';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../../Store/Common/index';

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt?: { seconds: number; nanoseconds: number };
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, 'message'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);

        const messagesData: Message[] = querySnapshot.docs.map(
          (doc: QueryDocumentSnapshot<DocumentData>) => {
            const data = doc.data() as Omit<Message, 'id'>;
            return { id: doc.id, ...data };
          }
        );

        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleClick = async () => {
    await signOut(auth);
    dispatch(logoutUser());
  };

  return (
    <div className="admin-messages-container">
      <h2>Contact Messages</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg.id}>
              <td>{msg.name}</td>
              <td>{msg.email}</td>
              <td>{msg.phone}</td>
              <td>{msg.message}</td>
              <td>
                {msg.createdAt
                  ? new Date(msg.createdAt.seconds * 1000).toLocaleString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => handleClick()}>logout</button>
    </div>
  );
}
