import { Link } from 'react-router-dom';
import {TEXT} from '../../Shared/Constants';
import { Frown } from 'lucide-react';
import Banner from './Helper/Banner/Banner';
import Sales from './Helper/Sales/Sales';
import BrowseCategory from './Helper/BrowseCategroy/BrowseCategory';
import ShowItem from '../Components/ShowItem/ShowItem';
import BestSelling from './Helper/BestSellingProducts/BestSelling';
import JblBanner from './Helper/JBLBanner/JBLBanner';
import { SpinnerLoader } from './Helper/Loaders/Loaders';
import { useGetProductQuery } from '../../Services/Api/module/demoApi';

import './Dashboard.scss';

export default function Dashboard() {
  const {
    data: products,
    error,
    isLoading,
  } = useGetProductQuery(null, { refetchOnMountOrArgChange: true });

  if (isLoading) {
    return (
      <div className="loader">
        <SpinnerLoader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="not-found">
        <Frown strokeWidth={1} size={50} />
        <p>{TEXT.ERROR_LOADING}</p>
        <button type="button" className="retry-button" onClick={() => window.location.reload()}>
        Retry
      </button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="top-banner">
        <div className="banner-categories">
          <h3>{TEXT.CATEGORIES}</h3>
          <Link to="/category/women's clothing" className="category-link">
            {TEXT.WOMENS_FASHION}
          </Link>
          <Link to="/category/men's clothing" className="category-link">
            {TEXT.MENS_FASHION}
          </Link>
          <Link to="/category/electronics" className="category-link">
            {TEXT.ELECTRONICS}
          </Link>
          <Link to="/category/jewelery" className="category-link">
            {TEXT.JEWELLERY}
          </Link>
        </div>

        <div className="banner-section">
          <Banner />
        </div>
      </div>
      <Sales products={products.slice(12, 20)} />

      <BrowseCategory />
      <BestSelling />
      <ShowItem products={products.slice(0, 12)} />
      <JblBanner />
    </div>
  );
}
