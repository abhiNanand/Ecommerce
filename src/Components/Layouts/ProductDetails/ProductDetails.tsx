import { useLocation } from 'react-router-dom';
import './ProductDetails.scss';


const ProductDetails = () => {
    const { state } = useLocation();
   
    const product = state?.product;
     
    if (!product) return <p>No product data available.</p>;

    return (
        <div className="product-details">
            <div className="product-img">
                <img src={product.image} alt={product.title} height="100px" width="100px" />
            </div>
            <div className="productDetails"> <h1>{product.title}</h1>

                <p>{product.description}</p>
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p></div>

        </div>
    );
};

export default ProductDetails;
