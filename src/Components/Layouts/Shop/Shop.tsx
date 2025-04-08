
// import {Star} from 'lucide-react';

import { useGetProductQuery } from "../../../Services/Api/module/demoApi";
import { addToCart } from "../../../Services/Cart/CartService";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { Product } from "../../../Shared/Product";
import { Star } from 'lucide-react';
import './Shop.scss';
import { useNavigate } from 'react-router-dom';
// import {Range} from 'react-range';
//import {useState} from 'react';


//const MIN=10;
//const MAX=600;


export default function Shop() {

    const navigate = useNavigate();
    const { data: products, error, isLoading } = useGetProductQuery(null);
   // const [price,setPrice]= useState<number[]>([50,150]);   
    

    if (error)
        return <h2>error</h2>

    if (isLoading)
        return <h2>Loading...</h2>

    return (


        <div className="shop-container">

            <div className="filters">
                <h3>Category</h3>
                <form>
                    <input type="checkbox" id="women" />
                    <label htmlFor="women">Women's Fashion</label>
                    <br />
                    <input type="checkbox" id="men" />
                    <label htmlFor="men">Men's Fashion</label>
                    <br />
                    <input type="checkbox" id="electronics" />
                    <label htmlFor="electronics">Electronics</label>

                </form>


                <h3>Customer Reviews
                </h3>
                <form>
                    <input type="checkbox" id="1star" />
                    <label htmlFor="1star">1 Star</label><br />
                    <input type="checkbox" id="2star" />
                    <label htmlFor="2star">2 Star</label><br />
                    <input type="checkbox" id="3star" />
                    <label htmlFor="3star">3 Star</label><br />
                    <input type="checkbox" id="4star" />
                    <label htmlFor="4star">4 Star</label><br />
                    <input type="checkbox" id="5star" />
                    <label htmlFor="5star">5 Star</label><br />


                </form>

                <h3>Price</h3>
                {/* <Range/> */}
                <form>
                    <label htmlFor="min">min:</label>
                    <input type="number" id="min"/>
                    <br/>
                    <label htmlFor="max">max:</label>
                    <input type={"number"} id="max"/>
                </form>
            
           
            </div>

            <div className="filtered-products">
                <div className="products-grid">
        {products?.map((product: Product) => (
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
              {[...Array(5)].map((_, i) => (
                <Star
                  key={`${product.id}-${i}`}
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
            </div>
        </div>

    );
}


 