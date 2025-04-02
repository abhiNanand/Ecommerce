import assets from '../../../assets';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Exclusive Section */}
        <div className="footer-section">
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
        </div>

        {/* Support Section */}
        <div className="footer-section">
          <h3>Support</h3>
          <p>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh.</p>
          <p>Email: exclusive@gmail.com</p>
          <p>Phone: +88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div className="footer-section">
          <h3>Account</h3>
          <p>My Account</p>
          <p>Login/Register</p>
          <p>Cart</p>
          <p>Wishlist</p>
          <p>Shop</p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>Privacy Policy</p>
          <p>Terms of Use</p>
          <p>FAQs</p>
        </div>

        {/* Download Section */}
        <div className="download-app-container">
          <h2 className="download-heading">Download App</h2>
          <p className="download-subtext">Save $3 with App New User Only</p>

          <div className="download-content">
            <div className="qr-code">
              <img src={assets.images.qrcode} alt="QR Code" />
            </div>

            <div className="store-buttons">
              <button type="button" className="store-button">
                <img src={assets.images.googleplay} alt="Google Play Store" />
              </button>
              <button type="button" className="store-button">
                <img src={assets.images.applestore} alt="Apple Store" />
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="socialmedia">
            <button type="button">
              <img src={assets.images.facebook} alt="Facebook" />
            </button>
            <button type="button">
              <img src={assets.images.twitter} alt="Twitter" />
            </button>
            <button type="button">
              <img src={assets.images.insta} alt="Instagram" />
            </button>
            <button type="button">
              <img src={assets.images.linkedin} alt="LinkedIn" />
            </button>
          </div>
        </div>
      </div>

      <p id="bottom-text"> ⓒ Copyright Rimel 2022. All rights reserved</p>
    </footer>
  );
}
