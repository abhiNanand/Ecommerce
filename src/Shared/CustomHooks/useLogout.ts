// src/Hooks/useLogout.ts
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { logoutUser } from '../../Store/Common';
import { auth } from '../../Services/firebase/firebase';

export const useLogout = () => {
  const dispatch = useDispatch();

  return async () => {
    await signOut(auth);
    dispatch(logoutUser());
  };
};
