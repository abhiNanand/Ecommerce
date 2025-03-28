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

import './Dashboard.scss';
import { Link } from 'react-router-dom';
import Banner from './Helper/Banner/Banner';
import Sales from './Helper/Sales/Sales';
import BrowseCategory from './Helper/BrowseCategroy/BrowseCategory';
import ShowItem from './Helper/Sales/ShowItem';
import { useGetProductQuery } from '../../Services/Api/module/demoApi';
import BestSelling from './Helper/BestSellingProducts/BestSelling';
import JblBanner from './Helper/JBLBanner/JBLBanner';
 

export default function Dashboard() {
  
  const { data: products, error, isLoading } = useGetProductQuery(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="top-banner">
        {/* Sidebar Categories */}
        <div className="banner-categories">
          <h3>Categories</h3>
          <Link to="/category/women's clothing" className="category-link">
            Women&apos;s Fashion
          </Link>
          <Link to="/category/men's clothing" className="category-link">
            Men&apos;s Fashion
          </Link>
          <Link to="/category/electronics" className="category-link">
            Electronics
          </Link>
          <Link to="/category/medicine" className="category-link">
            Medicine
          </Link>
          <Link to="/category/home-lifestyle" className="category-link">
            Home & Lifestyle
          </Link>
          <Link to="/category/sports-outdoor" className="category-link">
            Sports & Outdoor
          </Link>
          <Link to="/category/baby-toys" className="category-link">
            Baby & Toys
          </Link>
          <Link to="/category/groceries-pets" className="category-link">
            Groceries & Pets
          </Link>
          <Link to="/category/health-beauty" className="category-link">
            Health & Beauty
          </Link>
        </div>

        {/* Banner Section */}
        <div className="banner-section">
          <Banner />
        </div>
      </div>
      <Sales />
      <ShowItem products={products} />
      <BrowseCategory />
      <BestSelling />
      <ShowItem products={products} />
      <JblBanner />
    </div>
  );
}
