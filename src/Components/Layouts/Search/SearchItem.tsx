import { useParams} from 'react-router-dom';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import { Product } from '../../../Shared/Product';
import { RippleLoader } from '../../../Views/Dashboard/Loaders/Loaders';
import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';

export default function SearchItem() {
  const { query } = useParams();

  const { data: products, error, isLoading } = useGetProductQuery(null);

  if (!query) return <div>No search query provided</div>;
  if (isLoading) {
    return (
      <div className="loader">
        <RippleLoader />
      </div>
    );
  }
  if (error) return <h1>Error in loading items</h1>;

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
      <h2 className="text-2xl mb-4">
        Showing results for: <strong>{query}</strong>
      </h2>

      {filteredProducts && filteredProducts.length > 0 ? (
        <ShowItem products={filteredProducts}  />    ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
