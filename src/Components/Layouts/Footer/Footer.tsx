import assets from '../../../assets';
import './Footer.scss';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth, db } from '../../../Services/firebase/firebase';
import { logoutUser } from '../../../Store/Common';
import { useDispatch } from 'react-redux';
import { doc, getDoc } from 'firebase/firestore';
import { ROUTES } from '../../../Shared/Constants';
import { useAuth } from '../../../Services/UserAuth';
import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();

  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated && location.pathname != '/') toast.dismiss();
  }, [location.pathname]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && isAuthenticated) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (!userDoc.exists()) {
            toast.error('Your account has been removed.');
            await signOut(auth);
            dispatch(logoutUser());
          }
        } catch (error) {
          console.error('Error checking user existence:', error);
          toast.error('Authentication error. Logging out.');
          await signOut(auth);
          dispatch(logoutUser());
        }
      } else if (!user) {
        dispatch(logoutUser());
      }
    });
    return () => unsubscribe();
  }, [isAuthenticated]);

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Support</h3>
          <p>Vaishali 844101, Bihar, India</p>
          <p>Email: abhishekanand7091@gmail.com</p>
          <p>Phone:100</p>
        </div>

        <div className="footer-section">
          <h3>Account</h3>
          {isAuthenticated ? (
            <Link to={ROUTES.ACCOUNT}>My Account</Link>
          ) : (
            <Link to={ROUTES.LOGIN}>Login/Register</Link>
          )}

          <Link to={ROUTES.CART}>Cart</Link>

          <Link to={ROUTES.WISHLIST}>Wishlist</Link>

          <Link to={ROUTES.SHOP}>Shop</Link>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to={ROUTES.PRIVACY_POLICY}>Privacy Policy</Link>
          <Link to={ROUTES.TERMS_OF_USE}>Terms of Use</Link>
          <Link to={ROUTES.FAQs}>FAQs</Link>
        </div>

        <div className="download-app-container">
          <h2 className="download-heading">Download App</h2>
          <p className="download-subtext">Save $3 with App New User Only</p>

          <div className="download-content">
            <div className="qr-code">
              <img src={assets.images.qrcode} alt="QR Code" />
            </div>

            <div className="store-buttons">
              <a
                href="https://play.google.com/store/apps/details?id=com.shopify.mobile&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="store-button"
              >
                <img src={assets.images.googleplay} alt="Google Play Store" />
              </a>
              <a
                href="https://apps.apple.com/in/app/shopify-ecommerce-business/id371294472"
                target="_blank"
                rel="noopener noreferrer"
                className="store-button"
              >
                <img src={assets.images.applestore} alt="Apple Store" />
              </a>
            </div>
          </div>

          <div className="socialmedia">
            <a
              href="https://www.facebook.com/ChicmicAU"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.images.facebook} alt="Facebook" />
            </a>
            <a
              href="https://x.com/Chic_Mic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.images.twitter} alt="Twitter" />
            </a>
            <a
              href="https://www.instagram.com/chicmic.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.images.insta} alt="Instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/chicmicstudios"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={assets.images.linkedin} alt="LinkedIn" />
            </a>
          </div>

        </div>
      </div>

      <p id="bottom-text"> &copy; Copyright Rimel 2022. All rights reserved</p>
    </footer>
  );
}
