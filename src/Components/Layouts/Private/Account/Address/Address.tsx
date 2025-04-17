import  { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../../Services/firebase/firebase';
import './Address.scss';
import {
  getAddress,
  removeAddress,
} from '../../../../../Services/Address/Address';
import type { Address } from '../../../../../Services/Address/Address';

const Address = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);


        useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
              await currentUser.reload();
              const result = await getAddress();
      setAddresses(result);
            }
            else {
              setAddresses([]);
            }
          });
          return ()=>unsubscribe();
        }, []);
  

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    await removeAddress(id);
    setAddresses((prev) => prev.filter((address) => address.firebaseId !== id));
  };

  return (
    <div className="address-book-container">
      <h2>Address Book</h2>
      {addresses.length === 0 ? (
        <p className="no-address">No address found.</p>
      ) : (
        <div className="address-grid">
          {addresses.map((address) => (
            <div key={address.firebaseId} className="address-card">
              <h3>{address.name}</h3>
              <p>{address.companyName}</p>
              <p>{address.streetAddress}</p>
              <p>{address.apartment}</p>
              <p>{address.town}</p>
              <p>{address.phoneNumber}</p>
              <p>{address.emailAddress}</p>
              <button onClick={() => handleDelete(address.firebaseId)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;
