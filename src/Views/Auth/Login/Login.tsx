import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ROUTES } from '../../../Shared/Constants';
import { auth } from '../../../Services/firebase/firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';
import assets from '../../../assets';
import './Login.scss';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [resetEmailSent, setResetEmailSent] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { user } = userCredential;
        const token = await user.getIdToken();

        dispatch(
          updateAuthTokenRedux({
            token,
            user: { displayName: user.displayName, email: user.email },
          })
        );

        navigate(ROUTES.HOMEPAGE);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);

           setErrors({ password: 'Incorrect email or password' });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleForgetPassword = async () => {
    if (!formik.values.email) {
      alert('Please enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, formik.values.email);
      setResetEmailSent(true);
    } catch (error) {
      if (error instanceof Error) console.error('Reset password error:', error.message);
    }
  };

  return (
    <div className="login-signup-container">
      <div className="shop-img-container">
        <img src={assets.images.shopping} alt="shopping_image" />
      </div>

      <div className="login-container">
        <h1>Log in to Exclusive</h1>
        <p>Enter your details below</p>

        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email address"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-text">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-group">
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error-text">{formik.errors.password}</div>
            )}
          </div>

          <div className="button-group">
            <button type="submit" id="login-btn" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Logging in...' : 'Log In'}
            </button>
            <button
              type="button"
              className="forgot-password"
              onClick={handleForgetPassword}
            >
              Forgot Password?
            </button>
          </div>
        </form>

        <p>
          Don't have an account? <Link to={ROUTES.SIGNUP}>Signup</Link>
        </p>

        {resetEmailSent && (
          <p className="reset-message">Reset email sent! Check your inbox.</p>
        )}
      </div>
    </div>
  );
}
