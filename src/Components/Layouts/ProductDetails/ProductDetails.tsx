import { useParams, useNavigate,useLocation } from 'react-router-dom';
 
import { useEffect } from 'react';
import {
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
} from '../../../Services/Api/module/demoApi';
import './ProductDetails.scss';
import { useAuth } from '../../../Services/UserAuth';
import ShowItem from '../../../Views/Dashboard/Helper/Sales/ShowItem';
import { ROUTES } from '../../../Shared/Constants';
import { toast } from 'react-toastify';
 
import { RippleLoader} from '../../../Views/Dashboard/Loaders/Loaders';
import ShareProduct from './ShareProduct';

function ProductDetails() {
  const { productId } = useParams();
  const { user } = useAuth();
 
  const navigate = useNavigate();
 
  const {pathname}=useLocation();
 

  useEffect(()=>window.scrollTo(0,0),[pathname]);
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

  if (productLoading ){
    return (
      <div className="loader">
         <RippleLoader/>
      </div>
    );
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
           <div className="shareProduct-btn">
            <ShareProduct pathname={pathname}/>
            </div>
        </div>
       
        <div className="product-info">
          <h3 className="product-detail-title">{product.title}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-price">
            Price: <span>${product.price}</span>
          </p>
          <p className="product-category">Category: {product.category}</p>
          <div className="product-actions">
          
            <button
              type="button"
              className="buy-now"
              onClick={() => {
                if (user) {
                  navigate(`/buy/${productId}`);
                } else {
                  toast.error('Please Login! To buy Product');
                  navigate(ROUTES.LOGIN);
                }
              }}
            >
              Buy Now
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
         <div className="loader">
         <RippleLoader/>
      </div>
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
