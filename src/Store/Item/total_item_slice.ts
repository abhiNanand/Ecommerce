// src/store/slices/itemSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ItemState {
  noOfCartItem: number;
  noOfWishlistItem: number;
}

const initialState: ItemState = {
  noOfCartItem: 0,
  noOfWishlistItem: 0,
};

const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    updateCartItem(state, action: PayloadAction<number>) {
      state.noOfCartItem = action.payload;
    },
    updateWishlistItem(state, action: PayloadAction<number>) {
      state.noOfWishlistItem = action.payload;
    },
  },
});

export const { updateWishlistItem, updateCartItem } = itemSlice.actions;

export default itemSlice.reducer;
