import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  addAddress,
} from '../../../../../Services/Address/Address';
import '../../Checkout/Checkout.scss';

interface FormValues {
  name: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  town: string;
  phoneNumber: string;
  emailAddress: string;
}

export default function   AddAddress({ onClose }: { onClose: () => void }) {
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
      onClose();
    },
  });
  return (
    <div className="billing-form">
        <form onSubmit={formik.handleSubmit}>
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

          <label htmlFor="companyName">Company Name (optional)</label>
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
              }
            }}
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
            save 
          </label>
        </form>
        <button className="close-address-btn" onClick={()=>  onClose()}>Close</button>
    </div>
  );
}

 