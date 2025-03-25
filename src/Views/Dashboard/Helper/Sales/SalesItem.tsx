import { useDemoApiQuery } from '../../../../Services/Api/module/demoApi';
import { Star, Heart } from 'lucide-react';
import { addToCart } from '../../../../Services/Cart/CartService';
import { addToWishlist } from '../../../../Services/Wishlist/WishlistService';
import { Product } from '../../../../Shared/Product';


import './SalesItem.scss'




export default function SalesItem() {

  const { data: products, error, isLoading } = useDemoApiQuery(null);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold text-red-600">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }


  return (
    <div className="products-grid">
      {products?.map((product: Product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={
                  i < Math.round(product.rating?.rate?? 0) ? 'star filled' : 'star'
                }
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              ({product.rating?.count?? 0})
            </span>
          </div>

          <button className="cart-btn" onClick={() => addToCart(product)} >Add to Cart</button>
          <br />
          <button className="wishlist-btn" onClick={() => addToWishlist(product)}> <Heart size={24} /></button>
        </div>
      ))}
    </div>
  );
}
