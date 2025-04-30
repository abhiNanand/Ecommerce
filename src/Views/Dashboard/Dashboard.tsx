
import { Link } from 'react-router-dom';

import Banner from './Helper/Banner/Banner';
import Sales from './Helper/Sales/Sales';
import BrowseCategory from './Helper/BrowseCategroy/BrowseCategory';
import ShowItem from '../Components/ShowItem/ShowItem';
import BestSelling from './Helper/BestSellingProducts/BestSelling';
import JblBanner from './Helper/JBLBanner/JBLBanner';
import { SpinnerLoader } from './Helper/Loaders/Loaders';
import { Frown } from 'lucide-react';
import { useGetProductQuery } from '../../Services/Api/module/demoApi';

import './Dashboard.scss';

export default function Dashboard() {
  const { data: products, error, isLoading } = useGetProductQuery(null);

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
        <p>Error in Loading Products</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="top-banner">
        <div className="banner-categories">
          <h3>Categories</h3>
          <Link to="/category/women's clothing" className="category-link">
            Women&apos;s Fashion
          </Link>
          <Link to="/category/men's clothing" className="category-link">
            {`Men's Fashion`}
          </Link>
          <Link to="/category/electronics" className="category-link">
            Electronics
          </Link>
          <Link to="/category/jewelery" className="category-link">
            Jewellery
          </Link>
        </div>

        
        <div className="banner-section">
          <Banner />
        </div>
      </div>
      <Sales />
     
      <BrowseCategory />
      <BestSelling />
      <ShowItem products={products.slice(0,12)} />
      <JblBanner />
    </div>
  );
}
