import { useParams } from 'react-router-dom';
import { Frown } from 'lucide-react';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import { Product } from '../../../Shared/Product';
import { RippleLoader } from '../../../Views/Dashboard/Helper/Loaders/Loaders';
import ShowItem from '../../../Views/Components/ShowItem/ShowItem';
import './SearchItem.scss';
import { TEXT } from '../../../Shared/Constants';

export default function SearchItem() {
  const { query } = useParams();
  const { data: products, error, isLoading } = useGetProductQuery(null);
  if (!query) return <h1>{TEXT.NO_SEARCH_QUERY} </h1>;
  if (isLoading) {
    return (
      <div className="loader">
        <RippleLoader />
      </div>
    );
  }
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
  if (query === 'all') {
    return (
      <div className="show-searched-products">
        <ShowItem products={products} />
      </div>
    );
  }

  const lowerQuery = query.toLowerCase();
  const filteredProducts = products?.filter((product: Product) => {
    const titleString = product.title.split(' ');
    const descriptionString = product.description.split(' ');
    const categoryString = product.category.split(`'`);

    return (
      titleString.some(
        (item) => item.slice(0, lowerQuery.length).toLowerCase() === lowerQuery
      ) ||
      descriptionString.some(
        (item) => item.slice(0, lowerQuery.length).toLowerCase() === lowerQuery
      ) ||
      categoryString.some(
        (item) => item.slice(0, lowerQuery.length).toLowerCase() === lowerQuery
      )
    );
  });

  return (
    <div className="show-searched-products">
      {filteredProducts.length > 0 && (
        <p className="search-tag">
          {TEXT.SHOWING_RESULT} {query}
        </p>
      )}

      {filteredProducts && filteredProducts.length > 0 ? (
        <ShowItem products={filteredProducts} />
      ) : (
        <div className="not-found">
          <Frown strokeWidth={1} size={50} />
          <p>{TEXT.NOT_FOUND}</p>
        </div>
      )}
    </div>
  );
}
