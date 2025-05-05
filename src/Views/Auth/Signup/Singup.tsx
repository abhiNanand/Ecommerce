import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useFormik } from 'formik';
import { Eye, EyeOff} from 'lucide-react';
import * as Yup from 'yup';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  sendEmailVerification,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { auth, googleProvider, db } from '../../../Services/firebase/firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';
import assets from '../../../assets';
import { ROUTES } from '../../../Shared/Constants';

import '../Login/Login.scss';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [creating,setCreating]=useState<boolean>(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string()
        .required('Email is required')
        .matches(
          /^[\w,-]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Enter a valid email address'
        ),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]).+$/,
          'Password must contain at least: 1 uppercase, 1 lowercase, 1 number, and 1 symbol'
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
         toast.success("A verification link has been sent to your email. Please verify your account before logging in.", {
          autoClose: 4500
        });
        
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
          console.error(error.message);
        }
      }
      finally{
        setCreating(false);
      }
      resetForm();
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
      const token = await user.getIdToken();

      navigate(ROUTES.HOMEPAGE);
      toast.success('Signed in with Google successfully!');
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
              onChange={handleChange}
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
                id="text"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
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

          <button disabled={creating} type="submit" id="create-btn">
           {creating? 'Creating...':'Create Account'}
          </button>
          <button type="button" id="google-btn" disabled={creating} onClick={handleGoogleSignIn}>
            <img id="google-img" src={assets.icon.googleImg} alt="Google" />{' '}
            Sign up with Google
          </button>
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