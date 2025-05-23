import { useParams, NavLink } from 'react-router-dom';
import { Frown } from 'lucide-react';
import { useGetProductByCategoryQuery } from '../../../Services/Api/module/demoApi';
import ShowItem from '../ShowItem/ShowItem';
import { TEXT } from '../../../Shared/Constants';
import { RippleLoader } from '../../Dashboard/Helper/Loaders/Loaders';
import './Category.scss';

export default function Category() {
  const { category } = useParams();
  const {
    data: relatedProducts,
    error,
    isLoading,
  } = useGetProductByCategoryQuery(category);

  if (error) {
    return (
      <div className="not-found">
        <Frown strokeWidth={1} size={50} />
        <p>{TEXT.ERROR_LOADING}</p>
        <button
          type="button"
          className="retry-button"
          onClick={() => window.location.reload()}
        >
          {TEXT.TRY_AGAIN}
        </button>
      </div>
    );
  }
  if (relatedProducts?.length === 0) return <p>{TEXT.NOT_FOUND}</p>;

  return (
    <div className="category-page-container">
      <aside className="category-sidebar">
        <h3>{TEXT.CATEGORIES}</h3>
        <NavLink to="/category/women's clothing" className="category-nav-link">
          {TEXT.WOMENS_FASHION}
        </NavLink>
        <NavLink to="/category/men's clothing" className="category-nav-link">
          {TEXT.MENS_FASHION}
        </NavLink>
        <NavLink to="/category/electronics" className="category-nav-link">
          {TEXT.ELECTRONICS}
        </NavLink>
        <NavLink to="/category/jewelery" className="category-nav-link">
          {TEXT.JEWELLERY}
        </NavLink>
      </aside>

      <section className="category-content">
        <h1 className="category-title">
          {category === 'jewelery' ? 'Jewellery' : <p>{category}</p>}
        </h1>
        {isLoading ? (
          <div className="loader">
            <RippleLoader />
          </div>
        ) : (
          <ShowItem products={relatedProducts} />
        )}
      </section>
    </div>
  );
}
