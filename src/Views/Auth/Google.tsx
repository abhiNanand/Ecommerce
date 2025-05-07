import assets from '../../assets';
import { useGoogleSignUp } from '../../Shared/CustomHooks/useGoogleSignUp';

export default function Google() {
  const signInWithGoogle = useGoogleSignUp();
  return (
    <button type="button" id="google-btn" onClick={signInWithGoogle}>
      <img id="google-img" src={assets.icon.googleImg} alt="Google" /> Sign up
      with Google
    </button>
  );
}
