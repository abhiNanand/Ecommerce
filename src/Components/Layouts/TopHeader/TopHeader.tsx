import './TopHeader.scss';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../Shared/Constants';

export default function TopHeader() {
  return (
    <div className="top-header">
      <p className="announcement">
        Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{' '}
        <b>
          <Link to={ROUTES.SHOP}>Show Now</Link>
        </b>
      </p>
    </div>
  );
}
