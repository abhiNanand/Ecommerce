import { useParams, useNavigate } from 'react-router-dom';
import Star from '../../../Views/Dashboard/Helper/Stars/Star';
import { toast } from 'react-toastify';
import { useGetProductQuery } from '../../../Services/Api/module/demoApi';
import { Product } from '../../../Shared/Product';
import { addToCart } from '../../../Services/Cart/CartService';
import { RippleLoader } from '../../../Views/Dashboard/Loaders/Loaders';

export default function SearchItem() {
  const { query } = useParams();

  const { data: products, error, isLoading } = useGetProductQuery(null);
  const navigate = useNavigate();

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
        <div className="products-grid">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="product-card"
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.title}
                className="product-image"
              />
              <h3 className="product-title">{product.title}</h3>
              <button
                className="cart-btn"
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  addToCart(product);
                  toast.success('Added to Cart!');
                }}
              >
                Add to Cart
              </button>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="rating">
                <Star rating={product.rating?.rate} productId={product.id} />
                <span className="text-sm text-gray-500 ml-2">
                  ({product.rating?.count ?? 0})
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
