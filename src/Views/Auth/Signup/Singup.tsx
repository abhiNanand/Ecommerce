import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { Eye ,EyeClosed} from 'lucide-react';
import { useState } from 'react';
import * as Yup from 'yup';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
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
  const [showPassword,setShowPassword]=useState<boolean>(false);

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
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          'Enter a valid email address'
        ),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        );
        const { user } = userCredential;

        await updateProfile(user, { displayName: values.name });

        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: values.name,
        });

        toast.success('Account created successfully!');
        resetForm();
        setTimeout(() => navigate(ROUTES.LOGIN), 2000);
      } catch (error: any) {
        if (error.code === 'auth/email-already-in-use') {
          toast.error(' User already exist');
        } else {
          toast.error('Sign-up failed. Please try again.');
          console.error(error.message);
        }
      }
    },
  });

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const token = await user.getIdToken();

      navigate(ROUTES.HOMEPAGE);
      toast.success('🎉 Signed in with Google successfully!');
      dispatch(
        updateAuthTokenRedux({
          token,
          user: {
            displayName: user.displayName,
            email: user.email,
          },
        })
      );

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
              {...formik.getFieldProps('name')}
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
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="error-text">{formik.errors.email}</div>
            )}
          </div>

          <div className="input-group">
          <div className="input-password-wrapper">
            <input
              id="text"
              type={showPassword?"text":"password"}
              placeholder="Password"
              {...formik.getFieldProps('password')}
            />
            {showPassword?(<Eye className="eye-icon" size={20} onClick={()=> setShowPassword(!showPassword)}/>):(<EyeClosed className="eye-icon" size={20} onClick={()=> setShowPassword(!showPassword)}/>)}
           
            </div>
         
            {formik.touched.password && formik.errors.password && (
              <div className="error-text">{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" id="create-btn">
            Create Account
          </button>
          <button type="button" id="google-btn" onClick={handleGoogleSignIn}>
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