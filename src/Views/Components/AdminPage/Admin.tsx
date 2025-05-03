import { useEffect, useState } from 'react';
import { db, auth } from '../../../Services/firebase/firebase';

import {
  collection,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore';
import './Admin.scss';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../../../Store/Common/index';

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
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const q = query(
          collection(db, 'message'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const messagesData = querySnapshot.docs.map(
          (doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              name: data.name,
              email: data.email,
              phone: data.phone,
              message: data.message,
              createdAt: data.createdAt,

            };
          }
        );

        setMessages(messagesData);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  const handleLogout = async () => {
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
      <button className="admin-logout-btn" onClick={() => setOpenLogout(true)}>logout</button>
      {openLogout && (
        <div className="confirmation-container">
          <div>
            <div className="confirm-title-btn">
              <h3>Logout Confirmation</h3>
              <p>Are you sure you want to log out?</p>
              <div className="confirm-n-cancel-btn">
                <button
                  className="confirm-btn"
                  onClick={() => {
                    handleLogout();
                    setOpenLogout(false);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => setOpenLogout(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


