import { useNavigate } from 'react-router-dom';
import { ROUTES, TEXT } from '../../../Shared/Constants';
import './Error.scss';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <p className="error-heading">{TEXT.ERROR_HEADING}</p>
      <p>{TEXT.ERROR_MESSAGE}</p>
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
