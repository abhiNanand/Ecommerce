import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useLogout } from '../../../Shared/CustomHooks/useLogout';
import { getMessage, Message } from '../../../Services/Message/MessageService';
import './Admin.scss';
import { auth } from '../../../Services/firebase/firebase';

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const logout = useLogout();
  const [openLogout, setOpenLogout] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const fetchMessage = await getMessage();
        setMessages(fetchMessage);
      }
    });
    return () => unsubscribe();
  }, []);

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
      <button className="admin-logout-btn" onClick={() => setOpenLogout(true)}>
        logout
      </button>
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
                    logout();
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
