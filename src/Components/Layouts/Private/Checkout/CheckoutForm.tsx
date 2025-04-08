

import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Checkout.scss';
// import {db} from '../../../../Services/firebase/firebase';
// import {addDoc,collection}

interface FormValues {
  name: string,
  companyName: string,
  streetaddress: string,
  apartment: string,
  town: string,
  phoneNumber: string,
  emailAddress: string,
}

export default function CheckoutForm()
{
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      companyName: '',
      streetaddress: '',
      apartment: '',
      town: '',
      phoneNumber: '',
      emailAddress: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),

      compnayName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),

      streetaddress: Yup.string().max(30, 'Must be 15 characters or less')
        .required('Required'),

      apartment: Yup.string().max(30, 'Must be 15 characters or less')
        .required('Required'),

      town: Yup.string().max(30, 'Must be 30 character or less').required('Required'),

      phoneNumber: Yup.string().matches(/^\d{10}$)/, 'Phone number must have 10 digits').required('Required'),

      email: Yup.string().email('Invalid email address').required('Required'),

      // onSubmit:async(values:FormValues,{resetForm}=>{

      // }),
    }),
  });


  return (
  <>
   <div className="billing-form">
      <form>
        <label htmlFor="firstname">
          First Name<sup>*</sup>
        </label>
        <br />
        <input type="text" id="firstname" />
        <br />
        <label htmlFor="companyname">
          Company Name<sup>*</sup>
        </label>
        <br />
        <input type="text" id="companyname" />
        <br />
        <label htmlFor="streetaddress">
          streetaddress<sup>*</sup>
        </label>
        <br />
        <input type="text" id="streetaddress" />
        <br />
        <label htmlFor="apartment">Apartment,floor,etc.(optional)</label>
        <br />
        <input type="text" id="apartment" />
        <br />
        <label htmlFor="towncity">
          Town/City<sup>*</sup>
        </label>
        <br />
        <input type="text" id="towncity" />
        <br />
        <label htmlFor="phonenumber">
          Phone Number<sup>*</sup>
        </label>
        <br />
        <input type="text" id="phonenumber" />
        <br />
        <label htmlFor="emailaddress">
          Email Address<sup>*</sup>
        </label>
        <br />
        <input type="text" id="emailaddress" />
        <br />
        <input type="checkbox" id="billing-checkbox" />
        <label htmlFor="billing-checkbox">
          save this information for faster check-out next time
        </label>
      </form>
    </div>
  </>
  );
}