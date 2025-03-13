import { createSlice } from '@reduxjs/toolkit';

const loader = createSlice({
  name: 'loader',
  initialState: { isLoading: false },
  reducers: {
    setLoading: (state, action) => ({
      ...state,
      isLoading: action.payload,
    }),
  },
});

export const { setLoading } = loader.actions;

export default loader.reducer;
