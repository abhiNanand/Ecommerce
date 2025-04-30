// // import Prompt from '../../Components/Atom/Blocker';
// import { useDemoApiQuery } from '../../Services/Api/module/demoApi';

// export default function Dashboard() {
//   const { data, error } = useDemoApiQuery('');
//   console.log(data, error);
//   return (
//     <div>
//       Dashboard
//       {/* <Prompt when message="Are you sure you want to leave?" /> */}
//     </div>
//   );
// }

import { Link } from 'react-router-dom';

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
      <div>
        <p>Error loading products. Please try again later.</p>
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
