import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import "./SalesItem.scss"; // Import CSS

// Define Product Type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  
}

export default function SalesItem() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Product[] = await response.json(); // Ensure TypeScript knows the expected data type
        setProducts(data.slice(0, 20)); // Get only 10 products
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <h1 className="loading">Loading...</h1>;

  return (
  
    
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <div className="rating">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                //   className={i <= Math.round(product.rate) ? "star filled" : "star"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
 
  );
}
