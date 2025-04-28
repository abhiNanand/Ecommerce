import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../Shared/Constants';

export default function Browse() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <p className="error-heading">Coming Soon </p>
      <button
        type="button"
        onClick={() => navigate(ROUTES.HOMEPAGE)}
        className="return-home-btn"
      >
        Back to home page
      </button>
    </div>
  );
}
