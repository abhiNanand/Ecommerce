import { useParams, Link } from 'react-router-dom';
import { useGetProductByCategoryQuery } from '../../../Services/Api/module/demoApi';
import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';
import { RippleLoader } from '../../../Views/Dashboard/Loaders/Loaders';
import './Category.scss';

export default function Category() {
  const { category } = useParams();

  const {
    data: relatedProducts,
    error,
    isLoading,
  } = useGetProductByCategoryQuery(category);


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
        <Link to="/category/jewelery" className="category-link">
          Jewelery
        </Link>
      </div>
      <div>
        <h1>{category}</h1>
        {(isLoading) ?
          (
            <div className="loader">
              <RippleLoader />
            </div>
          ) : (<ShowItem products={relatedProducts} />)
        }


      </div>
    </div>
  );
}
