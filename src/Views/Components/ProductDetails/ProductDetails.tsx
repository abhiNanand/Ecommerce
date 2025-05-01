import { useParams, useNavigate, useLocation } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  useGetProductByIdQuery,
  useGetProductByCategoryQuery,
} from '../../../Services/Api/module/demoApi';
import './ProductDetails.scss';
import { useAuth } from '../../../Services/UserAuth';
import ShowItem from '../ShowItem/ShowItem';
import { ROUTES } from '../../../Shared/Constants';

import { RippleLoader } from '../../Dashboard/Helper/Loaders/Loaders';
import ShareProduct from './ShareProduct';
import { auth } from '../../../Services/firebase/firebase';
import {
  getWishlistItems,
  addToWishlist,
  removeFromWishlist,
} from '../../../Services/Wishlist/WishlistService';
import { Product } from '../../../Shared/Product';
import { updateWishlistItem } from '../../../Store/Item/total_item_slice';
import { RootState } from '../../../Store';


function ProductDetails() {
  const { productId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isInWishlist, SetIsInWishlist] = useState<boolean>(false);
  const wishlistCount = useSelector(
    (state: RootState) => state.item.noOfWishlistItem
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [wishlistUpdated, setWishlistUpdated] = useState(false);
  const dispatch = useDispatch();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const wishlist  = await getWishlistItems();
        const flag = wishlist.some((item) => item.id == productId);
        SetIsInWishlist(flag);
      }
    });
    return () => unsubscribe();
  }, [productId]);

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
    return (
      <div className="loader">
        <RippleLoader />
      </div>
    );
  }

  if (!product) {
    return <p>No product data available.</p>;
  }

  const filteredRelatedProducts = relatedProducts?.filter(
    // (relatedProduct: Product) => relatedProduct.id != productId
    (relatedProduct: Product) => relatedProduct.id != productId
  );
  const handleWishlistClick = async (product: Product) => {
    try {
      if (!user) {
        toast.error('Please Login To Add Item To Wishlist!');
        navigate(ROUTES.LOGIN);
        return;
      }

      const isLiked = isInWishlist;

      if (isLiked) {
        await removeFromWishlist(product.id);
        SetIsInWishlist(false);
        toast.info('Item removed from wishlist', {
          position: 'top-right',
        });
        dispatch(updateWishlistItem(wishlistCount - 1));
      } else {
        await addToWishlist(product);
        SetIsInWishlist(true);
        toast.success('Item added to wishlist');
        dispatch(updateWishlistItem(wishlistCount + 1));
      }
      setWishlistUpdated((prev) => !prev);
    } catch (wishListError) {
      console.error('Error handling wishlist action:', wishListError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <div className="product-details-img">
          <img
            src={product.image}
            alt={product.title}
            className="product-details-image"
          />
          <div className="shareProduct-btn">
            <ShareProduct pathname={pathname} />
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
              className="pd-buy-now"
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

            <button
              type="button"
              disabled={loading}
              className="pd-wishlist-btn"
              onClick={() => {
                handleWishlistClick(product);
              }}
            >
              <Heart
                color={isInWishlist ? 'red' : 'black'}
                fill={isInWishlist ? 'red' : 'none'}
                size={24}
              />
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
            <RippleLoader />
          </div>
        ) : relatedError ? (
          <p>Error loading related products.</p>
        ) : filteredRelatedProducts?.length ? ( 
          <ShowItem
            products={filteredRelatedProducts}
            wishlistUpdated={wishlistUpdated}
          />
        ) : (
          <p>No related products found.</p>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
