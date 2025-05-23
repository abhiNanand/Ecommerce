/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  user: { displayName: string | null; email: string | null } | null;
}

interface User {
  displayName: string | null;
  email: string | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    updateAuthTokenRedux: (
      state,
      action: PayloadAction<{ token: string | null; user: User | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logoutUser: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { updateAuthTokenRedux, logoutUser } = common.actions;

export default common.reducer;
