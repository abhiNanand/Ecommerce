import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import * as Yup from 'yup';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth';
import { toast } from 'react-toastify';
import { doc, setDoc } from 'firebase/firestore';
import { handleChange, handleChangePassword } from '../../../Shared/Utilities';
import { auth, db } from '../../../Services/firebase/firebase';
import assets from '../../../assets';
import { ROUTES, VALIDATION_CONSTANTS } from '../../../Shared/Constants';
import Google from '../Google';
import '../Login/Login.scss';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required(VALIDATION_CONSTANTS.NAME_REQUIRED),
      email: Yup.string()
        .required(VALIDATION_CONSTANTS.EMAIL_REQUIRED)
        .matches(
          VALIDATION_CONSTANTS.Email_REGEX,
          VALIDATION_CONSTANTS.EMAIL_INVALID
        ),
      password: Yup.string()
        .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH)
        .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED)
        .matches(
          VALIDATION_CONSTANTS.PASSWORD_REGEX,
          VALIDATION_CONSTANTS.PASSWORD_WEAK
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      setCreating(true);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { user } = userCredential;

        await updateProfile(user, { displayName: values.name });
        toast.success(
          'A verification link has been sent to your email. Please verify your account before logging in.',
          {
            autoClose: 4500,
          }
        );

        await sendEmailVerification(user);
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: values.name,
        });

        setTimeout(() => navigate(ROUTES.LOGIN), 2000);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          toast.error(' User already exist');
        } else {
          toast.error('Sign-up failed. Please try again.');
        }
      } finally {
        setCreating(false);
        resetForm();
      }
    },
  });

  return (
    <div className="login-signup-container">
      <div className="shop-img-container">
        <img src={assets.images.shopping} alt="shoppingImage" />
      </div>
      <div className="login-container">
        <h1>Create an account</h1>
        <p>Enter your details below</p>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <input
              id="name"
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) => handleChange(e, formik)}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="error-text">{formik.errors.name}</div>
            )}
          </div>

          <div className="input-group">
            <input
              id="email"
              type="text"
              placeholder="Email address"
              name="email"
              onChange={(e) => handleChange(e, formik)}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-text">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-group">
            <div className="input-password-wrapper">
              <input
                id="text"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                onChange={(e) => handleChangePassword(e, formik)}
                value={formik.values.password}
              />

              {formik.values.password &&
                (showPassword ? (
                  <EyeOff
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="eye-icon"
                    size={20}
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ))}
            </div>

            {formik.touched.password && formik.errors.password && (
              <div className="error-text">{formik.errors.password}</div>
            )}
          </div>

          <button disabled={creating} type="submit" id="create-btn">
            {creating ? 'Creating...' : 'Create Account'}
          </button>
          <Google />
        </form>
        <p id="go-to-login">
          Already have an account?{' '}
          <NavLink to={ROUTES.LOGIN}>
            <u>Log in</u>
          </NavLink>
        </p>
      </div>
    </div>
  );
}
