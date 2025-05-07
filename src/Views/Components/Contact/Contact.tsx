import './Contact.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { db } from '../../../Services/firebase/firebase';
import { ROUTES } from '../../../Shared/Constants';
import assets from '../../../assets';

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
        .required('Name is required'),
      email: Yup.string()
        .required('Email is required')
        .matches(
          /^[\w,-]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Enter a valid email address'
        ),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Phone number must be 10 digits')
        .required('Phone number is required'),
      message: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Message is required'),
    }),
    onSubmit: async (values: FormValues, { resetForm }) => {
      await addDoc(collection(db, 'message'), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        createdAt: serverTimestamp(),
      });
      toast.success('Message sent successfully! We will contact you soon');
      resetForm();
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name;
    let processedValue = e.target.value;
    processedValue = processedValue.replace(/^\s+/g, '');
    formik.setFieldValue(fieldName, processedValue);
  };

  return (
    <div className="contact-container">
      <p className="breadcrumb">
        <NavLink to={ROUTES.HOMEPAGE}>Home /</NavLink>
        <NavLink to={ROUTES.CONTACT}> Contact</NavLink>
      </p>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="info-box">
            <div className="info-text">
              <div className="icon-with-text">
                <img src={assets.icon.call} alt="Call Icon" />
                <h4> Call To Us</h4>
              </div>
              <p>We are available 24/7, 7 days a week.</p>
              <p className="phone">Phone: +917091400186</p>
            </div>
          </div>
          <hr />
          <div className="info-box">
            <div className="info-text">
              <div className="icon-with-text">
                <img src={assets.icon.message} alt="Message Icon" />
                <h4> Write To Us</h4>
              </div>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Email: customer@exclusive.com</p>
              <p>Email support@exclusive.com </p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <form onSubmit={formik.handleSubmit} className="inputs-group">
            <div className="form-group">
              <div className="name-filed">
                <input
                  name="name"
                  type="text"
                  placeholder="Name*"
                  value={formik.values.name}
                  onChange={handleChange}
                />
                <div className="error">
                  {formik.touched.name && formik.errors.name
                    ? formik.errors.name
                    : ''}
                </div>
              </div>

              <div className="email-field">
                <input
                  name="email"
                  type="text"
                  placeholder="Email*"
                  value={formik.values.email}
                  onChange={handleChange}
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : ''}
                </div>
              </div>
              <div className="phone-filed">
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number*"
                  value={formik.values.phone}
                  onChange={(e) => {
                    const input = e.target.value.replace(/\D/g, '');
                    if (input.length <= 10) {
                      formik.setFieldValue('phone', input);
                    }
                  }}
                />
                <div className="error">
                  {formik.touched.phone && formik.errors.phone
                    ? formik.errors.phone
                    : ''}
                </div>
              </div>
            </div>

            <div className="form-message-group">
              <textarea
                name="message"
                placeholder="Message"
                value={formik.values.message}
                onChange={handleChange}
              />
              <div className="error">
                {formik.touched.message && formik.errors.message
                  ? formik.errors.message
                  : ''}
              </div>
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
