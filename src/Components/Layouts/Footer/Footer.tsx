import sendIcon from './send.svg';
import applestore from './applestore.png';
import facebook from './facebook.png';
import googleplay from './googleplay.png';
import insta from './insta.png';
import linkedin from './linkedin.png';
import Qrcode from './Qrcode.png';
import twitter from './twitter.png';

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
              <input type="email" placeholder="Enter your email" className="email-input" />
              <button type="submit" className="subscribe-button">
                <img src={sendIcon} alt="Send" />
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
              <img src={Qrcode} alt="QR Code" />
            </div>

            <div className="store-buttons">
              <button className="store-button">
                <img src={googleplay} alt="Google Play Store" />
              </button>
              <button className="store-button">
                <img src={applestore} alt="Apple Store" />
              </button>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="socialmedia">
            <button><img src={facebook} alt="Facebook" /></button>
            <button><img src={twitter} alt="Twitter" /></button>
            <button><img src={insta} alt="Instagram" /></button>
            <button><img src={linkedin} alt="LinkedIn" /></button>
          </div>
        </div>

      </div>

      <p id="bottom-text"> ⓒ Copyright Rimel 2022. All rights reserved</p>
    </footer>
  );
}
