import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCG6Hcn4Ouy3poGC-cbeZpA1iqjNXH0N88',
  authDomain: 'loginsingup-ad65c.firebaseapp.com',
  projectId: 'loginsingup-ad65c',
  storageBucket: 'loginsingup-ad65c.firebasestorage.app',
  messagingSenderId: '408255544497',
  appId: '1:408255544497:web:80d7c8dd289461f85c3690',
  measurementId: 'G-KSJQ2YRDSH',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // Google Auth Provider

export default app;
