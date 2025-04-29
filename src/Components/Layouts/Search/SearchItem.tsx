import { useParams } from 'react-router-dom';
import { Frown } from 'lucide-react';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import { Product } from '../../../Shared/Product';
import { RippleLoader } from '../../../Views/Dashboard/Loaders/Loaders';
import ShowItem from '../../../Views/Components/ShowItem/ShowItem';
import './SearchItem.scss';

export default function SearchItem() {
  const { query } = useParams();
  const { data: products, error, isLoading } = useGetProductQuery(null);
  if (!query) return <h1> No search query provided</h1>;
  if (isLoading) {
    return (
      <div className="loader">
        <RippleLoader />
      </div>
    );
  }
  if (error) return <h1>Error in loading items</h1>;
  if (query == 'all') {
    return ( <div className="show-searched-products"> <ShowItem products={products} /></div>);
  }

  const lowerQuery = query.toLowerCase();
  const filteredProducts = products?.filter((product: Product) => {
    return (
      product.title.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
    );
  });

  return (
    <div className="show-searched-products">
      {filteredProducts.length > 0 && (
        <p className="search-tag">Showing results for: {query}</p>
      )}

      {filteredProducts && filteredProducts.length > 0 ? (
        <ShowItem products={filteredProducts} />
      ) : (
        <div className="no-search-query-found">
          <Frown strokeWidth={1} size={50} />
          <p>Sorry, we could not found any result </p>
        </div>
      )}
    </div>
  );
}
