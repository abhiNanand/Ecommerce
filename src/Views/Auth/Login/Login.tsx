import * as Yup from 'yup';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { query, where, getDocs, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from 'firebase/auth';
import { ROUTES, VALIDATION_CONSTANTS } from '../../../Shared/Constants';
import { updateAuthTokenRedux } from '../../../Store/Common/index';
import { auth, db } from '../../../Services/firebase/firebase';
import Google from '../Google';
import assets from '../../../assets';
import { ReusableForm } from '../ReusableForm';
import './Login.scss';

export default function Login() {
  const [forgetPasswordWindow, setForgetPasswordWindow] = useState<boolean>(false);
  const [forgetEmail, setForgetEmail] = useState('');
  const [forgetEmailTouched, setForgetEmailTouched] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [logging, setLogging] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const emailValidation = Yup.string()
    .matches(VALIDATION_CONSTANTS.Email_REGEX, VALIDATION_CONSTANTS.EMAIL_INVALID)
    .required(VALIDATION_CONSTANTS.EMAIL_REQUIRED);

  const formFields = [
    {
      name: 'email',
      type: 'text',
      placeholder: 'Email address',
      validation: Yup.string()
      .matches(VALIDATION_CONSTANTS.Email_REGEX, VALIDATION_CONSTANTS.EMAIL_INVALID)
      .required(VALIDATION_CONSTANTS.EMAIL_REQUIRED),
  
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Password',
      validation: Yup.string()
        .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH)
        .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED),
      showPasswordToggle: true,
    },
  ];

  const handleSubmit = async (values: { email: string; password: string }, { resetForm }: any) => {
    setLogging(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const { user } = userCredential;

      if (!user.emailVerified) {
        toast.warning('Email not verified. Please check your inbox.');
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
        toast.error('Login failed. Please check your credentials.');
      }
    } finally {
      resetForm();
      setLogging(false);
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
      const q = query(
        collection(db, 'users'),
        where('email', '==', normalizedEmail)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        toast.error('No user found with this email.');
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

        <ReusableForm
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object({
            email: emailValidation,
            password: Yup.string()
              .min(6, VALIDATION_CONSTANTS.PASSWORD_MIN_LENGTH)
              .required(VALIDATION_CONSTANTS.PASSWORD_REQUIRED),
          })}
          onSubmit={handleSubmit}
          fields={formFields}
          submitButtonText="Log In"
          isSubmitting={logging}
        >
          <div className="button-group">
            <button type="button" className="forgot-password" onClick={() => setForgetPasswordWindow(true)}>
              Forgot Password?
            </button>
          </div>
          <Google />
        </ReusableForm>

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
    </div>
  );
}
