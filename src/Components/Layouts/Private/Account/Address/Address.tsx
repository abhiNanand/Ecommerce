import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../../../Services/firebase/firebase';
import './Address.scss';
import {
  getAddress,
  removeAddress,
} from '../../../../../Services/Address/Address';
import type { Address } from '../../../../../Services/Address/Address';
import AddAddress from './AddAddress';
function Address() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number>(-1);
  const [openAddress,setOpenAddress]=useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const result = await getAddress();
        setAddresses(result);
      } else {
        setAddresses([]);
      }
    });
    return () => unsubscribe();
  }, [openAddress]);

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    await removeAddress(id);
    setAddresses((prev) => prev.filter((address) => address.firebaseId !== id));
    setOpen(false);
  };

  return (
    <div className="address-book-container">
      <h2>Address Book</h2>
      {addresses.length === 0 ? (
        <p className="no-address">No address found.</p>
      ) : (
        <div className="address-grid">
          {addresses.map((address, index) => (
            <div key={address.firebaseId} className="address-card">
              <h3>Name: {address.name}</h3>
              <p>Street Address: {address.streetAddress}</p>
              <p>Town: {address.town}</p>
              <p>Phone Number: {address.phoneNumber}</p>
              <p>Email: {address.emailAddress}</p>
              <button
                onClick={() => {
                  setOpen(true);
                  setDeleteIndex(index);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      {open && (
        <div className="confirmation-container">
          <div>
            <div className="confirm-title-btn">
              <h3>Delete Confirmation</h3>
              <p>Are you sure you want to delete this address?</p>
              <div className="confirm-n-cancel-btn">
                <button
                  className="confirm-btn"
                  onClick={() => {
                    handleDelete(addresses[deleteIndex].firebaseId);
                    setOpen(false);
                  }}
                >
                  Confirm
                </button>
                <button className="cancel-btn" onClick={() => setOpen(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <button type="button" className="add-address-button" onClick={()=>{setOpenAddress(true);}}>Add Address</button>
      {openAddress &&  ( <div className="confirmation-container">  <div>
        <div className="confirm-title-btn"> <AddAddress onClose={() => setOpenAddress(false)}/> </div></div></div>)}
    </div>
  );
}

export default Address;

 