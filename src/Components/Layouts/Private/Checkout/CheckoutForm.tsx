import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
 import { ArrowLeft } from 'lucide-react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../../../../Services/firebase/firebase';
import {
  addAddress,
  getAddress,
  Address,
} from '../../../../Services/Address/Address';
 
import {
  updateAddress,
  removePreviousAddress,
} from '../../../../Store/Address/AddressSlice';
 import './Checkout.scss';


interface FormValues {
  name: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  town: string;
  phoneNumber: string;
  emailAddress: string;
}

export default function CheckoutForm() {
  const [address, setAddress] = useState<Address[]>([]);
  const [open, setOpen] = useState<boolean>(true);
  
  const [selectedAddressIndex,setSelectedAddressIndex]=useState<number>(0);
 

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

     const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      companyName: '',
      streetAddress: '',
      apartment: '',
      town: '',
      phoneNumber: '',
      emailAddress: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 20 characters or less')
        .required('Required'),

      companyName: Yup.string().max(15, 'Must be 40 characters or less'),

      streetAddress: Yup.string()
        .max(30, 'Must be 40 characters or less')
        .required('Required'),

      apartment: Yup.string().max(30, 'Must be 30 characters or less'),

      town: Yup.string()
        .max(30, 'Must be 30 character or less')
        .required('Required'),

      phoneNumber: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must have 10 digits')
        .required('Required'),

        emailAddress: Yup.string()
        .required('Required')
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Enter a valid email address'
        ),
    }),


    onSubmit: async (values, { resetForm }) => {
      addAddress(values);
      setOpen(true);
      resetForm({
        values: {
          name: '',
          companyName: '',
          streetAddress: '',
          apartment: '',
          town: '',
          phoneNumber: '',
          emailAddress: '',
        },
      });
    },
  });
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
                  checked={selectedAddressIndex ===  index}
                  onClick={() => {handleRadioClick(value);setSelectedAddressIndex(index);}}
                />
                <label htmlFor={`address-${index}`}>
                  <strong>{value.name}</strong>, {value.companyName},{' '}
                  {value.streetAddress},{value?.apartment ?? ''}, {value.town},{' '}
                  {value.phoneNumber}, {value.emailAddress}
                </label>
              </div>
            ))}
          </form>

          <button className="placeorder-btn" onClick={() => { formik.resetForm();setOpen(false);}}>
            Add Another Address
          </button>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit}>
         { (address.length>0 )&& ( <button onClick={() => setOpen(true)}>
           
           <ArrowLeft size={14} />{' '}
         </button>
         )}
         <br/>
          <label htmlFor="name">
            Full Name<sup>*</sup>
          </label>
          <br />
          <input
            type="text"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <br />
          {formik.touched.name && formik.errors.name && (
            <div className="error">{formik.errors.name}</div>
          )}

          <label htmlFor="companyName">
            Company Name (optional)
          </label>
          <br />
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={formik.values.companyName}
            onChange={formik.handleChange}
          />
          <br />
          {formik.touched.companyName && formik.errors.companyName && (
            <div className="error">{formik.errors.companyName}</div>
          )}

          <label htmlFor="streetAddress">
            Street Address<sup>*</sup>
          </label>
          <br />
          <input
            type="text"
            id="streetAddress"
            name="streetAddress"
            value={formik.values.streetAddress}
            onChange={formik.handleChange}
          />
          <br />
          {formik.touched.streetAddress && formik.errors.streetAddress && (
            <div className="error">{formik.errors.streetAddress}</div>
          )}

          <label htmlFor="apartment">Apartment,floor,etc.(optional)</label>
          <br />
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={formik.values.apartment}
            onChange={formik.handleChange}
          />
          <br />
          {formik.touched.apartment && formik.errors.apartment && (
            <div className="error">{formik.errors.apartment}</div>
          )}

          <label htmlFor="town">
            Town/City<sup>*</sup>
          </label>
          <br />
          <input
            type="text"
            id="town"
            name="town"
            value={formik.values.town}
            onChange={formik.handleChange}
          />
          <br />
          {formik.touched.town && formik.errors.town && (
            <div className="error">{formik.errors.town}</div>
          )}

          <label htmlFor="phoneNumber">
            Phone Number<sup>*</sup>
          </label>
          <br />
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={(e) => {
              const input = e.target.value.replace(/\D/g, ''); 
              if (input.length <= 10) {
                formik.setFieldValue('phoneNumber', input);
              }}
            }
          />
          <br />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="error">{formik.errors.phoneNumber}</div>
          )}

          <label htmlFor="emailAddress">
            Email Address<sup>*</sup>
          </label>
          <br />
          <input
            type="text"
            id="emailAddress"
            name="emailAddress"
            value={formik.values.emailAddress}
            onChange={formik.handleChange}
           
          />
          <br />
          {formik.touched.emailAddress && formik.errors.emailAddress && (
            <div className="error">{formik.errors.emailAddress}</div>
          )}

          <input
            type="checkbox"
            id="billing-checkbox"
            onChange={(e) => {
              if (e.target.checked) formik.handleSubmit();
             
            }}
            checked={false}
          />
          <label htmlFor="billing-checkbox">
            save this information for faster check-out next time
          </label>
        </form>
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
