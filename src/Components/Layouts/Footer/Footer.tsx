import assets from '../../../assets';
import './Footer.scss';
import { ROUTES } from '../../../Shared/Constants';
import { useAuth } from '../../../Services/UserAuth';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { isAuthenticated } = useAuth();
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* <div className="footer-section">
          <h3>Exclusive</h3>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>

          <div className="inputbox">
            <form className="subscribe-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="email-input"
              />
              <button type="submit" className="subscribe-button">
                <img src={assets.images.send} alt="Send" />
              </button>
            </form>
          </div>
        </div> */}

        <div className="footer-section">
          <h3>Support</h3>
          <p>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>Email: exclusive@gmail.com</p>
          <p>Phone: +88015-88888-9999</p>
        </div>

        <div className="footer-section">
          <h3>Account</h3>
          {isAuthenticated ? (
            <Link to={ROUTES.ACCOUNT}>My Account</Link>
          ) : (
            <Link to={ROUTES.LOGIN}>Login/Register</Link>
          )}
          <br />
          <Link to={ROUTES.CART}>Cart</Link>
          <br />
          <Link to={ROUTES.WISHLIST}>Wishlist</Link>
          <br />
          <Link to={ROUTES.SHOP}>Shop</Link>
          <br />
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to={ROUTES.BROWSE}>Privacy Policy</Link><br />
          <Link to={ROUTES.BROWSE}>Terms of Use</Link><br />
          <Link to={ROUTES.BROWSE}>FAQs</Link><br />
        </div>

        <div className="download-app-container">
          <h2 className="download-heading">Download App</h2>
          <p className="download-subtext">Save $3 with App New User Only</p>

          <div className="download-content">
            <div className="qr-code">
              <img src={assets.images.qrcode} alt="QR Code" />
            </div>

            <div className="store-buttons">
              <button type="button" className="store-button" onClick={()=> window.open('https://play.google.com/store/apps/details?id=com.shopify.mobile&pcampaignid=web_share', '_blank')}>
                <img src={assets.images.googleplay} alt="Google Play Store" />
              </button>
              <button type="button" className="store-button" onClick={()=> window.open('https://apps.apple.com/in/app/shopify-ecommerce-business/id371294472', '_blank')}>
                <img src={assets.images.applestore} alt="Apple Store" />
              </button>
            </div>
          </div>

          <div className="socialmedia">
            <button type="button" onClick={()=> window.open('https://www.facebook.com/ChicmicAU', '_blank')}>
              <img src={assets.images.facebook} alt="Facebook" />
            </button>
            <button type="button" onClick={()=> window.open('https://x.com/Chic_Mic', '_blank')}>
              <img src={assets.images.twitter} alt="Twitter" />
            </button>
            <button type="button" onClick={()=> window.open('https://www.instagram.com/chicmic.in', '_blank')}>
              <img src={assets.images.insta} alt="Instagram" />
            </button>
            <button type="button" onClick={()=> window.open('https://www.linkedin.com/company/chicmicstudios', '_blank')}>
              <img src={assets.images.linkedin} alt="LinkedIn" />
            </button>
          </div>
        </div>
      </div>

      <p id="bottom-text"> ⓒ Copyright Rimel 2022. All rights reserved</p>
    </footer>
  );
}
