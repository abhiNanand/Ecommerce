import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { Frown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchOrders } from '../../../Services/Order/order';
import './Order.scss';
import { Product } from '../../../Shared/Product';
import { Address } from '../../../Services/Address/Address';
import { auth } from '../../../Services/firebase/firebase';
import { RippleLoader } from '../../Dashboard/Helper/Loaders/Loaders';
import { TEXT } from '../../../Shared/Constants';

interface OrderData {
  id: string;
  products: Product[];
  address: Address;
  total: number;
  date: Date;
}

export default function Order() {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        await currentUser.reload();
        setLoading(true);
        const { orders: fetchedOrders, lastDoc } = await fetchOrders();
        setOrders(fetchedOrders);
        setLastDoc(lastDoc);
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
    const { orders: moreOrders, lastDoc: newLastDoc } = await fetchOrders(
      5,
      lastDoc
    );
    setLastDoc(newLastDoc);
    setOrders((prev) => [...prev, ...moreOrders]);
    setHasMore(moreOrders.length >= 5);
    setLoadingMore(false);
  };

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
        <p>{TEXT.SORRY_NO_ORDERS}</p>
      </div>
    );
  }

  return (
    <div className="order-page">
      <h2>{TEXT.YOUR_ORDERS}</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div className="order-card" key={order.id}>
            <div className="order-card-grid">
              <div className="order-summary">
                <h3>{TEXT.ORDER_DATE}</h3>
                <p>
                  {order.date.toLocaleDateString()} at{' '}
                  {order.date.toLocaleTimeString()}
                </p>
                <h3>{TEXT.SHIPPING_ADDRESS}</h3>
                <p>
                  {order.address.name}
                  <br />
                  {order.address.streetAddress}, {order.address.apartment}
                  <br />
                  {order.address.town}
                  <br />
                  {TEXT.PHONE}: {order.address.phoneNumber}
                </p>

                <h3>{TEXT.TOTAL}</h3>
                <p>{Number(order.total).toFixed(5)} ETH</p>
              </div>

              <div className="product-list">
                {order.products.map((product) => (
                  <button
                    type="button"
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
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="load-more-btn">
          <button
            type="button"
            className="load-request-btn"
            onClick={loadMore}
            disabled={loadingMore}
          >
            {loadingMore ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}
