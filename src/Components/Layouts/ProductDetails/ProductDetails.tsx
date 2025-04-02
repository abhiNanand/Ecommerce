import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import {
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
} from '../../../Services/Api/module/demoApi';
import './ProductDetails.scss';
import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';
import { addToCart } from '../../../Services/Cart/CartService';
import { addToWishlist } from '../../../Services/Wishlist/WishlistService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductDetails() {
  const { productId } = useParams();
  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useGetProductByIdQuery(productId);

  const category: string = product?.category;
  const {
    data: relatedProducts,
    error: relatedError,
    isLoading: relatedLoading,
  } = useGetProductByCategoryQuery(category);

  if (productError) {
    return <h1>Error loading product</h1>;
  }

  if (productLoading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <p>No product data available.</p>;
  }

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-img">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            Price: <span>${product.price}</span>
          </p>
          <p className="product-category">Category: {product.category}</p>
          <div className="product-actions">
            <button
              type="button"
              className="pd-cart"
              onClick={() => {
                addToCart(product);
                toast.success('Added to Cart!');
              }}
            >
              <ShoppingCart size={20} /> Add to Cart{' '}
            </button>
            <button type="button" className="buy-now">
              Buy Now
            </button>
            <button
              type="button"
              onClick={() => {
                addToWishlist(product);
                toast.success('Added to Wishlist!');
              }}
              className="pd-wishlist"
            >
              <Heart size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="relatedItem">
        <div className="relatedItem-header">
          <div className="relatedItem-highlighter" />
          <h1 className="relatedItem">Related Items</h1>
        </div>

        {relatedLoading ? (
          <p>Loading related products...</p>
        ) : relatedError ? (
          <p>Error loading related products.</p>
        ) : relatedProducts?.length ? (
          <ShowItem products={relatedProducts} />
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
