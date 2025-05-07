import { useParams, NavLink } from 'react-router-dom';
import { Frown } from 'lucide-react';
import { useGetProductByCategoryQuery } from '../../../Services/Api/module/demoApi';
import ShowItem from '../ShowItem/ShowItem';
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
        <p>Error in Loading Products</p>
      </div>
    );
  }
  if (relatedProducts?.length === 0) return <p>No related products found.</p>;

  return (
    <div className="category-page-container">
      <aside className="category-sidebar">
        <h3>Categories</h3>
        <NavLink to="/category/women's clothing" className="category-nav-link">
          Women&apos;s Fashion
        </NavLink>
        <NavLink to="/category/men's clothing" className="category-nav-link">
          Men&apos;s Fashion
        </NavLink>
        <NavLink to="/category/electronics" className="category-nav-link">
          Electronics
        </NavLink>
        <NavLink to="/category/jewelery" className="category-nav-link">
          Jewellery
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
