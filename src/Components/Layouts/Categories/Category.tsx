import { useParams, Link } from 'react-router-dom';
import { useGetProductByCategoryQuery } from '../../../Services/Api/module/demoApi';
import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';

import './Category.scss';

export default function Category() {
  const { category } = useParams();

  const {
    data: relatedProducts,
    error,
    isLoading,
  } = useGetProductByCategoryQuery(category);

  if (isLoading) return <p>Loading related products...</p>;
  if (error) return <p>Error loading related products.</p>;
  if (relatedProducts?.length === 0) return <p>No related products found.</p>;

  return (
    <div className="product-category-withItem">
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
      </div>
      <div>
        <h1>{category}</h1>
        <ShowItem products={relatedProducts} />
      </div>
    </div>
  );
}
