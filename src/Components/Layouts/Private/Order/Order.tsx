import { useEffect, useState } from 'react';
import { fetchOrders } from '../../../../Services/Order/order';
import './Order.scss';
import { Product } from '../../../../Shared/Product';
import { Address } from '../../../../Services/Address/Address';
 
interface OrderData {
  id: string;
  products: Product[];
  address: Address;
  date: Date;
}

export default function Order() {
  const [orders, setOrders] = useState<OrderData[]>([]);

  useEffect(() => {
    const getOrders = async () => {
      const data = await fetchOrders();
      if (data) {
        setOrders(data);
      }
    };
    getOrders();
  }, []);

  return (
    <div className="order-page">
      <h2>Your Order</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
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
              </div>
              <div className="product-list">
                {order.products.map((product) => (
                  <div className="product-item" key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <div>
                      <p>{product.title}</p>
                      <p>Price: ₹{product.price}</p>
                      <p>Qty: {product.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
