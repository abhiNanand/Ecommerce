// import {db,auth} from '../firebase/firebase';
// import {setDoc,collection,doc} from 'firebase/firestore';


// //add order history

// export const addorder=async():Promise<void>=>
// {
// const user= auth.currentUser;
// if(!user)
// {
//     console.log("user not found");
//     return; 
// }

// const orderRef=doc(collection(db,`users/${user.uid}/orders`));
// try
// {
//     await setDoc(orderRef,{});
// }

// catch{
//     console.log("can't update orders");
//     return;
// }

// }

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