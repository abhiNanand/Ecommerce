import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../../Services/Order/order';
import './Order.scss';
import { Product } from '../../../Shared/Product';
import { Address } from '../../../Services/Address/Address';
import { auth } from '../../../Services/firebase/firebase';
import { RippleLoader } from '../../Dashboard/Helper/Loaders/Loaders';
 
interface OrderData {
  id: string;
  products: Product[];
  address: Address;
  total:number;
  date: Date;
}

export default function Order() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();


 
  

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setLoading(true);
        const { orders: fetchedOrders } = await fetchOrders();
        setOrders(fetchedOrders);
        setHasMore(fetchedOrders.length >= 5); 
        setLoading(false);
      } else {
        setOrders([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadMore = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);
    const { orders: moreOrders } = await fetchOrders(5);
    setOrders((prev) => [...prev, ...moreOrders]);
    setHasMore(moreOrders.length >= 5);
    setLoadingMore(false);
  };

  // const calculateTotal = (order: OrderData): number => {
  //   return order.products.reduce(
  //     (total, product) => total + product.price * (product.quantity ?? 1),
  //     0
  //   );
  // };

  if (loading) {
    return (
      <div className="loader">
        <RippleLoader />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="not-found">
        <Frown strokeWidth={1} size={50} />
        <p>Sorry, we could not find any orders</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h2>Your Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-card-grid">
              <div className="order-summary">
                <h3>Order Date</h3>
                <p>{order.date.toLocaleDateString()}</p>

                <h3>Shipping Address</h3>
                <p>
                  {order.address.name}<br />
                  {order.address.streetAddress}, {order.address.apartment}<br />
                  {order.address.town}<br />
                  Phone: {order.address.phoneNumber}
                </p>

                <h3>Total</h3>
                {/* <p>${(orders?.total ?? 1).toFixed(2)??1}</p> */}
                <p>{Number(order.total).toFixed(5)} ETH</p>

              </div>

              <div className="product-list">
                {order.products.map((product) => (
                  <div
                    className="product-item"
                    key={product.id}
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    <img src={product.image} alt={product.title} />
                    <div>
                      <p>{product.title}</p>
                      <p>${product.price}</p>
                      <p>Qty: {product.quantity ?? 1}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="load-more-btn">
          <button className="load-request-btn" onClick={loadMore} disabled={loadingMore}>
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}