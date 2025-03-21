//lib
import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { useDispatch } from 'react-redux';
//components
//utils
import { auth } from './firebase';
import { updateAuthTokenRedux } from '../../../Store/Common';

//styles
import './Login.scss';

export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [resetEmailSent, setResetEmailSent] = useState<boolean>(false);

  const dispatch = useDispatch();


  const onLogin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;
      const token = await user.getIdToken();//get firebase token
      dispatch(updateAuthTokenRedux({ token })); //store token in redux
      console.log("user data", userCredential);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  // function to handle password reset

  const handleForgetPassword = async () => {
    if (!email) {
      alert('pleease enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (error) {
      if (error instanceof Error)
        console.error('forget Password Error,error.message');
    }
  };
  return (
    <div className="login-container">
      <h1>Log in to Exclusive</h1>
      <p>Enter your details below</p>

      <form>
        <div className="input-group">
          <input
            id="email-address"
            name="email"
            type="email"
            required
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="button-group">
          <button type="button" id="login-btn" onClick={onLogin}>
            Log In
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
      {resetEmailSent && (
        <p className="reset-message">Reset email sent! Check your inbox.</p>
      )}
    </div>
  );
}
