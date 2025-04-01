import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';
import { useDispatch } from 'react-redux';
import {  toast } from 'react-toastify';
 

import { auth, googleProvider } from '../../../Services/firebase/firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';
import assets from '../../../assets';
import { ROUTES } from '../../../Shared/Constants';
 

import '../Login/Login.scss';

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;

      await updateProfile(user, { displayName: name });
      toast.success('🎉 Account created successfully!');
      // console.log('User created', user);
      setTimeout(() => navigate(ROUTES.LOGIN), 3000);
    } catch (error) {
      if (error instanceof Error) {
        // console.log(error.message);
        toast.error('❌ Sign-up failed! Try again.');
      }
    }
  };

  // Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // console.log('Google Sign-In User:', result.user.getIdToken);
      const token = await result.user.getIdToken();
      dispatch(updateAuthTokenRedux({ token,user:{displayName:result.user.displayName,email:result.user.email} }));
      toast.success('🎉 Signed in with Google successfully!');
      setTimeout(()=>navigate(ROUTES.HOMEPAGE),2000);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error('❌ Google Sign-In failed! Try again.');
      }
    }
  };
  return (
    <div className="login-signup-container">
      <div className="shop-img-container">
      <img src={assets.images.shopping}/>
      </div>
      
    <div className="login-container">
     
      <h1>Create an account</h1>
      <p>Enter your details below</p>

      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
          />
        </div>

        <div className="input-group">
          <input
            id="email-address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email address"
          />
        </div>

        <div className="input-group">
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
        </div>

        <button type="submit" id="create-btn">
          Create Account
        </button>
        <button type="button" id="google-btn" onClick={handleGoogleSignIn}>
          <img id="google-img" src={assets.icon.googleImg} alt="Google" /> Sign
          up with Google
        </button>
      </form>

      <p id="go-to-login">
        Already have an account?{' '}
        <NavLink to={ROUTES.LOGIN}>
          <u>Log in</u>
        </NavLink>
      </p>

      {/* Toast Notifications Container */}
     
    </div>
    </div>
  );
}
