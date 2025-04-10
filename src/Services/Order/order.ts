import { db, auth } from '../firebase/firebase';
import { setDoc, collection, doc } from 'firebase/firestore';
import { Product } from '../../Shared/Product';
import { Address } from '../Address/Address';
//add order history

export const addToOrderHistory = async (
  product: Product[],
  address: Address
): Promise<void> => {
  const user = auth.currentUser;
  if (!user) {
    console.log('user not found');
    return;
  }

  try {
    const orderRef = doc(collection(db, `users/${user.uid}/orders`));
    await setDoc(orderRef, {
      products: product,
      orderedAt: address,
      date: new Date(),
    });
  } catch {
    console.log("can't update orders");
    return;
  }
};

// //fetch order
// export const fetchOrders=async()=>{

//     const user=auth.currentUser;
//     if(!user)
//     {
//         console.log("user not found");
//         return;
//     }

//     try{
//         const orderRef=collection(db,`users/${user.uid}/orders`);
//     }
//     catch
//     {
//         return [];
//     }

// };

// Services/Order/order.ts
// import { db, auth } from '../firebase/firebase';
// import { collection, getDocs } from 'firebase/firestore';

// export const fetchOrders = async () => {
//   const user = auth.currentUser;
//   if (!user) {
//     console.log("User not found");
//     return [];
//   }

//   try {
//     const orderRef = collection(db, `users/${user.uid}/orders`);
//     const snapshot = await getDocs(orderRef);
//     const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     return orders;
//   } catch (err) {
//     console.error("Error fetching orders:", err);
//     return [];
//   }
// };

// // Views/OrderHistory/OrderHistory.tsx
// import './OrderHistory.scss';
// import { useEffect, useState } from 'react';
// import { fetchOrders } from '../../Services/Order/order';

// export default function OrderHistory() {
//   const [orders, setOrders] = useState<any[]>([]);

//   useEffect(() => {
//     const getOrders = async () => {
//       const data = await fetchOrders();
//       setOrders(data);
//     };
//     getOrders();
//   }, []);

//   return (
//     <div className="order-history">
//       <h1>Your Orders</h1>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} className="order-card">
//             <div className="order-details">
//               <h2>Shipping to: {order.orderedAt?.name}</h2>
//               <p>Address: {order.orderedAt?.streetAddress}, {order.orderedAt?.town}</p>
//               <p>Phone: {order.orderedAt?.phoneNumber}</p>
//               <p>Date: {new Date(order.date?.seconds * 1000).toLocaleString()}</p>
//             </div>
//             <div className="product-list">
//               {order.products?.map((item: any) => (
//                 <div key={item.id} className="product-card">
//                   <img src={item.image} alt={item.title} />
//                   <div>
//                     <h3>{item.title}</h3>
//                     <p>Price: ${item.price}</p>
//                     <p>Qty: {item.quantity}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// Views/OrderHistory/OrderHistory.scss
// .order-history {
//     padding: 2rem;
//     h1 {
//       font-size: 2rem;
//       margin-bottom: 1.5rem;
//     }

//     .order-card {
//       background: #fff;
//       border: 1px solid #ddd;
//       padding: 1rem;
//       margin-bottom: 2rem;
//       border-radius: 12px;
//       box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

//       .order-details {
//         margin-bottom: 1rem;
//         h2 {
//           margin: 0 0 0.5rem;
//         }
//         p {
//           margin: 0.2rem 0;
//         }
//       }

//       .product-list {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 1rem;

//         .product-card {
//           display: flex;
//           gap: 1rem;
//           background: #f9f9f9;
//           padding: 0.5rem;
//           border-radius: 8px;
//           width: 100%;
//           max-width: 300px;
//           img {
//             width: 60px;
//             height: 60px;
//             object-fit: contain;
//           }
//           div {
//             h3 {
//               font-size: 1rem;
//               margin: 0 0 0.3rem;
//             }
//             p {
//               font-size: 0.9rem;
//               margin: 0.2rem 0;
//             }
//           }
//         }
//       }
//     }
//   }
