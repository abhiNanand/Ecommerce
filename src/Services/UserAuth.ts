import {useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { RootState } from '../Store';
import {auth} from './firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { updateAuthTokenRedux,logoutUser } from '../Store/Common';

export  function useAuth()
{
  const dispatch=useDispatch();
  const token = useSelector((state:RootState)=>state.common.token);
  const user = useSelector((state:RootState)=>state.common.user);
  const isAuthenticated=!!token;

  useEffect(()=>{
    const unsubscribe =  onAuthStateChanged(auth,async(firebaseUser)=>{
        if(firebaseUser)
        {
            const token =await firebaseUser.getIdToken();
            dispatch(updateAuthTokenRedux({token,user:{displayName:firebaseUser.displayName,email:firebaseUser.email}}));
        }
        else{
            dispatch(logoutUser());
        }
    });
    return()=>unsubscribe();
  },[dispatch]);

  return {isAuthenticated,user};

}

