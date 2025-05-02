import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
} from 'firebase/auth';
import { doc, setDoc, getDoc, query, where, getDocs, collection } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '../../../Shared/Constants';
import { auth, googleProvider, db } from '../../../Services/firebase/firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';
import assets from '../../../assets';
import './Login.scss';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [forgetPasswordWindow, setForgetPasswordWindow] =
    useState<boolean>(false);
  const [forgetEmail, setForgetEmail] = useState('');
  const [forgetEmailTouched, setForgetEmailTouched] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [logging, setLogging] = useState<boolean>(false);

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
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values, { setErrors }) => {
      setLogging(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { user } = userCredential;
        const token = await user.getIdToken();
        navigate(ROUTES.HOMEPAGE);
        dispatch(
          updateAuthTokenRedux({
            token,
            user: { displayName: user.displayName, email: user.email },
          })
        );


      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          setErrors({ password: 'Invalid email or password' });
        }
      } finally {
        setLogging(false);
      }
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    let processedValue = e.target.value;
    processedValue = processedValue.replace(/^\s+/g, '');
    formik.setFieldValue(fieldName, processedValue);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      navigate(ROUTES.HOMEPAGE);
      toast.success('Signed in with Google successfully!');
      const token = await user.getIdToken();
      setTimeout(() => {
        dispatch(
          updateAuthTokenRedux({
            token,
            user: {
              displayName: user.displayName,
              email: user.email,
            },
          })
        );
      }, 500);
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
      toast.error('Google Sign-In failed! Try again.');
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
      const normalizedEmail = forgetEmail.trim().toLowerCase();
      const q = query(collection(db, 'users'), where('email', '==', normalizedEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error("No user found with this email.");
        return;
      }

      await sendPasswordResetEmail(auth, normalizedEmail);
      toast.success('Reset email sent! Check your inbox');
      setForgetPasswordWindow(false);
      setForgetEmail('');
      setForgetEmailTouched(false);
    } catch {
      toast('Failed to send reset email');
    } finally {
      setSendingReset(false);
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
              type="text"
              placeholder="Email address"
              onChange={handleChange}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-text">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-group">

            <div className="input-password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                onChange={handleChange}
                value={formik.values.password}
              />

              {formik.values.password && (
                showPassword ? (
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
                )
              )}
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="error-text">{formik.errors.password}</div>
            )}
          </div>

          <div className="button-group">
            <button
              type="submit"
              id="login-btn"
              disabled={logging}
            >
              {logging ? 'Logging in...' : 'Log In'}
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
              handleGoogleSignIn();
            }}
          >
            <img id="google-img" src={assets.icon.googleImg} alt="Google" />{' '}
            Sign up with Google
          </button>
        </form>

        <p>
          Don't have an account? <Link to={ROUTES.SIGNUP}>Signup</Link>
        </p>
      </div>

      {forgetPasswordWindow && (
        <div className="forgetPassword">
          <div className="forgetPasswordWindow">
            <label>Enter Email Address</label>
            <br />
            <input
              type="text"
              placeholder="Email address"
              value={forgetEmail}
              onChange={(e) => setForgetEmail(e.target.value)}
              onBlur={() => setForgetEmailTouched(true)}
            />
            {forgetEmailTouched &&
              !emailValidation.isValidSync(forgetEmail) && (
                <div className="error-text">
                  Enter a valid email address
                </div>
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
    </div>
  );
}
