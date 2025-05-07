import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Address } from '../../Services/Address/Address';
/* eslint-disable no-param-reassign */

const initialState: Address = {
  name: '',
  companyName: '',
  streetAddress: '',
  apartment: '',
  town: '',
  phoneNumber: '',
  emailAddress: '',
};

const addressSlice = createSlice({
  name: 'storeAddress',
  initialState,
  reducers: {
    updateAddress: (state: Address, action: PayloadAction<Address>) => {
      state.name = action.payload.name;
      state.companyName = action.payload.companyName;
      state.streetAddress = action.payload.streetAddress;
      state.apartment = action.payload.apartment;
      state.town = action.payload.town;
      state.phoneNumber = action.payload.phoneNumber;
      state.emailAddress = action.payload.emailAddress;
    },
    removePreviousAddress: (state: Address) => {
      state.name = '';
      state.companyName = '';
      state.streetAddress = '';
      state.apartment = '';
      state.town = '';
      state.phoneNumber = '';
      state.emailAddress = '';
    },
  },
});

export const { updateAddress, removePreviousAddress } = addressSlice.actions;
export default addressSlice.reducer;
