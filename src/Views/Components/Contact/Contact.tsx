import './Contact.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { NavLink } from 'react-router-dom';
import { db } from '../../../Services/firebase/firebase';
import {
  ROUTES,
  TEXT,
  BREADCRUMB,
  TOAST,
  VALIDATION,
} from '../../../Shared/Constants';
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
        .max(20, VALIDATION.MAX_LENGTH_20)
        .required(VALIDATION.NAME_REQUIRED),
      email: Yup.string()
        .required(VALIDATION.EMAIL_REQUIRED)
        .matches(VALIDATION.Email_REGEX, VALIDATION.EMAIL_INVALID),
      phone: Yup.string()
        .matches(VALIDATION.PHONE_NO_REGEX, VALIDATION.PHONE_NO_LENGTH)
        .required(VALIDATION.PHONE_NO_REQUIRED),
      message: Yup.string()
        .max(50, VALIDATION.MAX_LENGTH_50)
        .required(VALIDATION.MESSAGE_IS_REQUIRED),
    }),
    onSubmit: async (values: FormValues, { resetForm }) => {
      await addDoc(collection(db, 'message'), {
        name: values.name,
        email: values.email,
        phone: values.phone,
        message: values.message,
        createdAt: serverTimestamp(),
      });
      toast.success(TOAST.MESSAGE_SEND_SUCCESSFULLY);
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
        <NavLink to={ROUTES.HOMEPAGE}>{BREADCRUMB.HOME}</NavLink>
        <NavLink to={ROUTES.CONTACT}>{BREADCRUMB.CONTACT}</NavLink>
      </p>

      <div className="contact-wrapper">
        <div className="contact-info">
          <div className="info-box">
            <div className="info-text">
              <div className="icon-with-text">
                <img src={assets.icon.call} alt="Call Icon" />
                <h4>{TEXT.CALL_TO_US}</h4>
              </div>
              <p>{TEXT.CALL_TO_US_DESC}</p>
              <p className="phone">{TEXT.CALL_TO_US_PHONE}</p>
            </div>
          </div>
          <hr />
          <div className="info-box">
            <div className="info-text">
              <div className="icon-with-text">
                <img src={assets.icon.message} alt="Message Icon" />
                <h4>{TEXT.WRITE_TO_US}</h4>
              </div>
              <p>{TEXT.WRITE_TO_US_DESC}</p>
              <p>{TEXT.EMAIL_1}</p>
              <p>{TEXT.EMAIL_2}</p>
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
              {TEXT.SEND_MESSAGE}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
