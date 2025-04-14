import './BestSelling.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../../Shared/Constants';

export default function BestSelling() {
  const navigate = useNavigate();
  return (
    <section className="best-selling">
      <div className="best-selling-header">
        <div className="best-selling-highlight-bar" />
        <h3 className="best-selling-title">This Month</h3>
      </div>

      <div className="best-selling-subtitle">
        <h1>Best Selling Products</h1>
        <button
          type="button"
          className="best-selling-btn"
          onClick={() => navigate(ROUTES.SHOP)}
        >
          View All
        </button>
      </div>

      {/* <SalesItem /> */}
    </section>
  );
}

// <div className="jblBanner">
// <img src={images}/>
// <button type="button" className="jblBuy-btn">BuyNow</button>
// </div>
