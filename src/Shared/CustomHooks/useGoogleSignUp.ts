import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROUTES } from '../Constants';
import { auth, googleProvider, db } from '../../Services/firebase/firebase';
import { updateAuthTokenRedux } from '../../Store/Common';

export const useGoogleSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return async () => {
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
};
