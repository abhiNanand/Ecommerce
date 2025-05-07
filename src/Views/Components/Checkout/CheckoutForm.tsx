import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'lucide-react';
import { onAuthStateChanged } from 'firebase/auth';
import AddressForm from '../AddressForm/AddressForm';
import { auth } from '../../../Services/firebase/firebase';
import { getAddress, Address } from '../../../Services/Address/Address';

import {
  updateAddress,
  removePreviousAddress,
} from '../../../Store/Address/AddressSlice';
import './Checkout.scss';

export default function CheckoutForm() {
  const [address, setAddress] = useState<Address[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const addresses = await getAddress();
        setAddress(addresses);

        if (addresses.length === 0) {
          setOpen(false);
        } else {
          handleRadioClick(addresses[selectedAddressIndex]);
        }
      }
    });

    return () => unsubscribe();
  }, [open]);

  const dispatch = useDispatch();
  const handleRadioClick = (value: Address) => {
    dispatch(removePreviousAddress());
    dispatch(
      updateAddress({
        name: value.name,
        companyName: value.companyName,
        streetAddress: value.streetAddress,
        apartment: value.apartment,
        town: value.town,
        phoneNumber: value.phoneNumber,
        emailAddress: value.emailAddress,
      })
    );
  };
  return (
    <div className="billing-form">
      {open ? (
        <div className="select-address">
          <h3>Select Address</h3>
          <form>
            {address.map((value, index) => (
              <div className="address-option" key={value.firebaseId}>
                <input
                  type="radio"
                  name="selectedAddress"
                  value={index}
                  id={`address-${index}`}
                  checked={selectedAddressIndex === index}
                  onClick={() => {
                    handleRadioClick(value);
                    setSelectedAddressIndex(index);
                  }}
                />
                <label htmlFor={`address-${index}`}>
                  <strong>{value.name}</strong>, {value.companyName},{' '}
                  {value.streetAddress},{value?.apartment ?? ''}, {value.town},{' '}
                  {value.phoneNumber}, {value.emailAddress}
                </label>
              </div>
            ))}
          </form>

          <button
            className="placeorder-btn"
            onClick={() => {
              setOpen(false);
            }}
          >
            Add Another Address
          </button>
        </div>
      ) : (
        <>
          {address.length > 0 && (
            <button className="go-back-btn" onClick={() => setOpen(true)}>
              <ArrowLeft size={14} />
            </button>
          )}
          <AddressForm onClose={() => setOpen(true)} />
        </>
      )}
    </div>
  );
}

// note
/*

1.id ka kaam hai label aur input ko visually aur semantically connect karna.
2.name attribute ka kya jarurat hai. 

Socho tumhare paas ek object hai:
 
initialValues: {
  name: '',
  emailAddress: '',
}
Ab Formik expect karta hai ki input fields kuch is tarah se hon:
<input name="name" />          // Yeh `initialValues.name` se link hoga
<input name="emailAddress" />  // Yeh `initialValues.emailAddress` se link hoga
*/
