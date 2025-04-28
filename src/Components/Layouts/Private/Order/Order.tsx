import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../../../Services/Order/order';
import './Order.scss';
import { Product } from '../../../../Shared/Product';
import { Address } from '../../../../Services/Address/Address';
import { auth } from '../../../../Services/firebase/firebase';
import { RippleLoader } from '../../../../Views/Dashboard/Loaders/Loaders';

interface OrderData {
  id: string;
  products: Product[];
  address: Address;
  date: Date;
}

export default function Order() {
  const [loading, setLoading] = useState<boolean>(true);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        const data = await fetchOrders();
        const sortedData =  data.sort((a,b)=> b.date.getTime()-a.date.getTime());
        setOrders(sortedData );
        setLoading(false);
      } else {
        setOrders([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);
  const calculateTotal = (order: OrderData): number => {
    return order.products.reduce(
      (total, product) => total + product.price * (product.quantity ?? 1),
      0
    );
  };
  if (loading) {
    return (
      <div className="loader">
        <RippleLoader />
      </div>
    );
  }
  if (orders.length == 0) {
    return (
      <div className="no-search-query-found">
        <Frown strokeWidth={1} size={50} />
        <p>Sorry, we could not found any order</p>
      </div>
    );
  }
  return (
    <div className="order-page">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-details">
              <h3>Order Date: {order.date.toLocaleDateString()}</h3>
              <p>
                <strong>Shipping Address:</strong>
                <br />
                {order.address.name}, {order.address.streetAddress},{' '}
                {order.address.apartment}
                <br />
                {order.address.town}
                <br />
                Phone: {order.address.phoneNumber}
              </p>
              <h3>Total: ${calculateTotal(order).toFixed(2)}</h3>
            </div>
            <div className="product-list">
              {order.products.map((product) => (
                <div
                  className="product-item"
                  key={product.id}
                  onClick={() => {
                    navigate(`/product/${product.id}`);
                  }}
                >
                  <img src={product.image} alt={product.title} />
                  <div>
                    <p>{product.title}</p>
                    <p>Price: ${product.price}</p>
                    <p>Qty: {product.quantity ?? 1}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
