import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../../Shared/Constants';
import { auth, googleProvider, db } from '../../../Services/firebase/firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';
import assets from '../../../assets';
import { toast } from 'react-toastify';
import { SpinnerLoader } from '../../Dashboard/Loaders/Loaders';
import './Login.scss';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [forgetPasswordWindow, setForgetPasswordWindow] = useState<boolean>(false);
  const [forgetEmail, setForgetEmail] = useState('');
  const [forgetEmailTouched, setForgetEmailTouched] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);

  const emailValidation = Yup.string()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Enter a valid email address')
    .required('Email is required');

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: emailValidation,
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

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      navigate(ROUTES.HOMEPAGE);
      toast.success('🎉 Signed in with Google successfully!');
      const token = await user.getIdToken();
      
      dispatch(updateAuthTokenRedux({
        token,
        user: {
          displayName: user.displayName,
          email: user.email,
        },
      }));

      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName ?? 'Anonymous',
        });
      }

     
    } catch (error: any) {
      console.error(error.message);
      toast.error('❌ Google Sign-In failed! Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgetPassword = async () => {
    const isValid = emailValidation.isValidSync(forgetEmail);
    if (!forgetEmail || !isValid) {
      toast.warning('Please enter a valid email address');
      return;
    }
    try {
      setSendingReset(true);
      await sendPasswordResetEmail(auth, forgetEmail);
      toast.success('Reset email sent! Check your inbox');
      setForgetPasswordWindow(false);
      setForgetEmail('');
      setForgetEmailTouched(false);
    } catch (error) {
      toast.error('❌ Failed to send reset email');
    } finally {
      setSendingReset(false);
    }
  };

  return (
    <div className="login-signup-container">
      {loading ? (
        <div className="loader">
          <SpinnerLoader />
        </div>
      ) : (
        <>
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
                  type="text"
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
                  onClick={() => setForgetPasswordWindow(true)}
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="button"
                id="google-btn"
                onClick={() => {
                  setLoading(true);
                  handleGoogleSignIn();
                }}
              >
                <img id="google-img" src={assets.icon.googleImg} alt="Google" /> Sign up with Google
              </button>
            </form>

            <p>
              Don't have an account? <Link to={ROUTES.SIGNUP}>Signup</Link>
            </p>
          </div>

          {forgetPasswordWindow && (
            <div className="forgetPassword">
              <div className="forgetPasswordWindow">
                <label>Enter Email Address</label><br />
                <input
                  type="text"
                  placeholder="Email address"
                  value={forgetEmail}
                  onChange={(e) => setForgetEmail(e.target.value)}
                  onBlur={() => setForgetEmailTouched(true)}
                />
                {forgetEmailTouched && !emailValidation.isValidSync(forgetEmail) && (
                  <div className="error-text">Enter a valid email address</div>
                )}

                <div className="button-group">
                  <button
                    type="button"
                    onClick={() => {
                      setForgetPasswordWindow(false);
                      setForgetEmail('');
                      setForgetEmailTouched(false);
                    }}
                  >
                    Cancel
                  </button>

                  <button type="button" onClick={handleForgetPassword}>
                    {sendingReset ? 'Sending...' : 'Send Reset Email Link'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
