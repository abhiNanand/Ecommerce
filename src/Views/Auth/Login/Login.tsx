import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { updateAuthTokenRedux } from '../../../Store/Common/index';
import { ROUTES, VALIDATION , TOAST} from '../../../Shared/Constants';
import { handleChange, handleChangePassword } from '../../../Shared/Utilities';
import { auth, db } from '../../../Services/firebase/firebase';
import Google from '../Google';
import assets from '../../../assets';
import './Login.scss';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [forgetPasswordWindow, setForgetPasswordWindow] =
    useState<boolean>(false);
  const [forgetEmail, setForgetEmail] = useState('');
  const [forgetEmailTouched, setForgetEmailTouched] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [logging, setLogging] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailValidation = Yup.string()
    .matches(
      VALIDATION.Email_REGEX,
      VALIDATION.EMAIL_INVALID
    )
    .required(VALIDATION.EMAIL_REQUIRED);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: emailValidation,
      password: Yup.string()
        .min(6, VALIDATION.PASSWORD_MIN_LENGTH)
        .required(VALIDATION.PASSWORD_REQUIRED),
    }),
    onSubmit: async (values, { resetForm }) => {
      setLogging(true);
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { user } = userCredential;

        if (!user.emailVerified) {
          toast.warning(TOAST.EMAIL_NOT_VERIFIED);
          await sendEmailVerification(user);
          await auth.signOut();
        } else {
          const token = await user.getIdToken();
          navigate(ROUTES.HOMEPAGE);
          setTimeout(() => {
            dispatch(
              updateAuthTokenRedux({
                token,
                user: { displayName: user.displayName, email: user.email },
              })
            );
          }, 500);
        }
      } catch (error: any) {
        if (error.code === 'auth/invalid-credential') {
          toast.error(TOAST.LOGIN_FAILED);
        }
      } finally {
        resetForm();
        setLogging(false);
      }
    },
  });

  const handleForgetPassword = async () => {
    const isValid = emailValidation.isValidSync(forgetEmail);
    if (!forgetEmail || !isValid) {
      return;
    }

    try {
      setSendingReset(true);
      const normalizedEmail = forgetEmail.trim().toLowerCase();
      const q = query(
        collection(db, 'users'),
        where('email', '==', normalizedEmail)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error(TOAST.NO_USER_FOUND);
        return;
      }

      await sendPasswordResetEmail(auth, normalizedEmail);
      toast.success(TOAST.RESET_EMAIL_SEND);
      setForgetPasswordWindow(false);
      setForgetEmail('');
      setForgetEmailTouched(false);
    } catch {
      toast(TOAST.FAILED_TO_SEND_EMAIL);
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
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
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

          <div className="button-group">
            <button type="submit" id="login-btn" disabled={logging}>
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
          <Google />
        </form>

        <p>
          Don't have an account? <Link to={ROUTES.SIGNUP}>Signup</Link>
        </p>
      </div>

      {forgetPasswordWindow && (
        <div className="forgetPassword">
          <div className="forgetPasswordWindow">
            <label htmlFor="email">Enter Email Address</label>
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
    </div>
  );
}
