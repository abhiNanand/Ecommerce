import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../Shared/Constants';
import './Error.scss';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <p className="error-heading">404 Not Found</p>
      <p>You visited page not found. You may go home page</p>
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
