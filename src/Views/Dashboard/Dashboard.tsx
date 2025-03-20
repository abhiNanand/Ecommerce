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
import Banner from './Banner/Banner';
import Sales from './Sales/Sales';
import BrowseCategory from './BrowseCategroy/BrowseCategory';
import SalesItem from './Sales/SalesItem';
import BestSelling  from './BestSellingProducts/BestSelling';
import JblBanner from './JBLBanner/JBLBanner';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="top-banner">
        {/* Sidebar Categories */}
        <div className="banner-categories">
          <h3>Categories</h3>
          <Link to="/womanFashion" className="category-link">Women's Fashion</Link>
          <Link to="/mensFashion" className="category-link">Men's Fashion</Link>
          <Link to="/electronics" className="category-link">Electronics</Link>
          <Link to="/medicine" className="category-link">Medicine</Link>
          <Link to="/home-lifestyle" className="category-link">Home & Lifestyle</Link>
          <Link to="/sports-outdoor" className="category-link">Sports & Outdoor</Link>
          <Link to="/baby-toys" className="category-link">Baby & Toys</Link>
          <Link to="/groceries-pets" className="category-link">Groceries & Pets</Link>
          <Link to="/health-beauty" className="category-link">Health & Beauty</Link>
        </div>

        {/* Banner Section */}
        <div className="banner-section">
          <Banner />
        </div>
      </div>
      <Sales />
      <SalesItem/>
      <BrowseCategory/>
      <BestSelling/>
      <JblBanner/>
       
       
    </div>
  );
}
