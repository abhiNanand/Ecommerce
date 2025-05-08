import './TopHeader.scss';
import { Link } from 'react-router-dom';
import { ROUTES, TEXT } from '../../../Shared/Constants';

export default function TopHeader() {
  return (
    <div className="top-header">
      <p className="announcement">
        {TEXT.ANNOUNCEMENT}{' '}
        <b>
          <Link to={ROUTES.SHOP}>{TEXT.SHOP_NOW}</Link>
        </b>
      </p>
    </div>
  );
}
