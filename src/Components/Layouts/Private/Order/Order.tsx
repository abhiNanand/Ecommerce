import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { fetchOrders } from '../../../../Services/Order/order';
import './Order.scss';
import { Product } from '../../../../Shared/Product';
import { Address } from '../../../../Services/Address/Address';
import {auth} from '../../../../Services/firebase/firebase';
interface OrderData {
  id: string;
  products: Product[];
  address: Address;
  date: Date;
}



export default function Order() {
  const [orders, setOrders] = useState<OrderData[]>([]);


      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            await currentUser.reload();
            const data = await fetchOrders();
            setOrders(data);
          }
          else {
            setOrders([]);
          }
        });
        return ()=>unsubscribe();
      }, []);




  const calculateTotal=(order:OrderData):number=>
{
  return order.products.reduce((total,product)=>total+(product.price *( product.quantity??1)),0)
}


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
                <h3>Total:{calculateTotal(order).toFixed(2)}</h3>
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
