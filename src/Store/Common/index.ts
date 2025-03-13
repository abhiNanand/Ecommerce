import { createSlice } from '@reduxjs/toolkit';

const common = createSlice({
  name: 'common',
  initialState: { token: null },
  reducers: {
    updateAuthTokenRedux: (state, action) => ({
      ...state,
      token: action.payload.token,
    }),
  },
});

export const { updateAuthTokenRedux } = common.actions;

export default common.reducer;
