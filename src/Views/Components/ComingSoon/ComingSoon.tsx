import { useNavigate } from 'react-router-dom';
import { ROUTES, TEXT } from '../../../Shared/Constants';

export default function CommingSoon() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <p className="error-heading">{TEXT.COMING_SOON}</p>
      <button
        type="button"
        onClick={() => navigate(ROUTES.HOMEPAGE)}
        className="return-home-btn"
      >
        {TEXT.BACK_TO_HOME}
      </button>
    </div>
  );
}
