// import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// interface Product
// {
//     id:number;
//     title:string;
//     price:number;
//     image:string;
// }

// interface wishlistState
// {
//     items:Product[];
// }
// const initialState:wishlistState = {
//     items:[],
// }

// const wishlistSlice = createSlice({
//     name:'wishlist',
//     initialState,
//     reducers:{
//         addToWishlist:(state,action:PayloadAction<Product>)=>
//             {
//                 state.items.push(action.payload)
//             },
//     },
// });

// export const{addToWishlist} = wishlistSlice.actions;
// export default wishlistSlice.reducer;
