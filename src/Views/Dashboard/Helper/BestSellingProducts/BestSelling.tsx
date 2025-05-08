import './BestSelling.scss';
import { useNavigate } from 'react-router-dom';
import { ROUTES, TEXT } from '../../../../Shared/Constants';

export default function BestSelling() {
  const navigate = useNavigate();
  return (
    <section className="best-selling">
      <div className="best-selling-header">
        <div className="best-selling-highlight-bar" />
        <h3 className="best-selling-title">{TEXT.THIS_MONTH}</h3>
      </div>

      <div className="best-selling-subtitle">
        <h1>{TEXT.THIS_MONTH}</h1>
        <button
          type="button"
          className="best-selling-btn"
          onClick={() => navigate(ROUTES.SHOP)}
        >
          {TEXT.VIEW_ALL}
        </button>
      </div>
    </section>
  );
}

// <div className="jblBanner">
// <img src={images}/>
// <button type="button" className="jblBuy-btn">BuyNow</button>
// </div>
