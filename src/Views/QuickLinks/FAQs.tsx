import './QuickLinks.scss';

export default function FAQs() {
  return (
    <div className="info-section-page">
      <h1>Frequently Asked Questions (FAQs)</h1>
      <ul>
        <li>
          <strong>Q:</strong> How do I place an order?
          <br />
          <strong>A:</strong> Add items to your cart, go to checkout, fill in
          shipping details, and proceed to payment.
        </li>
        <li>
          <strong>Q:</strong> Can I cancel or modify my order?
          <br />
          <strong>A:</strong> Yes, orders can be canceled or changed within 2
          hours of placement.
        </li>
        <li>
          <strong>Q:</strong> What payment methods are accepted?
          <br />
          <strong>A:</strong> We accept UPI, Credit/Debit Cards, Net Banking,
          and Wallets.
        </li>
        <li>
          <strong>Q:</strong> What if my product arrives damaged?
          <br />
          <strong>A:</strong> You can raise a return or replacement request from
          the "My Orders" section.
        </li>
      </ul>
    </div>
  );
}
