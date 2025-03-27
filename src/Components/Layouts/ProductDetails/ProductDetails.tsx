import { useParams } from "react-router-dom";
import {
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
} from "../../../Services/Api/module/demoApi";
import "./ProductDetails.scss";
import ShowItem from "../../../Views/Dashboard/Helper/Sales/ShowItem";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data: product, error: productError, isLoading: productLoading } = useGetProductByIdQuery(productId);
 
  const category = product?.category;
  const {
    data: relatedProducts,
    error: relatedError,
    isLoading: relatedLoading,
  } = useGetProductByCategoryQuery(category); // Skip query if category is undefined

  if (productError) {
    console.log(productError);
    return <h1>Error loading product</h1>;
  }

  if (productLoading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <p>No product data available.</p>;
  }

  return (
    <>
      <div className="product-details">
        <div className="product-img">
          <img
            src={product.image}
            alt={product.title}
            height="100px"
            width="100px"
          />
        </div>
        <div className="productDetails">
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
        </div>
      </div>

      {/* Related Items */}
      <div className="relatedItem">
        <div className="relatedItem-header">
          <div className="relatedItem-highlighter"></div>
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
    </>
  );
};

export default ProductDetails;
