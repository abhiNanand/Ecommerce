import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider } from '../Login/firebase';

import '../Login/Login.scss';
import googleImg from './googleImg.png';

export default function Signup() {
  const navigate = useNavigate();
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

      console.log('User created', user);
      navigate('/login');
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  // for logging with google
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Google Sign-In User:', result.user);
      navigate('/'); // Redirect to home after login
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
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
          <img id="google-img" src={googleImg} alt="Google" /> Sign up with
          Google
        </button>
      </form>

      <p id="go-to-login">
        Already have an account?{' '}
        <NavLink to="/login">
          <u>Log in</u>
        </NavLink>
      </p>
    </div>
  );
}
