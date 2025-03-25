// import { useDemoApiQuery } from '../../../../Services/Api/module/demoApi';
// import { Star, Heart } from 'lucide-react';
// import { addToCart } from '../../../../Services/Cart/CartService';
// import { addToWishlist} from '../../../../Services/Wishlist/WishlistService';
// import { Product } from '../../../../Shared/Product';
// import {useState} from 'react';

// import './SalesItem.scss'

// export default function SalesItem() {

//   const [liked,setLiked]=useState<string>('');
//   const { data: products, error, isLoading } = useDemoApiQuery(null);

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-xl font-semibold">Loading products...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <p className="text-xl font-semibold text-red-600">
//           Error loading products. Please try again later.
//         </p>
//       </div>
//     );
//   }

//   const handleWishlistClick=(product:Product)=>
//   {

//     setLiked(product.id);
//     addToWishlist(product);

//   }

//   return (
//     <div className="products-grid">

//       {products?.map((product: Product) => (
//         <div key={product.id} className="product-card">
//            <button className="add-wishlist-btn" onClick={() =>  handleWishlistClick(product)}> <Heart  color={liked==product.id ? "red" : "black"} // Change color
//           fill={liked==product.id ? "red" : "none"}    size={24} />
//       </button>
//           <img
//             src={product.image}
//             alt={product.title}
//             className="product-image"
//           />
//           <h3 className="product-title">{product.title}</h3>
//           <button className="cart-btn" onClick={() => addToCart(product)} >Add to Cart</button>
//           <p className="product-price">${product.price.toFixed(2)}</p>
//           <div className="rating">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 size={16}
//                 className={
//                   i < Math.round(product.rating?.rate?? 0) ? 'star filled' : 'star'
//                 }
//               />
//             ))}
//             <span className="text-sm text-gray-500 ml-2">
//               ({product.rating?.count?? 0})
//             </span>
//           </div>

//           <br />

//         </div>
//       ))}
//     </div>
//   );
// }

import { Star, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useDemoApiQuery } from '../../../../Services/Api/module/demoApi';
import { addToCart } from '../../../../Services/Cart/CartService';
import {
  addToWishlist,
  removeFromWishlist,
  getWishlistItems,
} from '../../../../Services/Wishlist/WishlistService';
import { Product } from '../../../../Shared/Product';
import './SalesItem.scss';

export default function SalesItem() {
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());
  const { data: products, error, isLoading } = useDemoApiQuery(null);

  useEffect(() => {
    const loadWishlistState = async () => {
      try {
        const wishlistItems = await getWishlistItems();
        setLikedItems(new Set(wishlistItems.map((item) => item.id)));
      } catch (error) {
        console.error('Error loading wishlist state:', error);
      }
    };
    loadWishlistState();
  }, []);

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

  const handleWishlistClick = async (product: Product) => {
    try {
      const isLiked = likedItems.has(product.id);

      if (isLiked) {
        await removeFromWishlist(product.id);
        setLikedItems((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product.id);
          return newSet;
        });
      } else {
        await addToWishlist(product);
        setLikedItems((prev) => new Set([...prev, product.id]));
      }
    } catch (wishListError) {
      console.error('Error handling wishlist action:', wishListError);
    }
  };//

  return (
    <div className="products-grid">
      {products?.map((product: Product) => (
        <div key={product.id} className="product-card">
          <button
            type="button"
            className="add-wishlist-btn"
            onClick={() => handleWishlistClick(product)}
          >
            <Heart
              color={likedItems.has(product.id) ? 'red' : 'black'}
              fill={likedItems.has(product.id) ? 'red' : 'none'}
              size={24}
            />
          </button>
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <button
            className="cart-btn"
            type="button"
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star
                key={product.id}
                size={16}
                className={
                  i < Math.round(product.rating?.rate ?? 0)
                    ? 'star filled'
                    : 'star'
                }
              />
            ))}
            <span className="text-sm text-gray-500 ml-2">
              ({product.rating?.count ?? 0})
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
