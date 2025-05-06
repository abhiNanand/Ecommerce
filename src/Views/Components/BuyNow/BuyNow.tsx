import '../Checkout/Checkout.scss';
import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from '../../../Services/Api/module/demoApi';
import BuyProduct from '../BuyProduct/BuyProduct';
import { RippleLoader } from '../../Dashboard/Helper/Loaders/Loaders';


export default function BuyNow() {

  const { productId } = useParams();
  const {
    data: product,
    error: productError,
    isLoading: productLoading,
  } = useGetProductByIdQuery(productId);
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
  return (
    <BuyProduct products={[product]} />
  );
}
