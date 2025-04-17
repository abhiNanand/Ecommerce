import assets from '../../../assets';
import './Contact.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { db } from '../../../Services/firebase/firebase';
import { ROUTES } from '../../../Shared/Constants';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function Contact() {
  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Required'),
      message: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    }),
    onSubmit: async (values: FormValues, { resetForm }) => {
      await addDoc(collection(db, 'message'), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        createdAt: serverTimestamp(),
      });
      toast('Message send successfully! We will contact you soon');
      resetForm();
    },
  });

  return (
    <div className="contact-container">
      <p className="breadcrumb">
        <NavLink to={ROUTES.HOMEPAGE}>Home /</NavLink>
        <NavLink to={ROUTES.ACCOUNT}> Contact</NavLink>
      </p>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="info-box">
            <img src={assets.icon.call} alt="Call Icon" />
            <div>
              <h4>Call To Us</h4>
              <p>We are available 24/7, 7 days a week.</p>
              <p className="phone">Phone: +917091400186</p>
            </div>
          </div>
          <hr />
          <div className="info-box">
            <img src={assets.icon.message} alt="Message Icon" />
            <div>
              <h4>Write To Us</h4>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Email: customer@exclusive.com, support@exclusive.com </p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <div className="inputs-group">
            <form onSubmit={formik.handleSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Your Name*"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="error">{formik.errors.name}</div>
              )}

              <input
                name="email"
                type="email"
                placeholder="Your Email*"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="error">{formik.errors.email}</div>
              )}

              <input
                name="phone"
                type="text"
                placeholder="Your Phone*"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="error">{formik.errors.phone}</div>
              )}

              {/* Message Input */}
              <textarea
                name="message"
                placeholder="Your Message*"
                value={formik.values.message}
                onChange={formik.handleChange}
              />
              {formik.touched.message && formik.errors.message && (
                <div className="error">{formik.errors.message}</div>
              )}

              <button type="submit" className="send-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
