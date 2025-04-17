// // src/Components/Auth/AuthListener.tsx
// import { useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { useDispatch } from 'react-redux';
// import { auth } from '../../../Services/firebase/firebase' 
// import { logoutUser } from '../../../Store/Common';
// import { updateCartItem, updateWishlistItem } from '../../../Store/Item/total_item_slice';
// import { getCartItems } from '../../../Services/Cart/CartService';
// import { getWishlistItems } from '../../../Services/Wishlist/WishlistService';

// const AuthListener = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         await currentUser.reload();

//         const token = await currentUser.getIdToken();
//         dispatch(
//           setUser({
//             user: {
//               uid: currentUser.uid,
//               displayName: currentUser.displayName,
//               email: currentUser.email,
//               photoURL: currentUser.photoURL,
//             },
//             token,
//           })
//         );

//         const wishlistItems = await getWishlistItems();
//         const cartItems = await getCartItems();
//         const totalQuantity = cartItems.reduce(
//           (acc, item) => acc + (item.quantity ?? 1),
//           0
//         );
//         dispatch(updateCartItem(totalQuantity));
//         dispatch(updateWishlistItem(wishlistItems.length));
//       } else {
//         dispatch(logoutUser());
//         dispatch(updateCartItem(0));
//         dispatch(updateWishlistItem(0));
//       }
//     });

//     return () => unsubscribe();
//   }, [dispatch]);

//   return null;  
// };

// export default AuthListener;
